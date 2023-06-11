// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron')
const path = require('path')
const Logger = require('../modules/logger')

Logger.error('Fake error')
Logger.info('Start Electron')
Logger.debug('Debug info')

function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 780,
    height: 580,
    resizable: false,
    icon: path.join(__dirname, 'RazerIcon.ico'),
    webPreferences: {
      nodeIntegration: true,
      // 官网似乎说是默认false，但是这里必须设置contextIsolation
      contextIsolation: false,
      preload: path.join(__dirname, 'preload.js'),
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('./src/renderer/entrys/index.html')

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  let count = 0;
  setInterval(() => {
    console.log('=> ', ++count);
  }, 2000);
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()

  require('./ffi');

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
}).catch(e => {
  console.log(e);
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
