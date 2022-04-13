
const mkdirp = require('mkdirp')
const fs = require('fs')
const path = require('path')

function mkdirSync(dirpath){
  if (fs.existsSync(dirpath)) {
    return
  }
  let dirlist = [dirpath]

  let tmpDir = dirpath

  while(!fs.existsSync(tmpDir))
  {
    tmpDir = path.dirname(tmpDir)
    if (fs.existsSync(tmpDir)) {
      break
    }
    dirlist.push(tmpDir)
  }
  for (var i = dirlist.length - 1; i >= 0; i--) {
    fs.mkdirSync(dirlist[i])
  }
}

function mkdir (dirpath) {
  if (process.platform == 'win32') {
    mkdirSync(dirpath)
  } else{
    mkdirp.sync(dirpath)
  }
}

function rmdir(dirpath) {
  try{
    if (fs.existsSync(dirpath)) {
      let errCount = 0
      fs.readdirSync(dirpath).forEach(function(file, index){
        let curPath = path.join(dirpath, file)
        if (fs.lstatSync(curPath).isDirectory()) { // recurse
          rmdir(curPath)
        } else { // delete file
          try{
            fs.unlinkSync(curPath)
          }catch(err){
            errCount++
            console.warn('rmdir error:', err.message, curPath, errCount)
          }
        }
      })
      let files = fs.readdirSync(dirpath)
      if(!(files && files.length)){
        fs.rmdirSync(dirpath)
      }
    }
  }catch(e){
    console.warn('rmdir final error:',e)
  }
}

module.exports = {
  mkdir,
  rmdir
}