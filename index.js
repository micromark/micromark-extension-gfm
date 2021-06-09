import {
  combineExtensions,
  combineHtmlExtensions
} from 'micromark-util-combine-extensions'
import autolink from 'micromark-extension-gfm-autolink-literal'
import autolinkHtml from 'micromark-extension-gfm-autolink-literal/html.js'
import strikethrough from 'micromark-extension-gfm-strikethrough'
import strikethroughHtml from 'micromark-extension-gfm-strikethrough/html.js'
import table from 'micromark-extension-gfm-table'
import tableHtml from 'micromark-extension-gfm-table/html.js'
import tagfilterHtml from 'micromark-extension-gfm-tagfilter/html.js'
import tasklist from 'micromark-extension-gfm-task-list-item'
import tasklistHtml from 'micromark-extension-gfm-task-list-item/html.js'

export function gfm(options) {
  return combineExtensions([autolink, strikethrough(options), table, tasklist])
}

export const gfmHtml = combineHtmlExtensions([
  autolinkHtml,
  strikethroughHtml,
  tableHtml,
  tagfilterHtml,
  tasklistHtml
])
