/**
 * @typedef {import('hast').Root} Root
 */

import {promises as fs} from 'fs'
import path from 'path'
import fetch from 'node-fetch'
import unified from 'unified'
import parse from 'rehype-parse'
import {select, selectAll} from 'hast-util-select'
import {toText} from 'hast-util-to-text'

fetch('https://github.github.com/gfm/')
  .then((response) => response.text())
  .then((doc) => {
    /** @type {Root} */
    // @ts-expect-error It’s fine.
    const tree = unified().use(parse).parse(doc)
    /** @type {Array.<{category: string, input: string, output: string}>} */
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

    return data
  })
  .then((data) => {
    return fs.writeFile(
      path.join('test', 'spec.js'),
      'export const spec = ' + JSON.stringify(data, null, 2) + '\n'
    )
  })
  .then(() => {
    console.log('spec ✔')
  })
