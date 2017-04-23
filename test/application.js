import test from 'ava'
import App from '../src/application'
import request from 'supertest'

test(async t => {
  const app = new App()
  app.listen()
  // TODO: take some time to initialize
  await new Promise(resolve => setTimeout(() => resolve(), 100))
  const res1 = await request(app.callback())
    .get('/post/123')
    .expect(200)
  t.true(res1.body.success)

  const res2 = await request(app.callback())
    .post('/post/123')
    .expect(405)
  t.true(res2.body.success)

  const res3 = await request(app.callback())
    .get('/post/aaa')
    .expect(400)
  t.is(res3.body.message, 'child "id" fails because ["id" must be a number]')
})
