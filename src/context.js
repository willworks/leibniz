import koaContext from 'koa/lib/context'
import path from 'path'
import { autobind } from 'core-decorators'
import requireDirectory from './util/require-directory'

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
    const servicePath = path.join(__appname, 'service')
    this.service = requireDirectory(`${servicePath}/**/*.js`)
  }
}
