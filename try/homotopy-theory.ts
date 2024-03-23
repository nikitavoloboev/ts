// Type representing a path between two elements
type Path<A, B> = (t: number) => A | B;

// Identity path: a path from an element to itself
const refl = <T>(a: T): Path<T, T> => (_: number) => a;

// Function representing path composition
const compose = <A, B, C>(
  path1: Path<A, B>,
  path2: Path<B, C>
): Path<A, C> => (t: number) => (t < 0.5 ? path1(t * 2) : path2((t - 0.5) * 2));

// Type representing a homotopy between two paths
type Homotopy<A, B> = (t: number, s: number) => Path<A, B>;

// Constant homotopy: a homotopy between two identical paths
const constHomotopy = <A, B>(path: Path<A, B>): Homotopy<A, B> => (
  _: number,
  s: number
) => path(s);

// Function representing homotopy composition
const homotopyCompose = <A, B, C>(
  homotopy1: Homotopy<A, B>,
  homotopy2: Homotopy<B, C>
): Homotopy<A, C> => (t: number, s: number) =>
  compose(homotopy1(t, s), homotopy2(t, s));

// Example usage
const path1: Path<number, number> = (t) => t;
const path2: Path<number, number> = (t) => 1 - t;

const homotopy: Homotopy<number, number> = (t, s) =>
  s < 0.5 ? path1(t) : path2(t);

// Compute the value of the homotopy at a specific point
const value = homotopy(0.7, 0.3)(0.5);
console.log(value);
