// Child process

const fileName = 'test'

console.log(`[${fileName}] process id: `, process.pid)

process.parentPort.on('message', (e) => {
  // const [port] = e.ports
  // console.log(`[${fileName}] port: `, port)

  console.log(`[${fileName}] data: `, e.data)
})