import { Post, Controller, Get, Validate, Joi } from '../../src/application.js'

@Controller('/post')
class PostController {
  @Get('/:id')
  @Validate({
    params: {
      id: Joi.number().integer()
    }
  })
  async index (ctx) {
    await ctx.service.post.index()
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
