require('../date')
const { app } = require('electron')
const path = require('path')
const winston = require('winston')
const DailyRotateFile = require('winston-daily-rotate-file')

const { mkdir } = require('../mkdir')


const BASE_DIR = app.getPath('appData')
const LOG_DIR = path.join(BASE_DIR, 'razer')
console.log(`Log dir: ${LOG_DIR}`)

mkdir(LOG_DIR)

function dateFormat () {
  return new Date().format('yyyy-MM-dd hh:mm:ss')
}

const fileTransport = new DailyRotateFile({
  name: 'all',
  filename: `${LOG_DIR}/log`,
  timestamp: dateFormat,
  level: 'info',
  colorize:true,
  maxsize: 1024 * 1024 * 10,
  maxFiles: 30,
  datePattern:'.yyyy-MM-dd',
})

const consoleTransport = new winston.transports.Console({
  level: process.env.NODE_ENV === 'development'? 'debug': 'info'
})

const transports = [
  consoleTransport
]


if(process.env.NODE_ENV != 'development'){
  transports.push(fileTransport)
}

const logger = new (winston.Logger)({
  exitOnError: false,
  transports: transports
})


function log (level, ...strs) {
  logger[level](...strs)
}

function info (...strs) {
  log('info', ...strs)
}

function warn (...strs) {
  log('warn', ...strs)
}

function error (...strs) {
  log('error', ...strs)
  console.debug && console.debug(...strs)
}

function debug(...strs) {
  if(process.env.NODE_ENV === 'development'){
    log('debug', ...strs)
  }
  console.debug && console.debug(...strs)
}

module.exports = {
  log,
  info,
  warn,
  error,
  debug
}