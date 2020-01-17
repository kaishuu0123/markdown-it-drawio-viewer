'use strict'

import markdownitfence from 'markdown-it-fence'

const escapeHTML = (string) => {
  if(typeof string !== 'string') {
    return string;
  }
  return string.replace(/[&'`"<>]/g, function(match) {
    return {
      '&': '&amp;',
      "'": '&#x27;',
      '`': '&#x60;',
      '"': '&quot;',
      '<': '&lt;',
      '>': '&gt;',
    }[match]
  });
}

const drawioViewerDefaultURL = () => {
  return '//www.draw.io/js/viewer.min.js'
}

const render = (code, drawioViewerURL, idx) => {
  let trimedCode = code.trim()
  if (!trimedCode) {
    return ''
  }
  let mxGraphData = {
    editable: false,
    highlight: '#0000ff',
    nav: true,
    resize: true,
    toolbar: "zoom layers",
    edit: '_blank',
    xml: code
  }

  const json = JSON.stringify(mxGraphData)

  return `
<div class="drawio-viewer-index-${idx} markdownItDrawioViewer">
  <div class="mxgraph" style="max-width: 100%; border: 1px solid transparent" data-mxgraph="${escapeHTML(json)}">
  </div>
  <script type="text/javascript" src="${drawioViewerURL}" />
</div>
`
}

const DrawioViewerRender = (drawioViewerURL) => {
  return (tokens, idx, options, env) => {
    const token = tokens[idx]
    const diag_type = token.info.trim()
    const code = token.content.trim()
    const renderStr = render(code, drawioViewerURL, idx)
    return renderStr
  }
}

const MarkdownItDrawioViewerValidate = (params) => {
  const diag_types = [
    'drawio'
  ]

  var type = params.trim().split(' ', 2)[0]
  return diag_types.includes(type)
}

const MarkdownItDrawioViewerPlugin = (md, options) => {
  options = options || {}

  var drawioViewerURL = options.drawioViewerURL || drawioViewerDefaultURL()
  var render = options.render || md.renderer.rules.image
  var marker = options.marker || '```'

  return markdownitfence(md, 'drawio', {
    marker: marker,
    render: DrawioViewerRender(drawioViewerURL),
    validate: MarkdownItDrawioViewerValidate,
  })
}

module.exports = MarkdownItDrawioViewerPlugin