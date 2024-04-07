type TypesByDomain = {
  bigint: bigint
  boolean: boolean
  number: number
  object: object
  string: string
  symbol: symbol
  undefined: undefined
  null: null
}

/**
 * Force an operation like `{ a: 0 } & { b: 1 }` to be computed so that it displays `{ a: 0; b: 1 }`.
 *
 * Also works for some non-intersections, e.g. `keyof SomeObj` => `"a" | "b" | ...`
 */
export type evaluate<t> = { [k in keyof t]: t[k] } & unknown

export type Domain = evaluate<keyof TypesByDomain>

export type domainOf<data> = unknown extends data
  ? Domain
  : data extends object
    ? "object"
    : data extends string
      ? "string"
      : data extends number
        ? "number"
        : data extends boolean
          ? "boolean"
          : data extends undefined
            ? "undefined"
            : data extends null
              ? "null"
              : data extends bigint
                ? "bigint"
                : data extends symbol
                  ? "symbol"
                  : never
