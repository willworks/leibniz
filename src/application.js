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
    this.context = new Context()
    this.request = new Request()
    this.response = new Response()
    this.options = options
    this.middleware = []
    this.execPath = callsite()[1].getFileName()
    // Inject App Directory
    this.init(this.execPath)
  }

  init (execPath) {
    // directory 'controller'
    const controllerPath = path.resolve(execPath, '..', 'controller')
    glob(`${controllerPath}/*.js`, (err, files) => files.forEach(file => {
      if (err) {
        console.error(err)
      }
      const Controller = require(file).default
      this.middleware.push(Controller.prototype.router.middleware())
    }))
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
