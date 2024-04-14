import { type } from "arktype"

// -- basic validation

// Definitions are statically parsed and inferred as TS.
export const user = type({
  name: "string",
  device: {
    platform: "'android'|'ios'",
    "version?": "number",
  },
})

// Validators return typed data or clear, customizable errors.
export const { out, errors } = user({
  name: "Alan Turing",
  device: {
    // errors.summary: "device/platform must be 'android' or 'ios' (was 'enigma')"
    platform: "testing",
  },
})
// console.log(errors)

// assert
const assertTest = user.assert({
  name: "Alan Turing",
  device: {
    // errors.summary: "device/platform must be 'android' or 'ios' (was 'enigma')"
    platform: "wat",
  },
})
console.log(assertTest)

// -- scope

import { scope } from "arktype"

// Scopes are collections of types that can reference each other.
export const types = scope({
  package: {
    name: "string",
    "dependencies?": "package[]",
    "contributors?": "contributor[]",
  },
  contributor: {
    // Subtypes like 'email' are inferred like 'string' but provide additional validation at runtime.
    email: "email",
    "packages?": "package[]",
  },
}).export()

// Cyclic types are inferred to arbitrary depth...
export type Package = typeof types.package.infer

// And can validate cyclic data.
const packageData: Package = {
  name: "arktype",
  dependencies: [{ name: "typescript" }],
  contributors: [{ email: "david@sharktypeio" }],
}
// packageData.dependencies![0].dependencies = [packageData]

// export const { data, problems } = types.package(packageData)
