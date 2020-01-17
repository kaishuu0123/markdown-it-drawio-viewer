import assert from 'power-assert'
import markdownIt from 'markdown-it'
import markdownItDrawio from '../dist/main'

const mdi = markdownIt()
mdi.use(markdownItDrawio)

assert(mdi.render('# Hello world').trim() === '<h1>Hello world</h1>', '# Hello world')
assert(mdi.render('Hello world').trim() === '<p>Hello world</p>', 'Hello world')

it('drawio', () => {
  var render_text = mdi.render(`\`\`\`drawio
  <?xml version="1.0" encoding="UTF-8"?>
  <mxfile host="www.draw.io" modified="2020-01-09T01:34:32.361Z" agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.88 Safari/537.36" etag="TE5m5CSXGyu-3-PFkR8v" version="12.4.9" type="device"><diagram id="ldwlAbw439MAuAiACUBH" name="Page-1">jZJNT4QwEIZ/DUcTCi4uR8VVD3owbLLnSmdpk0JJ6Vrw11vslI9sNvHSzDzz0Zm3jdKiGV417fiHYiCjJGZDlD5HSZLfZ+6cwOjBLice1Fowj1agFD+AMEZ6EQz6TaJRShrRbWGl2hYqs2FUa2W3aWclt7d2tIYrUFZUXtOTYIZ7uk8eFv4GoubhZpLlPtLQkIyb9JwyZVcoPURpoZUy3mqGAuSkXdDF173ciM6DaWjNfwp25fFxdPrnX/3nEL/rzh5Pd9jlm8oLLozDmjEo4Lo4sZ3zZLkwUHa0miLWPbdj3DTSecSZ2Aq0geHmjGTe3P0YUA0YPboULEhiFAt/C8nQt4v2JAjKV7rvkVF87npuvSjiDBQluIv4f7HVD04Pvw==</diagram></mxfile>
  \`\`\``);
  console.log(render_text)
});
