const { BrowserWindow, webFrameMain } = require('electron')

const fileName = '_webFrameMain'

function create() {
  const win = new BrowserWindow({ width: 800, height: 1500 })
  win.loadURL('https://www.piaozone.com/')

  win.webContents.on(
    'did-frame-navigate',
    (event, url, httpResponseCode, httpStatusText, isMainFrame, frameProcessId, frameRoutingId) => {
      console.log(`[${fileName}] url: `, url)
      console.log(`[${fileName}] httpResponseCode: `, httpResponseCode)
      console.log(`[${fileName}] httpStatusText: `, httpStatusText)
      console.log(`[${fileName}] isMainFrame: `, isMainFrame)
      console.log(`[${fileName}] frameProcessId: `, frameProcessId)
      console.log(`[${fileName}] frameRoutingId: `, frameRoutingId)

      win.webContents.on('dom-ready', () => {
        const frame = webFrameMain.fromId(frameProcessId, frameRoutingId)
        const code = 'document.body.innerHTML = document.body.innerHTML.replaceAll("首页", "Home")'
        console.log(`[${fileName}] execute js coce`)
        frame.executeJavaScript(code)
      })
    }
  )

}

module.exports = {
  create,
}