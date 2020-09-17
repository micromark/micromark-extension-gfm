var autolink = require('micromark-extension-gfm-autolink-literal/html')
var strikethrough = require('micromark-extension-gfm-strikethrough/html')
var table = require('micromark-extension-gfm-table/html')
var tagfilter = require('micromark-extension-gfm-tagfilter/html')
var tasklist = require('micromark-extension-gfm-task-list-item/html')

var own = {}.hasOwnProperty

module.exports = configure([
  autolink,
  strikethrough,
  table,
  tagfilter,
  tasklist
])

function configure(extensions) {
  var handlers = {}
  var length = extensions.length
  var index = -1

  while (++index < length) {
    extension(handlers, extensions[index])
  }

  return handlers
}

function extension(handlers, extension) {
  var hook
  var left
  var right
  var type

  for (hook in extension) {
    left = own.call(handlers, hook) ? handlers[hook] : (handlers[hook] = {})
    right = extension[hook]

    for (type in right) {
      left[type] = right[type]
    }
  }
}
