import { type } from "arktype"

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
    platform: "ios",
  },
})

// console.log(out)

const out2 = user.assert({
  name: "Alan Turing",
  device: {
    // errors.summary: "device/platform must be 'android' or 'ios' (was 'enigma')"
    platform: "wat",
  },
})
console.log(out2)
