const { session } = require('electron')
const url = require('url')
const path = require('path')

/**
     * Whether the protocol was successfully registered
     *
     * Registers a protocol of `scheme` that will send an HTTP request as a response.
     *
     * The usage is the same with `registerFileProtocol`, except that the `callback`
     * should be called with an object that has the `url` property.
     */
// registerHttpProtocol(scheme: string, handler: (request: ProtocolRequest, callback: (response: ProtocolResponse) => void) => void): boolean;
console.log('regist arhttp')

const isProduction = true
const PRODUCTION_URL = 'http://www.baidu.com'
const TESTING_URL = 'http://www.baidu-test.com'

session.defaultSession.protocol.registerHttpProtocol('arhttp', (request, callback) => {
  // console.log('[arHttp] request.url: ', request.url)
  // console.log('[arHttp] request.method: ', request.method)
  // console.log('[arHttp] request.headers: ', request.headers)
  // console.log('[arHttp] request.referrer: ', request.referrer)

  const contents = url.parse(request.url)
  const targetUrl = `${isProduction ? PRODUCTION_URL : TESTING_URL}/${contents.query}`

  console.log('[arHttp] contents: ', contents)
  console.log('[arHttp] targetUrl: ', targetUrl)

  callback({url: targetUrl})
})
