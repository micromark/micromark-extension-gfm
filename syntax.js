var autolink = require('micromark-extension-gfm-autolink-literal')
var strikethrough = require('micromark-extension-gfm-strikethrough')
var table = require('micromark-extension-gfm-table')
var tasklist = require('micromark-extension-gfm-task-list-item')

var own = {}.hasOwnProperty

module.exports = create

function create(options) {
  return configure([autolink, strikethrough(options), table, tasklist])
}

function configure(extensions) {
  var all = {}
  var length = extensions.length
  var index = -1

  while (++index < length) {
    extension(all, extensions[index])
  }

  return all
}

function extension(all, extension) {
  var hook
  var left
  var right
  var code
  var constructs

  for (hook in extension) {
    left = own.call(all, hook) ? all[hook] : (all[hook] = {})
    right = extension[hook]

    for (code in right) {
      // Note: we prefer the extension over existing constructs.
      // There’s no other precedence.
      constructs = [].concat(
        right[code],
        // istanbul ignore next - the if-branch isn’t used yet, but could be in
        // the future.
        own.call(left, code) ? left[code] : []
      )

      left[code] = constructs.length === 1 ? constructs[0] : constructs
    }
  }
}
