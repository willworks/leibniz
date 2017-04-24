export function Validate (validation) {
  return function (target, key, descriptor) {
    target[key + '__validate'] = validation
  }
}
