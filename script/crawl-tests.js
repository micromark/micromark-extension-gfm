'use strict'

var fs = require('fs')
var path = require('path')
var fetch = require('node-fetch')
var unified = require('unified')
var parse = require('rehype-parse')
var select = require('hast-util-select')
var text = require('hast-util-to-text')

fetch('https://github.github.com/gfm/')
  .then((response) => response.text())
  .then((doc) => {
    var tree = unified().use(parse).parse(doc)
    var data = []

    select.selectAll('div.extension', tree).forEach(($extension) => {
      var $heading = select.select('h2', $extension)
      var category = text($heading)
        // Remove number.
        .replace(/^\d+\.\d+\s*/, '')
        // Remove extension.
        .replace(/\s*\(extension\)$/, '')

      select.selectAll('.example', $extension).forEach(($example) => {
        var columns = select.selectAll('.column pre', $example)

        data.push({
          category: category,
          input: text(columns[0]).replace(/→/g, '\t'),
          output: text(columns[1]).replace(/→/g, '\t')
        })
      })
    })

    return data
  })
  .then((data) => {
    return fs.promises.writeFile(
      path.join('test', 'spec.json'),
      JSON.stringify(data, null, 2) + '\n'
    )
  })
  .then(() => {
    console.log('spec ✔')
  })
