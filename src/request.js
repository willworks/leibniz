import koaRequest from 'koa/lib/request'

export default class Request {
  constructor () {
    return Object.create(koaRequest)
  }
}
