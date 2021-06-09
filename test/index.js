import test from 'tape'
import {micromark} from 'micromark'
import {gfm, gfmHtml} from '../index.js'
import {spec} from './spec.js'

test('markdown -> html (micromark)', function (t) {
  spec.forEach((example, index) => {
    t.deepEqual(
      micromark(example.input, {
        allowDangerousHtml: true,
        allowDangerousProtocol: true,
        extensions: [gfm({singleTilde: false})],
        htmlExtensions: [gfmHtml]
      }),
      example.output,
      example.category + ' (' + index + ')'
    )
  })

  t.end()
})
