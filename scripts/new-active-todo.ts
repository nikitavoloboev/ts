import { promises as fs } from "fs"
import path from "path"
import os from "os"
import { getClipboard } from "@nikiv/ts-utils"

const args = Bun.argv
const app = args[2]
const todo = args[3]
const description = args[4]

// TODO: make own https://github.com/antfu/utils package and publish, for now link @nikiv/util
async function newActiveTodo() {
  if (app === "Things") {
    // TODO: update
    const todoTask = getClipboard()
    let description = ""
    let cutTask = false
    if (todoTask.length > 42) {
      description = todoTask.slice(42)
      cutTask = true
    }
    let todo = {
      todo: cutTask ? todoTask.slice(0, 42) : todoTask,
      description: description,
    }
    writeJsonToFile("~/.scripts/active-todo.json", todo)
    return
  }
  if (app === "ClipboardJustTodo") {
    const todoTask = getClipboard()
    let description = ""
    let cutTask = false
    if (todoTask.length > 42) {
      description = todoTask.slice(42)
      cutTask = true
    }
    let todo = {
      todo: cutTask ? todoTask.slice(0, 42) : todoTask,
      description: description,
    }
    writeJsonToFile("~/.scripts/active-todo.json", todo)
    return
  }
  if (app === "CLI") {
    if (!todo) {
      console.log("provide todo as argument")
      return
    }
    const todoJson: { todo: string; description?: string } = { todo: todo }
    if (description) {
      todoJson.description = description
    }
    await writeJsonToFile("~/.scripts/active-todo.json", todoJson)
  }
  // no longer using 2Do
  // if (app === "2Do") {
  //   const parsedTodo = parse2Do(getClipboard())
  //   writeJsonToFile("~/.scripts/active-todo.json", parsedTodo)
  //   return
  // }
}

newActiveTodo()

// TODO: all functions below are copies from @nikiv/util/src/file
// should be linking to that package instead of copying but import is breaking

async function fileOrFolderExists(filePath: string): Promise<boolean> {
  try {
    await fs.access(filePath)
    return true
  } catch {
    return false
  }
}

async function createFolderIfDoesntExist(folderPath: string) {
  // replace '~' with user's home directory
  const resolvedFolderPath = folderPath.startsWith("~")
    ? path.join(os.homedir(), folderPath.slice(1))
    : folderPath

  if (!(await fileOrFolderExists(resolvedFolderPath))) {
    await fs.mkdir(resolvedFolderPath, { recursive: true })
  }
}

async function createFileIfDoesntExist(filePath: string) {
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

export function parse2Do(todo: string) {
  // First, split the input by the first newline to separate todo and potential description
  const parts = todo.split("\n", 2)
  const firstPart = parts[0].trim()
  const description = parts[1] ? parts[1].trim() : ""

  // Adjust the regex to remove the `- ` prefix and `(Today)` part from the first part
  // This regex matches the start, optional `- `, any characters, and optional ` (Today)`
  const regex = /^-?\s?(.*?)\s*(\(Today\))?$/
  const match = firstPart.match(regex)

  if (match) {
    return {
      // Ensure we're returning the captured group without `- ` and `(Today)`
      todo: match[1].trim(),
      description: description,
    }
  } else {
    // If no match (which should not happen with adjusted regex), return the input as is
    return {
      todo: firstPart,
      description: description,
    }
  }
}
