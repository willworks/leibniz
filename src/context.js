import koaContext from 'koa/lib/context'

class KoaContext {
  constructor () {
    return Object.create(koaContext)
  }
}

export default class Context extends KoaContext {
  constructor () {
    super()
    this.service = []
  }
}
