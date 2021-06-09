/**
 * @typedef {import('micromark-util-types').Extension} Extension
 * @typedef {import('micromark-util-types').HtmlExtension} HtmlExtension
 * @typedef {import('micromark-extension-gfm-strikethrough').GfmStrikethroughOptions} Options
 */

import {
  combineExtensions,
  combineHtmlExtensions
} from 'micromark-util-combine-extensions'
// @ts-expect-error: next
import autolink from 'micromark-extension-gfm-autolink-literal'
// @ts-expect-error: next
import autolinkHtml from 'micromark-extension-gfm-autolink-literal/html.js'
import strikethrough from 'micromark-extension-gfm-strikethrough'
// @ts-expect-error: next
import strikethroughHtml from 'micromark-extension-gfm-strikethrough/html.js'
// @ts-expect-error: next
import table from 'micromark-extension-gfm-table'
// @ts-expect-error: next
import tableHtml from 'micromark-extension-gfm-table/html.js'
// @ts-expect-error: next
import tagfilterHtml from 'micromark-extension-gfm-tagfilter/html.js'
// @ts-expect-error: next
import tasklist from 'micromark-extension-gfm-task-list-item'
// @ts-expect-error: next
import tasklistHtml from 'micromark-extension-gfm-task-list-item/html.js'

/**
 * Support GFM or markdown on github.com.
 *
 * @param {Options} [options]
 * @returns {Extension}
 */
export function gfm(options) {
  // @ts-expect-error: hush
  return combineExtensions([autolink, strikethrough(options), table, tasklist])
}

/** @type {HtmlExtension} */
export const gfmHtml = combineHtmlExtensions([
  autolinkHtml,
  strikethroughHtml,
  tableHtml,
  tagfilterHtml,
  tasklistHtml
])
