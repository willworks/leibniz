import path from 'path'
import glob from 'glob'

const _cacheModuleList = {}

/**
 * 递归解析路径 src 下的所有模块
 * @param {String} src
 * src 格式同 glob
 */
export default function requireDirectory (src) {
  if (_cacheModuleList[src]) return _cacheModuleList[src]
  const moduleList = {}
  const serviceRootPath = path.join(__appname, 'service')
  const pathList = glob.sync(src).map(item => path.relative(serviceRootPath, item).split(path.sep)).sort()
  pathList.forEach(items => items.reduce((pre, next) => {
    if (/\./.test(next)) {
      pre[path.basename(next, '.js')] = require(path.join(__appname, 'service', items.join(path.sep))).default
    } else {
      pre[next] = pre[next] || {}
      return pre[next]
    }
  }, moduleList))
  _cacheModuleList[src] = moduleList
  return moduleList
}
