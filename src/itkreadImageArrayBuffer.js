const PromiseWorker = require('promise-worker-transferable')

const config = require('./itkConfig.js')

const worker = new window.Worker(config.webWorkersPath + '/ImageIOWorker.js')
const promiseWorker = new PromiseWorker(worker)

/**
 * Read an image from a file ArrayBuffer in the browser.
 *
 * @param: buffer arrayBuffer that contains the file contents
 * @param: fileName string that contains the file name
 * @param: mimeType optional mime-type string
 */
const readImageArrayBuffer = (arrayBuffer, fileName, mimeType) => {
  return promiseWorker.postMessage({ name: fileName, type: mimeType, buffer: arrayBuffer, config: config },
    [arrayBuffer])
}

module.exports = readImageArrayBuffer
