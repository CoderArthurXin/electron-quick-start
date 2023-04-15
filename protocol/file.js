const { session } = require('electron')
const url = require('url')
const path = require('path')

/**
     * Whether the protocol was successfully registered
     *
     * Registers a protocol of `scheme` that will send a file as the response. The
     * `handler` will be called with `request` and `callback` where `request` is an
     * incoming request for the `scheme`.
     *
     * To handle the `request`, the `callback` should be called with either the file's
     * path or an object that has a `path` property, e.g. `callback(filePath)` or
     * `callback({ path: filePath })`. The `filePath` must be an absolute path.
     *
     * By default the `scheme` is treated like `http:`, which is parsed differently
     * from protocols that follow the "generic URI syntax" like `file:`.
     */
// registerFileProtocol(scheme: string, handler: (request: ProtocolRequest, callback: (response: (string) | (ProtocolResponse)) => void) => void): boolean;
console.log('regist arfile')

const FILE_PROTOCOL = 'arfile' // 不能有大写字母


// 处理 img 文件
function imgHandler(request, callback) {
  // console.log('[imgHandler] request.url: ', request.url)
  // console.log('[imgHandler] request.method: ', request.method)
  // console.log('[imgHandler] request.headers: ', request.headers)
  // console.log('[imgHandler] request.referrer: ', request.referrer)

  const contents = url.parse(request.url)
  let filePath = url.fileURLToPath('file://' + request.url.slice(`${FILE_PROTOCOL}://`.length))
  filePath = path.join(__dirname, '..', filePath, contents.query)

  console.log('[imgHandler] filePath: ', filePath)

  // callback 的参数要求可以参考 registerFileProtocol 的注释
  // callback(filePath)
  // or
  callback({path: filePath})
}


// 处理 code 文件
function codeHandler(request, callback) {
  // console.log('[codeHandler] request.url: ', request.url)
  // console.log('[codeHandler] request.method: ', request.method)
  // console.log('[codeHandler] request.headers: ', request.headers)
  // console.log('[codeHandler] request.referrer: ', request.referrer)

  const contents = url.parse(request.url)
  let filePath = url.fileURLToPath('file://' + request.url.slice(`${FILE_PROTOCOL}://`.length))
  filePath = path.join(__dirname, '..', filePath, contents.query)

  console.log('[codeHandler] filePath: ', filePath)

  // callback(filePath)
  // or
  callback({path: filePath})
}


// 注册 handler
let fileHandlers = new Map()
fileHandlers.set('img', imgHandler)
fileHandlers.set('code', codeHandler)


session.defaultSession.protocol.registerFileProtocol('arfile', (request, callback) => {
  const contents = url.parse(request.url)
  console.log('[arFile] contents: ', contents)

  if (!fileHandlers.has(contents.host)) {
    console.error('protocol not support')
    // 不支持的处理
    // 虽然这里返回回去了，没有调用callback，但还是会弹出窗口 ？？
    return
  }

  fileHandlers.get(contents.host)(request, callback)
})


