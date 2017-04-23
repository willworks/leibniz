import Koa from 'koa'
import Cookies from 'cookies'
import accepts from 'accepts'
import callsite from 'callsite'
import glob from 'glob'
import path from 'path'
import { autobind, override } from 'core-decorators'

import Context from './context'
import Request from './request'
import Response from './response'

@autobind
export default class App extends Koa {
  constructor (options = {}) {
    super()
    this.__app__ = callsite()[1].getFileName()
    this.context = new Context(this.__app__)
    this.request = new Request(this.__app__)
    this.response = new Response(this.__app__)
    this.options = options
    this.middleware = []
    // Inject App Directory
    this.init(this.__app__)
  }

  init (execPath) {
    // inject useful middleware
    const middlewarePath = path.resolve(__dirname, 'middleware')
    const middlewareFiles = glob.sync(`${middlewarePath}/**/*.js`)
    middlewareFiles.forEach(file => this.use(require(file).default()))
    // inject controller
    const controllerPath = path.resolve(execPath, '..', 'controller')
    const controllerFiles = glob.sync(`${controllerPath}/**/*.js`)
    controllerFiles.forEach(file => this.use(require(file).default.prototype.router.middleware()))
  }

  @override
  createContext (req, res) {
    const context = new Context()
    const request = context.request = new Request()
    const response = context.response = new Response()
    context.app = request.app = response.app = this
    context.req = request.req = response.req = req
    context.res = request.res = response.res = res
    request.ctx = response.ctx = context
    request.response = response
    response.request = request
    context.originalUrl = request.originalUrl = req.url
    context.cookies = new Cookies(req, res, {
      keys: this.keys,
      secure: request.secure
    })
    request.ip = request.ips[0] || req.socket.remoteAddress || ''
    context.accept = request.accept = accepts(req)
    context.state = {}
    return context
  }
}

export { Joi } from 'koa-joi-router'
export * from './decorator/authorization'
export * from './decorator/controller'
export * from './decorator/route'
export * from './decorator/validate'
