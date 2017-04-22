import Router from 'koa-joi-router'

const methods = ['HEAD', 'OPTIONS', 'GET', 'PUT', 'PATCH', 'POST', 'DELETE']

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
    }

    if (methods.includes(method.toUpperCase())) {
      target.router[method.toLowerCase()](path, ...middleware, descriptor.value)
    } else {
      throw new Error('@route decorator "method" is not valid')
    }
  }
}

/**
 * 装饰 route 要求提供 jwt
 */
export function authentication () {
  return (target, key, descriptor) => {
    descriptor.value = async (ctx, next) => {
      if (ctx.request.header.authorization && ctx.state.user) {
        await descriptor.value()
      } else {
        ctx.status = 401
        ctx.body = {
          success: false,
          message: 'Permssion denied'
        }
      }
    }
  }
}

export function Controller (prefix, ...middleware) {
  return (target, key, descriptor) => {
    target.prototype.router.router.stack.forEach(layer => {
      layer.setPrefix(prefix)
    })
  }
}
