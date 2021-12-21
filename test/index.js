import test from 'tape'
import {rehype} from 'rehype'
import rehypeSortAttributes from 'rehype-sort-attributes'
import {micromark} from 'micromark'
import {gfm, gfmHtml} from '../index.js'
import {spec} from './spec.js'

test('markdown -> html (micromark)', async (t) => {
  let index = -1

  while (++index < spec.length) {
    const check = spec[index]
    // The GFM spec orders some attributes differently from the website.
    // In our tooling we prefer the website, so here we have to normalize both:
    const processor = rehype().use(rehypeSortAttributes)
    const actual = micromark(check.input, {
      allowDangerousHtml: true,
      allowDangerousProtocol: true,
      extensions: [gfm({singleTilde: false})],
      htmlExtensions: [gfmHtml()]
    })

    const cleanActual = String(await processor.process(actual))
    const cleanExpected = String(await processor.process(check.output))
    t.deepEqual(
      cleanActual,
      cleanExpected,
      spec[index].category + ' (' + index + ')'
    )
  }

  t.end()
})
