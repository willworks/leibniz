import Router from 'koa-joi-router'

const methods = ['HEAD', 'OPTIONS', 'GET', 'PUT', 'PATCH', 'POST', 'DELETE']

/**
 * 路由装饰器
 * @param {String} path 路径
 * @param {String} method 请求方式
 * @param {Function[]} middleware 中间件
 */
export function Route (path = '/', method, ...middleware) {
  return function (target, key, descriptor) {
    if (!target.router) {
      target.router = new Router()
    }

    if (methods.includes(method.toUpperCase())) {
      target.router[method.toLowerCase()](path, ...middleware, descriptor.value)
    } else {
      throw new Error('@Route decorator "method" is not valid')
    }
  }
}

export function Get (path, ...middleware) {
  return Method('GET', path, ...middleware)
}

export function Post (path, ...middleware) {
  return Method('Post', path, ...middleware)
}

export function Head (path, ...middleware) {
  return Method('Head', path, ...middleware)
}

export function Put (path, ...middleware) {
  return Method('Put', path, ...middleware)
}

export function Patch (path, ...middleware) {
  return Method('Patch', path, ...middleware)
}

export function Delete (path, ...middleware) {
  return Method('Delete', path, ...middleware)
}

function Method (method, path, ...middleware) {
  return function (target, key, descriptor) {
    if (!target.router) {
      target.router = new Router()
    }
    target.router.route({
      method: method.toLowerCase(),
      path,
      validate: target[key + '__validate'],
      handler: [...middleware, descriptor.value]
    })
  }
}
