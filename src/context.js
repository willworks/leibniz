import koaContext from 'koa/lib/context'
import path from 'path'
import glob from 'glob'
import { autobind } from 'core-decorators'
import requireDirectory from './util/require-directory'

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
    const servicePath = path.join(__appname, 'service')
    const serviceFiles = glob.sync(`${servicePath}/**/*.js`)
    this.service = requireDirectory(serviceFiles)
    _cacheServiceFiles = this.service
  }
}
