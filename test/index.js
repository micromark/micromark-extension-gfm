import test from 'tape'
import {micromark} from 'micromark'
import {gfm, gfmHtml} from '../index.js'
import {spec} from './spec.js'

test('markdown -> html (micromark)', (t) => {
  let index = -1

  while (++index < spec.length) {
    t.deepEqual(
      micromark(spec[index].input, {
        allowDangerousHtml: true,
        allowDangerousProtocol: true,
        extensions: [gfm({singleTilde: false})],
        htmlExtensions: [gfmHtml()]
      }),
      spec[index].output,
      spec[index].category + ' (' + index + ')'
    )
  }

  t.end()
})
