# A Node.js framework build with Koa2

[![CircleCI](https://circleci.com/gh/ruiming/leibniz.svg?style=shield)](https://circleci.com/gh/ruiming/leibniz)
[![codecov](https://codecov.io/gh/ruiming/leibniz/branch/master/graph/badge.svg)](https://codecov.io/gh/ruiming/leibniz)
[![NodeVersion](https://img.shields.io/node/v/leibniz.svg)](https://img.shields.io/node/v/leibniz.svg)
[![Dependencies](https://img.shields.io/david/ruiming/leibniz.svg?maxAge=2592000)](https://img.shields.io/david/ruiming/leibniz.svg?maxAge=2592000)
[![DevDependencies](https://img.shields.io/david/dev/ruiming/leibniz.svg?maxAge=2592000)](https://img.shields.io/david/dev/ruiming/leibniz.svg?maxAge=2592000)
[![Release](https://img.shields.io/github/release/ruiming/leibniz.svg?maxAge=2592000)](https://img.shields.io/github/release/ruiming/leibniz.svg?maxAge=2592000)
[![License](https://img.shields.io/npm/l/leibniz.svg?maxAge=2592000)](https://img.shields.io/npm/l/leibniz.svg?maxAge=2592000)


Build for RESTful Web services

## TodoList

- [ ] ratelimit 中间件自动装载
- [ ] 配置文件及读取，据此配置中间件加载等
- [ ] context 扩展方法
- [ ] request 扩展方法
- [ ] util 工具类
- [ ] 使用 use 来加载模块，模拟命名空间

## Example

- app.js
  ```javascript
  import Leibniz from 'leibniz'

  const app = new Leibniz()

  app.listen(8000)
  ```

- controller/post.js
  ```javascript
  import { Get, Controller, Validate, Joi } from 'Leibniz'

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


[![Standard - JavaScript Style Guide](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)
