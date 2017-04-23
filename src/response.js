import koaResponse from 'koa/lib/response'

export default class Response {
  constructor () {
    Reflect.ownKeys(koaResponse).forEach(key => {
      Reflect.defineProperty(this, key, Reflect.getOwnPropertyDescriptor(koaResponse, key))
    })
  }
}
