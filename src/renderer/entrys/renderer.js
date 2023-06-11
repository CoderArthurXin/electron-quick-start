// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.
const { ipcRenderer } = require('electron');

const CHANNELNAME = 'test-ffi';

let count = 0;
setInterval(() => {
  console.log('renderer count => ', ++count);
}, 2000);

async function loadDLL() {
  const fnName = 'loadDLL'
  ipcRenderer.invoke(CHANNELNAME, {
    action: 'loadDLL'
  }).then(res => {
    console.log(`${fnName} res -> `, res);
  }).catch(err => {
    console.log(`${fnName} err -> `, err);
  })
}


async function syncSleep10S() {
  const fnName = 'syncSleep10S'
  ipcRenderer.invoke(CHANNELNAME, {
    action: 'syncSleep10S'
  }).then(res => {
    console.log(`${fnName} res -> `, res);
  }).catch(err => {
    console.log(`${fnName} err -> `, err);
  })
}


async function asyncSleep10S() {
  const fnName = 'asyncSleep10S'
  ipcRenderer.invoke(CHANNELNAME, {
    action: 'asyncSleep10S'
  }).then(res => {
    console.log(`${fnName} res -> `, res);
  }).catch(err => {
    console.log(`${fnName} err -> `, err);
  })
}