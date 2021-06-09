var test = require('tape')
var micromark = require('micromark')
var syntax = require('../syntax.js')({singleTilde: false})
var html = require('../html.js')
var spec = require('./spec.json')

test('markdown -> html (micromark)', function (t) {
  spec.forEach((example, index) => {
    t.deepEqual(
      micromark(example.input, {
        allowDangerousHtml: true,
        allowDangerousProtocol: true,
        extensions: [syntax],
        htmlExtensions: [html]
      }),
      example.output,
      example.category + ' (' + index + ')'
    )
  })

  t.end()
})
