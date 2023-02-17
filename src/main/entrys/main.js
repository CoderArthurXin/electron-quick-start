// Modules to control application life and create native browser window
const {app, BrowserWindow, ipcMain} = require('electron')
const path = require('path')
const Logger = require('../modules/logger')
const ffi = require('ffi-napi');

Logger.error('Fake error')
Logger.info('Start Electron')
Logger.debug('Debug info')

let ffiLib = undefined;

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
  // mainWindow.webContents.openDevTools();

  let count = 0;
  setInterval(() => {
    console.log('=> ', ++count);
  }, 1000);
}

ipcMain.on('MR', (event, args) => {
  if (args == 'loadDLL') {
    let apiObj = {
      add: ['uint32', ['uint32', 'uint32']],
      testSleep: ['void', ['uint32']],
      doSomethingTimeConsuming: ['uint32', ['uint32']],
    };

    ffiLib = ffi.Library('C:\\00_Work\\03_Personal\\Code\\ArthurXin\\electron-quick-start\\cpp_code\\forTest\\x64\\Debug\\forTest.dll', apiObj);
  } else if (args == 'Add') {
    const sum = ffiLib['add'](12, 34);
    console.log('sum -> ', sum)
  } else if (args == 'Sleep') {
    ffiLib['doSomethingTimeConsuming'](10000);
  }
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()

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
