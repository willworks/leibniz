import test from 'ava'
import App from '../src/application'
import request from 'supertest'

test(async t => {
  const app = new App()
  app.use(async ctx => {
    ctx.status = 200
    ctx.body = {
      success: true
    }
  })
  const res = await request(app.listen())
    .get('/')
    .expect(200)
  t.true(res.body.success)
})
