import assert from 'power-assert'
import markdownIt from 'markdown-it'
import markdownItDrawioViewer from '../dist/markdown-it-drawio-viewer'

const mdi = markdownIt()
mdi.use(markdownItDrawioViewer)

assert(mdi.render('# Hello world').trim() === '<h1>Hello world</h1>', '# Hello world')
assert(mdi.render('Hello world').trim() === '<p>Hello world</p>', 'Hello world')

it('drawio', () => {
  var render_text = mdi.render(`\`\`\`drawio
  jZJNT4QwEIZ/DUcTCi4uR8VVD3owbLLnSmdpk0JJ6Vrw11vslI9sNvHSzDzz0Zm3jdKiGV417fiHYiCjJGZDlD5HSZLfZ+6cwOjBLice1Fowj1agFD+AMEZ6EQz6TaJRShrRbWGl2hYqs2FUa2W3aWclt7d2tIYrUFZUXtOTYIZ7uk8eFv4GoubhZpLlPtLQkIyb9JwyZVcoPURpoZUy3mqGAuSkXdDF173ciM6DaWjNfwp25fFxdPrnX/3nEL/rzh5Pd9jlm8oLLozDmjEo4Lo4sZ3zZLkwUHa0miLWPbdj3DTSecSZ2Aq0geHmjGTe3P0YUA0YPboULEhiFAt/C8nQt4v2JAjKV7rvkVF87npuvSjiDBQluIv4f7HVD04Pvw==
  \`\`\``);
  console.log(render_text)
});
