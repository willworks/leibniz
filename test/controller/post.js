  import { route } from '../../src/decorator/decorator'

  export default class PostController {
    @route('/:id', 'GET')
    async index (ctx) {
      ctx.status = 200
      ctx.body = {
        success: true
      }
    }

    @route('/:id', 'POST')
    async save (ctx) {
      ctx.status = 405
      ctx.body = {
        success: true
      }
    }
  }
