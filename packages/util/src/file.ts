import { promises as fs, writeFileSync } from "fs"
import * as path from "path"
import * as os from "os"

// take in JSON of some kind and write it to ~/src/data
// returns path of file on success
export async function writeContentToSrcData(
  data: Array<any>,
  fileName: string,
): Promise<string | void> {
  const srcDataDir = path.join(os.homedir(), "src", "data")

  const filePath = path.join(srcDataDir, fileName)

  try {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2))
    console.log(`File written successfully to ${filePath}`)
    return filePath
  } catch (error) {
    console.error("Error writing to file:", error)
  }
}

// take in JSON of some kind and write it to ~/Desktop
// returns path of file on success
export async function writeContentToDesktopFile(
  data: Array<any>,
  fileName: string,
): Promise<string | void> {
  const desktopDir = path.join(os.homedir(), "Desktop")
  const filePath = path.join(desktopDir, fileName)

  try {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2))
    console.log(`File written successfully to ${filePath}`)
    return filePath
  } catch (error) {
    console.error("Error writing to file:", error)
  }
}

// pass import.meta.path into this function as first arg
export async function readFileContent(filePath: string) {
  const file = Bun.file(filePath)
  return await file.text()
}

export function getFilePathOfFileFromProvidedAbsolutePathFromExecutedBunFile(
  filePathOfBunFile: string,
  absolutePath: string,
) {
  const directoryPath = path.dirname(filePathOfBunFile)
  const filePath = path.join(directoryPath, absolutePath)
  return filePath
}

export async function zipFile(filePath: string) {
  const file = Bun.file(filePath)
  const data = new Uint8Array(await file.arrayBuffer())
  const gzipped = Bun.gzipSync(data)
  const gzFilePath = `${filePath}.gz`
  Bun.write(gzFilePath, gzipped)
}

export async function updateConfigFile(
  absolutePathToConfigFileFromHomeConfigFolder: string,
  key: string,
  value: string,
) {
  const configFilePath = path.join(
    os.homedir(),
    `.config/${absolutePathToConfigFileFromHomeConfigFolder}`,
  )

  try {
    let content = ""

    if (await fileOrFolderExists(configFilePath)) {
      content = await fs.readFile(configFilePath, "utf-8")
    } else {
      await fs.writeFile(configFilePath, "")
    }

    // Split the content by lines
    const lines = content.split("\n")

    // Find the line with the key
    const lineIndex = lines.findIndex((line) => line.startsWith(`${key}=`))

    // If the key exists, update the line. Otherwise, add a new line.
    if (lineIndex !== -1) {
      lines[lineIndex] = `${key}=${value}`
    } else {
      lines.push(`${key}=${value}`)
    }

    if (await fileOrFolderExists(configFilePath)) {
      await fs.unlink(configFilePath)
    }
    // Join the lines back together and write the file
    writeFileSync(configFilePath, lines.join("\n"))
  } catch (error) {
    console.error("Error writing to file:", error)
  }
}

export async function readConfigFileContent(
  absolutePathToConfigFileFromHomeConfigFolder: string,
) {
  const configFilePath = path.join(
    os.homedir(),
    `.config/${absolutePathToConfigFileFromHomeConfigFolder}`,
  )
  const file = Bun.file(configFilePath)
  return await file.text()
}

export async function readConfigFileValue(
  absolutePathToConfigFileFromHomeConfigFolder: string,
  key: string,
) {
  const configFilePath = path.join(
    os.homedir(),
    `.config/${absolutePathToConfigFileFromHomeConfigFolder}`,
  )
  const file = Bun.file(configFilePath)
  const text = await file.text()

  // Split the text by lines
  const lines = text.split("\n")

  // Iterate over the lines
  for (const line of lines) {
    // Split the line by the '=' character
    const parts = line.split("=")
    if (parts[0].trim() === key) {
      // If the key matches, return the value
      return parts[1].trim()
    }
  }

  // If no matching key is found, return null
  return null
}

// returns true if file/folder of filePath exists
export async function fileOrFolderExists(filePath: string): Promise<boolean> {
  try {
    await fs.access(filePath)
    return true
  } catch {
    return false
  }
}

// creates folder if it doesn't exist. accepts ~ as home directory
export async function createFolderIfDoesntExist(folderPath: string) {
  // replace '~' with user's home directory
  const resolvedFolderPath = folderPath.startsWith("~")
    ? path.join(os.homedir(), folderPath.slice(1))
    : folderPath

  if (!(await fileOrFolderExists(resolvedFolderPath))) {
    await fs.mkdir(resolvedFolderPath, { recursive: true })
  }
}

export async function createFileIfDoesntExist(filePath: string) {
  // replace '~' with user's home directory
  const resolvedFilePath = filePath.startsWith("~")
    ? path.join(os.homedir(), filePath.slice(1))
    : filePath

  if (!(await fileOrFolderExists(resolvedFilePath))) {
    const directoryPath = path.dirname(resolvedFilePath)
    await createFolderIfDoesntExist(directoryPath)
    await fs.writeFile(resolvedFilePath, "", { flag: "wx" }) // 'wx' flag creates file if it does not exist and fails if it does
  }
}

// overwrite content of the file at filePath with data
export async function writeJsonToFile(filePath: string, data: object) {
  // replace '~' with user's home directory
  const resolvedFilePath = filePath.startsWith("~")
    ? path.join(os.homedir(), filePath.slice(1))
    : filePath

  // ensure directory exists before writing the file
  const directoryPath = path.dirname(resolvedFilePath)
  await createFolderIfDoesntExist(directoryPath)

  // Write JSON data to the file
  await fs.writeFile(resolvedFilePath, JSON.stringify(data, null, 2))
}

// overwrite content of the file at filePath with an array of objects
export async function writeJsonArrayToFile(
  filePath: string,
  data: Array<object>,
) {
  // replace '~' with user's home directory
  const resolvedFilePath = filePath.startsWith("~")
    ? path.join(os.homedir(), filePath.slice(1))
    : filePath

  // ensure directory exists before writing the file
  const directoryPath = path.dirname(resolvedFilePath)
  await createFolderIfDoesntExist(directoryPath)

  // Write JSON array with objects to the file
  await fs.writeFile(resolvedFilePath, JSON.stringify(data, null, 2))
}

// Function to append a new object to an existing JSON array file or create a new file with the object as the first entry in an array
export async function appendObjectToJsonArrayFile(
  filePath: string,
  newData: object,
): Promise<void> {
  // Use the existing utility to resolve the file path, considering '~' as the home directory
  const resolvedFilePath = filePath.startsWith("~")
    ? path.join(os.homedir(), filePath.slice(1))
    : filePath

  let dataArray: Array<object> = []

  // Check if the file exists using the existing utility
  if (await fileOrFolderExists(resolvedFilePath)) {
    // If the file exists, read its content
    const fileContents = await readJsonFromFile(resolvedFilePath)
    if (Array.isArray(fileContents)) {
      // Ensure the content is an array before appending
      dataArray = fileContents
    }
  }

  // Append the new data object to the array
  dataArray.push(newData)

  // Use the existing function to write the updated array back to the file
  await writeJsonArrayToFile(filePath, dataArray)
}

export async function readJsonFromFile(filePath: string) {
  const resolvedFilePath = filePath.startsWith("~")
    ? path.join(os.homedir(), filePath.slice(1))
    : filePath

  const data = await fs.readFile(resolvedFilePath, "utf-8")
  return JSON.parse(data)
}

export async function checkIfFieldExistsInJsonFile(
  filePath: string,
  fieldName: string,
) {
  const resolvedFilePath = filePath.startsWith("~")
    ? path.join(os.homedir(), filePath.slice(1))
    : filePath

  const data = await fs.readFile(resolvedFilePath, "utf-8")
  const json = JSON.parse(data)
  return json[fieldName] !== undefined
}

// TODO: broken
export function getMarkdownFiles(dirPath: string) {
  let mdFiles = <string[]>[]
  fs.readdirSync(dirPath).forEach((file) => {
    const fullPath = path.join(dirPath, file)
    if (fs.statSync(fullPath).isDirectory()) {
      mdFiles = mdFiles.concat(getMarkdownFiles(fullPath))
    } else if (path.extname(fullPath) === ".md") {
      mdFiles.push(fullPath)
    }
  })
  return mdFiles
}
