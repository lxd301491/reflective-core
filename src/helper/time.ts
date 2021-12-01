export function now(): number {
  return performance ? performance.now() : new Date().getTime();
}
