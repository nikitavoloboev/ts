// TODO: setup eslint plugin https://github.com/supermacro/neverthrow?tab=readme-ov-file#recommended-use-eslint-plugin-neverthrow

// below taken from https://github.com/supermacro/neverthrow/wiki/Basic-Usage-Examples#asynchronous-api
// TODO: unclear how to use the lib
import { ok } from "neverthrow"

// something awesome happend

const yesss = ok("test")

// moments later ...

const mappedYes = yesss.map((value) => value + "!")

// neverthrow uses type-guards to differentiate between Ok and Err instances
// Mode info: https://www.typescriptlang.org/docs/handbook/advanced-types.html#type-guards-and-differentiating-types
if (mappedYes.isOk()) {
  // using type guards, we can access an Ok instance's `value` field
  doStuffWith(mappedYes.value)
} else {
  // because of type guards
  // typescript knows that mappedYes is an Err instance and thus has a `error` field
  doStuffWith(mappedYes.error)
}

function doStuffWith(value: any) {
  console.log("Doing stuff with:", value)
}
