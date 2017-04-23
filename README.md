## A Node.js framework build with Koa2

> Build for RESTful Web services

### TodoList

- [ ] ratelimit 中间件自动装载
- [ ] 配置文件及读取，据此配置中间件加载等
- [ ] 中间件装饰器，useBefore 和 useAfter
- [ ] context 扩展方法
- [ ] request 扩展方法
- [ ] util 工具类
- [ ] controller 类中定义钩子 before, after (useBefore 只能装饰类方法，这个相当于装饰了整个类)
- [ ] ...

### Example

- app.js
  ```javascript
  import Kun from 'kun'

  const app = new Kun()

  app.listen(8000)
  ```

- controller/post.js
  ```javascript
  import { Get, Controller, Validate, Joi } from 'Kun'

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
    static async show (id) => {
      return await Database.Post.findById(id)
    }
  }
  ```


All done.
