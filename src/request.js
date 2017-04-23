import koaRequest from 'koa/lib/request'

export default class Request {
  constructor () {
    Reflect.ownKeys(koaRequest).forEach(key => {
      Reflect.defineProperty(this, key, Reflect.getOwnPropertyDescriptor(koaRequest, key))
    })
  }
}
