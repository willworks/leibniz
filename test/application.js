import test from 'ava'
import App from '../src/application'
import request from 'supertest'
import { route, router } from '../src/decorator/decorator'

test(async t => {
  const app = new App()

  @router('/asd')
  class AppRouter extends app.Router {
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

  app.use(new AppRouter())

  const res = await request(app.listen())
    .get('/asd/123')
    .expect(200)
  t.true(res.body.success)
  await request(app.listen())
    .post('/asd/123')
    .expect(405)
})
