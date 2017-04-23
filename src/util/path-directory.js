import path from 'path'

export default function (pathsList) {
  let resultList = {}
  pathsList = pathsList.map(paths => paths.split(path.sep))
  pathsList.forEach(paths => {
    let judgeList = {}
    console.log(paths)
    for (let i = __app__.split(path.sep).length; i < paths.length; i++) {
      // console.log(i)
      judgeList = resultList
      for (let j = __app__.split(path.sep).length; j <= i; j++) {
        let key = paths[j]
        // console.log(key)
        if (judgeList[key] === undefined) {
          if (j !== paths.length - 1) {
            judgeList[key] = {}
          } else {
            let allpath = ''
            paths.forEach(key => {
              allpath = allpath + key + '/'
            })
            allpath = allpath.slice(0, -1)
            // console.log(allpath)
            key = key.slice(0, -3)
            judgeList[key] = require(allpath).default
          }
        }
        judgeList = judgeList[key]
      }
    }
  })
  console.log(resultList)
  return resultList
}
