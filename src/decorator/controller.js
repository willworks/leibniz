export function Controller (prefix, ...middleware) {
  return (target, key, descriptor) => {
    target.prototype.router.router.stack.forEach(layer => {
      layer.stack.unshift(...middleware)
      layer.setPrefix(prefix)
    })
  }
}
