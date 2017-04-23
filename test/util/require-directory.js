import test from 'ava'
import path from 'path'
import glob from 'glob'
import requireDirectory from '../../src/util/require-directory'

test(async t => {
  global.__appname = path.resolve(__dirname, '..')
  const servicePath = path.resolve(__dirname, '..', 'service')
  const serviceFiles = glob.sync(`${servicePath}/**/*.js`)
  const service = requireDirectory(serviceFiles)
  t.true(toString.call(service.post) === '[object Function]')
  t.true(toString.call(service.management.post) === '[object Function]')
})
