import assert from 'power-assert'
import markdownIt from 'markdown-it'
import markdownItDrawioViewer from '../dist/markdown-it-drawio-viewer'

const mdi = markdownIt()
mdi.use(markdownItDrawioViewer)

assert(mdi.render('# Hello world').trim() === '<h1>Hello world</h1>', '# Hello world')
assert(mdi.render('Hello world').trim() === '<p>Hello world</p>', 'Hello world')

it('drawio', () => {
  var render_text = mdi.render(`
* hoge

\`\`\`drawio
1VtNk5s4EP01vqYQAhsfY2eS3UMqqfJu7eaowQooAeQI4Y/99SsGgXELJw7GoPHBhRrRkl4/ulste4bX6fGDILv4I9/SZOY62+MMv5u5brBcqO9ScKoEfhBUgkiwbSVCZ8GG/Ue10NHSgm1pftFRcp5ItrsUhjzLaCgvZEQIfrjs9pUnl6PuSKRHdM6CTUgSanT7h21lrJflt3r/QVkU1yMjR995JuH3SPAi0+PNXPz15VPdTkmtS/fPY7Llh5YIP83wWnAuq6v0uKZJCW0NW/Xc+yt3m3kLmslbHnCrB/YkKfTS3zESCZLq6clTDckhZpJudiQs2wdl9Rle5VLw7w1CWElimSbqEqlLcyp6dnsqJD22RHpqHyhPqRQn1UXf9eYaJk0jTzcPZ5ugGsm4ZY/6MaJpEDWaz1CoC41GNzLYQGYjRRHKQtCZO1d2VVzFK5vQat4ejRYaEy7PgGtFY7JnvBCWwhVMCZdvwLVOSJ4rkU0QLS8Rcv0REZqbCPF0x3OFQotQtr+TgGM4GBHBhYHgZxWdyshnJ1YYTwhWYAZCukv4KS3XYydeaDEhXsvu1zOzF67Ge03hzWo/0MLr0/O3MnW1EywPTQkWMsB6G0q2Z/JkKVx+MCVcZhL/ZyapIAoznlmK2AJPiZiZ3P+dq7DorElua3QMJqWYmd5vJCkzMecjCWOW2YoaciblmZnmb+iPgmahrXhBRzZqToE6c/60yFhIXpErGxczM8vvdv6f1IL2jB4sBRG6t3FBNLP/v1jKsshSsAyvNi5aZu5voEK3Ed3oJk2e+eHpLFi9CNSNcsHq1VbjrF5KprQcwLkRrZwXItSj6XAuiYio7qWnVM7jp4i2AXM6AGuEgibKCe0vC8RdMOoxPnNWboWulFKavVutoVqOfuhsC0MPAoqgngoDQ8+LTZtl32Tmmj72mNmz38w+LJm5Pe08h4SBigY0tLndmtjQvmlobJmhYVqJ+77PQBGCiq7Y+a0Q5NTqtis75Nfni2D14/JgSF1UGnuTyNyE3k0iemTy35JCb3zd+qIJpcgjTq1bZfOLZth91Fu+Ouo15xb3Ug/qGYh5xinC0MwzN/MTu6+6dmYzifyh8hG/Vz7yuyTCiweTyCxwTEyiuf0cgo5oOZAjgnqGCoGPdkRmtedVhsDAfuYBS/q9mQcUeQ+innH2NDT1zMrZ/dT7CcGu0/I+6i3spx50erCi0tfpQT1DBU7vwcwz648TB8769LBNIs8yEvngh21u0JNFc6AIQUUD0WgBJzw0jcwK7NQ06qg22UYjD54J9o2D8NjHSOUGotESTnhoGj2gND1FHKyP9G0mn3/tZPW3fRgMqVDRQOQL4IQHJl+t/tWTr+M4xTryOQN5vrkzkueDP6gamnzWFfFRRxW/9mvW8MiDO8m+Tgwe/Hg3OrE+pnatM3VHsco6U89B7uH33bktgCLvxq1bH1PbV9vu2KLbZ2o0lKnReKa2rgKNOgqB1pka+l2/904aOvAbd9K/NrVqnv/QV3U//2kSP/0P
\`\`\`
  `);
  console.log(render_text)
});
