// Modules to control application life and create native browser window
const {app, BrowserWindow, webFrameMain} = require('electron')
const path = require('path')
const _webFrameMain = require('./_webFrameMain');

const fileName = 'main'

function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  let count = 0
  mainWindow.webContents.on(
    'did-frame-navigate',
    (event, url, httpResponseCode, httpStatusText, isMainFrame, frameProcessId, frameRoutingId) => {
      console.log('---------------------------------------------')
      console.log(`[${fileName}] url: `, url)
      console.log(`[${fileName}] httpResponseCode: `, httpResponseCode)
      console.log(`[${fileName}] httpStatusText: `, httpStatusText)
      console.log(`[${fileName}] isMainFrame: `, isMainFrame)
      console.log(`[${fileName}] frameProcessId: `, frameProcessId)
      console.log(`[${fileName}] frameRoutingId: `, frameRoutingId)

      ++count
      const frame = webFrameMain.fromId(frameProcessId, frameRoutingId)
      frame.on('dom-ready', () => {
        const code = `document.body.innerHTML = document.body.innerHTML.replaceAll("首页", "Family(${count})")`
        console.log(`[${fileName}] execute js coce`)
        frame.executeJavaScript(code)
      })
      console.log('---------------------------------------------')
      console.log('')
    }
  )
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()
  _webFrameMain.create()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
