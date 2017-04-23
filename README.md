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
      const data = await ctx.service.post.show(id)
      ctx.status = 200
      ctx.body = {
        success: true
      }
    }
  }
  ```

- service/post.js
  ```javascript
  export default class PostService {
    static async function (id) {
      return await Database.Post.findById(id)
    }
  }
  ```


All done.
