import koaContext from 'koa/lib/context'

export default class Context {
  constructor () {
    return Object.create(koaContext)
  }
}
