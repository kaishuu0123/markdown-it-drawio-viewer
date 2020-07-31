import assert from 'power-assert'
import markdownIt from 'markdown-it'
import markdownItDrawioViewer from '../dist/markdown-it-drawio-viewer'

const mdi = markdownIt()
mdi.use(markdownItDrawioViewer)

assert(mdi.render('# Hello world').trim() === '<h1>Hello world</h1>', '# Hello world')
assert(mdi.render('Hello world').trim() === '<p>Hello world</p>', 'Hello world')

it('drawio', () => {
  var render_text = mdi.render(`
* Hoge
  * Fuga

\`\`\` drawio
jZJNb4MwDIZ/DXcIG22vY+122YnDzhHxSKRAUOoO2K+fWRw+VFXaJbIf24n9OkletuObl73+cApsIlI1JvlrIsTpWdA5gymAongKoPFGBZStoDI/wDBlejMKrrtEdM6i6fewdl0HNe6Y9N4N+7QvZ/ev9rKBO1DV0t7TT6NQB3oUh5W/g2l0fDkrTiHSypjMk1y1VG7YoPyc5KV3DoPVjiXYWbuoS6i7PIgujXno8D8FvIhvaW88G/eFUxyWCkhXcl4GbRCqXtZzZKDNEtPYWvIyMvkq8Ajjw3ayZUj6HOBaQD9RSiw4sC78MUTK/rDKnEXt9EbiIzPJm22Wq9fhyeD5o7vq/BfbfNb8/As=
\`\`\`
  `);
  console.log(render_text)
});

it('drawio double render', () => {
  var render_text = mdi.render(`hoge

\`\`\` drawio
jZLBboMwDIafhnshE+2uY1132YnDzhHxSKSAUeoW2NMvLE4DQpN2iezPdmz/SSaqbro4OegPVGCz4qCmTLxmRXEUwp8LmBmUTwG0zqiA8gRq8w0MD0xvRsF1k0iIlsywhQ32PTS0YdI5HLdpX2i3XQfZwg7UjbR7+mkU6UBPxTHxdzCtjp3z8jlEOhmTeZOrlgrHFRLnTFQOkYLVTRXYRbuoS6h7+yP6GMxBT/8pKELBXdob76bR7x5mozku7Iu8tt55GbUhqAfZLJHRv65nmjrrvdyb+/480h0cwbRCPM8FsANys0/hqBCsDX+OvGR/TFLnUT+9kvnETPLrto+rkwDeYA2im7T+ja0+rDj/AA==
\`\`\`

fuga

aaa

\`\`\` drawio
3ZRNU4QwDIZ/DXe+ZPEqrnrQ8cDBc5dG2rFQphQBf73Bhq9Zd8aTh70w6ZOkTd5k8KKsGh4Na8SL5qC80OeDF917YXiIU/xOYCSQxA6URnKHghXk8gsI+kQ7yaHdBVqtlZXNHha6rqGwO8aM0f0+7F2r/asNK+EM5AVT5/RNciscTcPDyp9AlmJ+OUhunadiczB10grGdb9B0dGLMqO1dVY1ZKAm7WZdXN7DBe9SmIHa/iUhdAmfTHXUG9Vlx7lZLLGZzGJUsuZgsMa7XkgLecOKydHjjJEJWyk8BWiedIeR/Pm0AFZ8lGair53Fa4B460Yb3KBNlYCxMFzsJlg0wt0CXYE1I4ZQQuiTrLRXQULnfp3SjMRmQCkxRntRLjev0qFB6v2uZHRVSsb/pyQe133/8W1+GtHxGw==
\`\`\`
  `);
  console.log(render_text);
})
