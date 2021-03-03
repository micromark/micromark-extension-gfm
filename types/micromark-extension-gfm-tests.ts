import * as syntax from 'micromark-extension-gfm'
import micromark from 'micromark'
import html = require('micromark-extension-gfm/html')

micromark('', {
  extensions: [syntax(), syntax({singleTilde: false})],
  htmlExtensions: [html]
})
