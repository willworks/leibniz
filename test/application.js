import test from 'ava'
import App from '../src/application'
import request from 'supertest'

test(async t => {
  const app = new App()

  const res = await request(app.listen())
    .get('/123')
    .expect(200)
  t.true(res.body.success)
  await request(app.listen())
    .post('/123')
    .expect(405)
})
