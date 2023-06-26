/**
 * @typedef Datum
 * @property {string} category
 * @property {string} input
 * @property {string} output
 */

import fs from 'node:fs/promises'
import {fromHtml} from 'hast-util-from-html'
import {select, selectAll} from 'hast-util-select'
import {toText} from 'hast-util-to-text'
import {fetch} from 'undici'

const response = await fetch('https://github.github.com/gfm/')
const text = await response.text()
const tree = fromHtml(text)
/** @type {Array<Datum>} */
const data = []
const $extensions = selectAll('div.extension', tree)
let index = -1

while (++index < $extensions.length) {
  const $extension = $extensions[index]
  const $examples = selectAll('.example', $extension)
  const $heading = select('h2', $extension)
  if (!$heading) throw new Error('Missing heading in `' + index + '`')
  const category = toText($heading)
    // Remove number.
    .replace(/^\d+\.\d+\s*/, '')
    // Remove extension.
    .replace(/\s*\(extension\)$/, '')
  let offset = -1

  while (++offset < $examples.length) {
    const $example = $examples[offset]
    const columns = selectAll('.column pre', $example)

    data.push({
      category,
      input: toText(columns[0]).replace(/→/g, '\t'),
      output: toText(columns[1]).replace(/→/g, '\t')
    })
  }
}

await fs.writeFile(
  new URL('../test/spec.js', import.meta.url),
  'export const spec = ' + JSON.stringify(data, undefined, 2) + '\n'
)

console.log('spec ✔')
