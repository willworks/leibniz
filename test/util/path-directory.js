import test from 'ava'
import path from 'path'
import glob from 'glob'
import pathDirectory from '../../src/util/path-directory'

test(async t => {
  global.__app__ = path.resolve(__dirname, '../application.js')
  const servicePath = path.resolve(__dirname, '..', 'service')
  const serviceFiles = glob.sync(`${servicePath}/**/*.js`)
  const service = pathDirectory(serviceFiles)
  t.true(toString.call(service.post) === '[object Function]')
  t.true(toString.call(service.management.post) === '[object Function]')
})
