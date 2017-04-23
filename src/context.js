import koaContext from 'koa/lib/context'
import path from 'path'
import glob from 'glob'
import { autobind } from 'core-decorators'

let _cacheServiceFiles

@autobind
class KoaContextClass {
  constructor () {
    Reflect.ownKeys(koaContext).forEach(key => {
      Reflect.defineProperty(this, key, Reflect.getOwnPropertyDescriptor(koaContext, key))
    })
  }
}

@autobind
export default class Context extends KoaContextClass {
  constructor (__app__) {
    super()
    this.service = []
    this.init(__app__)
  }

  init (execPath) {
    if (_cacheServiceFiles) {
      this.service = _cacheServiceFiles
      return
    }
    const servicePath = path.resolve(execPath, '..', 'service')
    const serviceFiles = glob.sync(`${servicePath}/**/*.js`)
    serviceFiles.forEach(file => {
      this.service[path.basename(file, '.js')] = require(file).default
    })
    _cacheServiceFiles = this.service
  }
}
