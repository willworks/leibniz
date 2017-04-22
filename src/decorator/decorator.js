import Router from 'koa-joi-router'

const methods = ['HEAD', 'OPTIONS', 'GET', 'PUT', 'PATCH', 'POST', 'DELETE']
let routerPrefix
let routerMiddleware
/**
 * 路由装饰器
 * @param {String} path 路径
 * @param {String} method 请求方式
 * @param {Function[]} middleware 中间件
 */
export function route (path = '/', method, ...middleware) {
  return function (target, key, descriptor) {
    if (!target.router) {
      target.router = new Router()
      if (routerMiddleware.length > 0) {
        target.router.use(...routerMiddleware)
      }
    }

    if (routerPrefix) {
      path = routerPrefix + path
    }

    if (methods.includes(method.toUpperCase())) {
      target.router[method.toLowerCase()](path, ...middleware, descriptor.value)
    } else {
      throw new Error('@route decorator "method" is not valid')
    }
  }
}

/**
 * 设置 router 的前缀和中间件
 * TODO: 更好方式实现？
 * @param {String} path
 * @param {Function[]} middleware
 */
export function router (path, ...middleware) {
  routerPrefix = path
  routerMiddleware = middleware
  return function (target, key, descriptor) {
  }
}
