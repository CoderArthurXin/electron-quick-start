const { MessageChannelMain, utilityProcess, app } = require('electron')
const path = require('path')

const fileName = '_UtilityProcess'

// Main process
// const { port1, port2 } = new MessageChannelMain()
const child = utilityProcess.fork(path.join(__dirname, 'test.js'))

let count = 0
setInterval(() => {
  child.postMessage({ message: `count to ${++count}` })
}, 5000)

child.on('exit', () => {
  console.log(`[${fileName}] child process exit`)
})

app.on('quit', () => {
  const isKilled = child.kill()
  console.log(isKilled ? `[${fileName}] child process is killed` : `[${fileName}] child process not killed`)
})
