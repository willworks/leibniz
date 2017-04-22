import koaResponse from 'koa/lib/response'

export default class Response {
  constructor () {
    return Object.create(koaResponse)
  }
}
