import fs from 'fs'
import path from 'path'
import fetch from 'node-fetch'
import unified from 'unified'
import parse from 'rehype-parse'
import {select, selectAll} from 'hast-util-select'
import {toText} from 'hast-util-to-text'

fetch('https://github.github.com/gfm/')
  .then((response) => response.text())
  .then((doc) => {
    var tree = unified().use(parse).parse(doc)
    var data = []

    selectAll('div.extension', tree).forEach(($extension) => {
      var $heading = select('h2', $extension)
      var category = toText($heading)
        // Remove number.
        .replace(/^\d+\.\d+\s*/, '')
        // Remove extension.
        .replace(/\s*\(extension\)$/, '')

      selectAll('.example', $extension).forEach(($example) => {
        var columns = selectAll('.column pre', $example)

        data.push({
          category,
          input: toText(columns[0]).replace(/→/g, '\t'),
          output: toText(columns[1]).replace(/→/g, '\t')
        })
      })
    })

    return data
  })
  .then((data) => {
    return fs.promises.writeFile(
      path.join('test', 'spec.js'),
      'export const spec = ' + JSON.stringify(data, null, 2) + '\n'
    )
  })
  .then(() => {
    console.log('spec ✔')
  })
