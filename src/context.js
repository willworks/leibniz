import koaContext from 'koa/lib/context'
import path from 'path'
import glob from 'glob'
import { autobind } from 'core-decorators'
import pathDirectory from './util/path-directory'

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
  constructor () {
    super()
    this.service = []
    this.init()
  }

  init () {
    if (_cacheServiceFiles) {
      this.service = _cacheServiceFiles
      return
    }
    const servicePath = path.resolve(__app__, '..', 'service')
    const serviceFiles = glob.sync(`${servicePath}/**/*.js`)
    this.service = pathDirectory(serviceFiles)
    _cacheServiceFiles = this.service
  }
}
