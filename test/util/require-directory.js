import test from 'ava'
import path from 'path'
import requireDirectory from '../../src/util/require-directory'

test(async t => {
  global.__appname = path.resolve(__dirname, '..')
  const servicePath = path.resolve(__dirname, '..', 'service')
  const service = requireDirectory(`${servicePath}/**/*.js`)
  t.true(toString.call(service.post) === '[object Function]')
  t.true(toString.call(service.management.post) === '[object Function]')
})
