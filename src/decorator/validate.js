export function Validate (validation) {
  return function (target, key, descriptor) {
    target[key].validation = validation
  }
}
