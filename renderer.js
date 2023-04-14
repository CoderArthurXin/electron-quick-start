/**
 * This file is loaded via the <script> tag in the index.html file and will
 * be executed in the renderer process for that window. No Node.js APIs are
 * available in this process because `nodeIntegration` is turned off and
 * `contextIsolation` is turned on. Use the contextBridge API in `preload.js`
 * to expose Node.js functionality from the main process.
 */
const { ipcRenderer } = require('electron')

async function test() {

  let mimi = localStorage.getItem('mimi')
  if(mimi) {
    const numbers = mimi.split(',').map(v => parseInt(v))
    const plainText = await ipcRenderer.invoke('decrypt', Buffer.from(numbers))

    console.log('解密后的数据为：', plainText)
  } else {
    const data = await ipcRenderer.invoke('encrypt', 'Happy 2023')
    const array = new Uint8Array(data)

    console.log('加密后的数据为：', array.toString())

    localStorage.setItem('mimi', array.toString())
  }
}

test()
