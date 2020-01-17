'use strict'

import markdownitfence from 'markdown-it-fence'

const drawioViewerDefaultURL = () => {
  return '//www.draw.io/js/viewer.min.js'
}

const render = (code, drawioViewerURL, idx) => {
  let trimedCode = code.trim()
  if (!trimedCode) {
    return ''
  }

  let rootDiv = document.createElement('div')
  rootDiv.class = `drawio-viewer-${idx} markdownItDrawioViewer`

  let drawioDiv = document.createElement('div')
  drawioDiv.classList.add('mxgraph')
  drawioDiv.style.maxWidth = '100%'
  drawioDiv.style.border = '1px solid transparent'

  let mxGraphData = {
    editable: false,
    highlight: '#0000ff',
    nav: true,
    resize: true,
    toolbar: "zoom layers",
    edit: '_blank',
    xml: code
  }

  const escapedData = JSON.stringify(mxGraphData)

  drawioDiv.setAttribute(
    'data-mxgraph',
    escapedData
  )

  let drawioScript = document.createElement('script');
  drawioScript.type = 'text/javascript'
  drawioScript.src = drawioViewerURL

  rootDiv.appendChild(drawioDiv)
  rootDiv.appendChild(drawioScript)

  return rootDiv.outerHTML
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