import { Route, Controller } from '../../src/decorator/decorator'

@Controller('/post')
class PostController {
  @Route('/:id', 'GET')
  async index (ctx) {
    ctx.status = 200
    ctx.body = {
      success: true
    }
  }

  @Route('/:id', 'POST')
  async save (ctx) {
    ctx.status = 405
    ctx.body = {
      success: true
    }
  }
}

export default PostController
