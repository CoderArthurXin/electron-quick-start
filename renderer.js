/**
 * This file is loaded via the <script> tag in the index.html file and will
 * be executed in the renderer process for that window. No Node.js APIs are
 * available in this process because `nodeIntegration` is turned off and
 * `contextIsolation` is turned on. Use the contextBridge API in `preload.js`
 * to expose Node.js functionality from the main process.
 */

// 程序可能要打开不同的文件，上层可以不需要知道绝对路径，传入文件的相对路径即可
function testARFile()
{
  console.log('testARFile')

  window.open('arfile://img?flower.jpeg')
  window.open('arfile://img?avatar/boy.jpg')

  window.open('arfile://code?hello.js')

  window.open('arfile://rr?rrfile.txt') // not support
}

// 在调用HTTP接口时，要传入域名，测试阶段使用测试域名，发布是使用生产域名，
// 如果让上层来决定使用哪个域名，使得上层调用很麻烦。放在底层统一处理会更好
// 同时还可以给请求加入 header 等参数
function testARHttp()
{
  console.log('testARHttp')

  window.open('arhttp://?home')

  window.open('arhttp://?login')
}