## A Node.js framework build with Koa2

> Build for RESTful Web services

### Example

- app.js
  ```javascript
  import Kun from 'kun'

  const app = new Kun()

  app.listen(8000)
  ```

- controller/post.js
  ```javascript
  import { Post, Get, Controller, Validate, Joi } from 'Kun'

  @Controller('/post')
  export default class PostController {
    @Get('/:id')
    @Validate({
      params: {
        id: Joi.number().integer()
      }
    })
    async index (ctx) {
      ctx.status = 200
      ctx.body = {
        success: true
      }
    }
  }
  ```

All done.
