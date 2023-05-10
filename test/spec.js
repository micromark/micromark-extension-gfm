export const spec = [
  {
    category: 'Tables',
    input: '| foo | bar |\n| --- | --- |\n| baz | bim |\n',
    output:
      '<table>\n<thead>\n<tr>\n<th>foo</th>\n<th>bar</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>baz</td>\n<td>bim</td>\n</tr>\n</tbody>\n</table>\n'
  },
  {
    category: 'Tables',
    input: '| abc | defghi |\n:-: | -----------:\nbar | baz\n',
    output:
      '<table>\n<thead>\n<tr>\n<th align="center">abc</th>\n<th align="right">defghi</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td align="center">bar</td>\n<td align="right">baz</td>\n</tr>\n</tbody>\n</table>\n'
  },
  {
    category: 'Tables',
    input: '| f\\|oo  |\n| ------ |\n| b `\\|` az |\n| b **\\|** im |\n',
    output:
      '<table>\n<thead>\n<tr>\n<th>f|oo</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>b <code>|</code> az</td>\n</tr>\n<tr>\n<td>b <strong>|</strong> im</td>\n</tr>\n</tbody>\n</table>\n'
  },
  {
    category: 'Tables',
    input: '| abc | def |\n| --- | --- |\n| bar | baz |\n> bar\n',
    output:
      '<table>\n<thead>\n<tr>\n<th>abc</th>\n<th>def</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>bar</td>\n<td>baz</td>\n</tr>\n</tbody>\n</table>\n<blockquote>\n<p>bar</p>\n</blockquote>\n'
  },
  {
    category: 'Tables',
    input: '| abc | def |\n| --- | --- |\n| bar | baz |\nbar\n\nbar\n',
    output:
      '<table>\n<thead>\n<tr>\n<th>abc</th>\n<th>def</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>bar</td>\n<td>baz</td>\n</tr>\n<tr>\n<td>bar</td>\n<td></td>\n</tr>\n</tbody>\n</table>\n<p>bar</p>\n'
  },
  {
    category: 'Tables',
    input: '| abc | def |\n| --- |\n| bar |\n',
    output: '<p>| abc | def |\n| --- |\n| bar |</p>\n'
  },
  {
    category: 'Tables',
    input: '| abc | def |\n| --- | --- |\n| bar |\n| bar | baz | boo |\n',
    output:
      '<table>\n<thead>\n<tr>\n<th>abc</th>\n<th>def</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>bar</td>\n<td></td>\n</tr>\n<tr>\n<td>bar</td>\n<td>baz</td>\n</tr>\n</tbody>\n</table>\n'
  },
  {
    category: 'Tables',
    input: '| abc | def |\n| --- | --- |\n',
    output:
      '<table>\n<thead>\n<tr>\n<th>abc</th>\n<th>def</th>\n</tr>\n</thead>\n</table>\n'
  },
  {
    category: 'Task list items',
    input: '- [ ] foo\n- [x] bar\n',
    output:
      '<ul>\n<li><input disabled="" type="checkbox"> foo</li>\n<li><input checked="" disabled="" type="checkbox"> bar</li>\n</ul>\n'
  },
  {
    category: 'Task list items',
    input: '- [x] foo\n  - [ ] bar\n  - [x] baz\n- [ ] bim\n',
    output:
      '<ul>\n<li><input checked="" disabled="" type="checkbox"> foo\n<ul>\n<li><input disabled="" type="checkbox"> bar</li>\n<li><input checked="" disabled="" type="checkbox"> baz</li>\n</ul>\n</li>\n<li><input disabled="" type="checkbox"> bim</li>\n</ul>\n'
  },
  {
    category: 'Strikethrough',
    input: '~~Hi~~ Hello, ~there~ world!\n',
    output: '<p><del>Hi</del> Hello, <del>there</del> world!</p>\n'
  },
  {
    category: 'Strikethrough',
    input: 'This ~~has a\n\nnew paragraph~~.\n',
    output: '<p>This ~~has a</p>\n<p>new paragraph~~.</p>\n'
  },
  {
    category: 'Strikethrough',
    input: 'This will ~~~not~~~ strike.\n',
    output: '<p>This will ~~~not~~~ strike.</p>\n'
  },
  {
    category: 'Autolinks',
    input: 'www.commonmark.org\n',
    output:
      '<p><a href="http://www.commonmark.org">www.commonmark.org</a></p>\n'
  },
  {
    category: 'Autolinks',
    input: 'Visit www.commonmark.org/help for more information.\n',
    output:
      '<p>Visit <a href="http://www.commonmark.org/help">www.commonmark.org/help</a> for more information.</p>\n'
  },
  {
    category: 'Autolinks',
    input: 'Visit www.commonmark.org.\n\nVisit www.commonmark.org/a.b.\n',
    output:
      '<p>Visit <a href="http://www.commonmark.org">www.commonmark.org</a>.</p>\n<p>Visit <a href="http://www.commonmark.org/a.b">www.commonmark.org/a.b</a>.</p>\n'
  },
  {
    category: 'Autolinks',
    input:
      'www.google.com/search?q=Markup+(business)\n\nwww.google.com/search?q=Markup+(business)))\n\n(www.google.com/search?q=Markup+(business))\n\n(www.google.com/search?q=Markup+(business)\n',
    output:
      '<p><a href="http://www.google.com/search?q=Markup+(business)">www.google.com/search?q=Markup+(business)</a></p>\n<p><a href="http://www.google.com/search?q=Markup+(business)">www.google.com/search?q=Markup+(business)</a>))</p>\n<p>(<a href="http://www.google.com/search?q=Markup+(business)">www.google.com/search?q=Markup+(business)</a>)</p>\n<p>(<a href="http://www.google.com/search?q=Markup+(business)">www.google.com/search?q=Markup+(business)</a></p>\n'
  },
  {
    category: 'Autolinks',
    input: 'www.google.com/search?q=(business))+ok\n',
    output:
      '<p><a href="http://www.google.com/search?q=(business))+ok">www.google.com/search?q=(business))+ok</a></p>\n'
  },
  {
    category: 'Autolinks',
    input:
      'www.google.com/search?q=commonmark&hl=en\n\nwww.google.com/search?q=commonmark&hl;\n',
    output:
      '<p><a href="http://www.google.com/search?q=commonmark&amp;hl=en">www.google.com/search?q=commonmark&amp;hl=en</a></p>\n<p><a href="http://www.google.com/search?q=commonmark">www.google.com/search?q=commonmark</a>&amp;hl;</p>\n'
  },
  {
    category: 'Autolinks',
    input: 'www.commonmark.org/he<lp\n',
    output:
      '<p><a href="http://www.commonmark.org/he">www.commonmark.org/he</a>&lt;lp</p>\n'
  },
  {
    category: 'Autolinks',
    input:
      'http://commonmark.org\n\n(Visit https://encrypted.google.com/search?q=Markup+(business))\n',
    output:
      '<p><a href="http://commonmark.org">http://commonmark.org</a></p>\n<p>(Visit <a href="https://encrypted.google.com/search?q=Markup+(business)">https://encrypted.google.com/search?q=Markup+(business)</a>)</p>\n'
  },
  {
    category: 'Autolinks',
    input: 'foo@bar.baz\n',
    output: '<p><a href="mailto:foo@bar.baz">foo@bar.baz</a></p>\n'
  },
  {
    category: 'Autolinks',
    input:
      "hello@mail+xyz.example isn't valid, but hello+xyz@mail.example is.\n",
    output:
      '<p>hello@mail+xyz.example isn\'t valid, but <a href="mailto:hello+xyz@mail.example">hello+xyz@mail.example</a> is.</p>\n'
  },
  {
    category: 'Autolinks',
    input: 'a.b-c_d@a.b\n\na.b-c_d@a.b.\n\na.b-c_d@a.b-\n\na.b-c_d@a.b_\n',
    output:
      '<p><a href="mailto:a.b-c_d@a.b">a.b-c_d@a.b</a></p>\n<p><a href="mailto:a.b-c_d@a.b">a.b-c_d@a.b</a>.</p>\n<p>a.b-c_d@a.b-</p>\n<p>a.b-c_d@a.b_</p>\n'
  },
  {
    category: 'Autolinks',
    input:
      'mailto:foo@bar.baz\n\nmailto:a.b-c_d@a.b\n\nmailto:a.b-c_d@a.b.\n\nmailto:a.b-c_d@a.b/\n\nmailto:a.b-c_d@a.b-\n\nmailto:a.b-c_d@a.b_\n\nxmpp:foo@bar.baz\n\nxmpp:foo@bar.baz.\n',
    output:
      '<p><a href="mailto:foo@bar.baz">mailto:foo@bar.baz</a></p>\n<p><a href="mailto:a.b-c_d@a.b">mailto:a.b-c_d@a.b</a></p>\n<p><a href="mailto:a.b-c_d@a.b">mailto:a.b-c_d@a.b</a>.</p>\n<p><a href="mailto:a.b-c_d@a.b">mailto:a.b-c_d@a.b</a>/</p>\n<p>mailto:a.b-c_d@a.b-</p>\n<p>mailto:a.b-c_d@a.b_</p>\n<p><a href="xmpp:foo@bar.baz">xmpp:foo@bar.baz</a></p>\n<p><a href="xmpp:foo@bar.baz">xmpp:foo@bar.baz</a>.</p>\n'
  },
  {
    category: 'Autolinks',
    input:
      'xmpp:foo@bar.baz/txt\n\nxmpp:foo@bar.baz/txt@bin\n\nxmpp:foo@bar.baz/txt@bin.com\n',
    output:
      '<p><a href="xmpp:foo@bar.baz/txt">xmpp:foo@bar.baz/txt</a></p>\n<p><a href="xmpp:foo@bar.baz/txt@bin">xmpp:foo@bar.baz/txt@bin</a></p>\n<p><a href="xmpp:foo@bar.baz/txt@bin.com">xmpp:foo@bar.baz/txt@bin.com</a></p>\n'
  },
  {
    category: 'Autolinks',
    input: 'xmpp:foo@bar.baz/txt/bin\n',
    output:
      '<p><a href="xmpp:foo@bar.baz/txt">xmpp:foo@bar.baz/txt</a>/bin</p>\n'
  },
  {
    category: 'Disallowed Raw HTML',
    input:
      '<strong> <title> <style> <em>\n\n<blockquote>\n  <xmp> is disallowed.  <XMP> is also disallowed.\n</blockquote>\n',
    output:
      '<p><strong> &lt;title> &lt;style> <em></p>\n<blockquote>\n  &lt;xmp> is disallowed.  &lt;XMP> is also disallowed.\n</blockquote>\n'
  }
]
