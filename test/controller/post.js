import { Post, Controller, Get } from '../../src/application.js'

@Controller('/post')
class PostController {
  @Get('/:id')
  async index (ctx) {
    ctx.status = 200
    ctx.body = {
      success: true
    }
  }

  @Post('/:id')
  async save (ctx) {
    ctx.status = 405
    ctx.body = {
      success: true
    }
  }
}

export default PostController
