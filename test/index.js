import assert from 'node:assert/strict'
import {promises as fs} from 'node:fs'
import test from 'node:test'
import {createGfmFixtures} from 'create-gfm-fixtures'
import {micromark} from 'micromark'
import {rehype} from 'rehype'
import rehypeSortAttributes from 'rehype-sort-attributes'
import {gfm, gfmHtml} from '../index.js'
import {spec} from './spec.js'

test('core', async function () {
  assert.deepEqual(
    Object.keys(await import('micromark-extension-gfm')).sort(),
    ['gfm', 'gfmHtml'],
    'should expose the public api'
  )
})

test('markdown -> html (micromark)', async function () {
  let index = -1

  while (++index < spec.length) {
    const check = spec[index]

    // To do: support `mailto`, `xmpp` links.
    if (
      spec[index].category === 'Autolinks' &&
      (index === 24 || index === 25 || index === 26)
    ) {
      continue
    }

    // The GFM spec orders some attributes differently from the website.
    // In our tooling we prefer the website, so here we have to normalize both:
    const processor = rehype()
      .use(rehypeSortAttributes)
      .use({settings: {fragment: true}})
    const actual = micromark(check.input, {
      allowDangerousHtml: true,
      allowDangerousProtocol: true,
      extensions: [gfm()],
      htmlExtensions: [gfmHtml()]
    })

    const cleanActual = String(await processor.process(actual))
    const cleanExpected = String(await processor.process(check.output))
    assert.equal(
      cleanActual,
      cleanExpected,
      spec[index].category + ' (' + index + ')'
    )
  }
})

test('fixtures', async function () {
  const base = new URL('fixtures/', import.meta.url)

  await createGfmFixtures(base, {rehypeStringify: {closeSelfClosing: true}})

  const files = await fs.readdir(base)
  const extname = '.md'

  let index = -1

  while (++index < files.length) {
    const d = files[index]

    if (!d.endsWith(extname)) {
      continue
    }

    const name = d.slice(0, -extname.length)

    const input = await fs.readFile(new URL(name + '.md', base))
    const expected = String(await fs.readFile(new URL(name + '.html', base)))
    let actual = micromark(input, {
      allowDangerousHtml: true,
      allowDangerousProtocol: true,
      extensions: [gfm({singleTilde: false})],
      htmlExtensions: [gfmHtml()]
    })

    if (actual && !/\n$/.test(actual)) {
      actual += '\n'
    }

    // GitHub sanitizes their HTML, after turning markdown to HTML, with a
    // separate HTML compliant parser.
    // To parse HTML, when seeing an opening tag `<a>`, when another `<a>` is
    // already open, is to close the other one first.
    // We can’t do what GitHub does (and we shouldn’t: the goal is to match
    // their markdown to HTML compiler).
    if (name === 'https-autolink-in-html-phrasing') {
      actual = actual.replace(
        /<a href="#"><a href="https:\/\/example\.com">https:\/\/example\.com<\/a><\/a>/,
        '<a href="#"></a><a href="https://example.com">https://example.com</a>'
      )
    }

    assert.equal(actual, expected, name)
  }
})
