import path from 'path'

export default function (pathList) {
  const moduleList = {}
  const serviceRootPath = path.join(__appname, 'service')
  pathList = pathList.map(item => path.relative(serviceRootPath, item).split(path.sep)).sort()
  pathList.forEach(items => items.reduce((pre, next) => {
    if (/\./.test(next)) {
      pre[path.basename(next, '.js')] = require(path.join(__appname, 'service', items.join(path.sep))).default
    } else {
      pre[next] = pre[next] || {}
      return pre[next]
    }
  }, moduleList))
  return moduleList
}
