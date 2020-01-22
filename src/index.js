'use strict'

import { validateDrawioData } from './drawioUtils'
import xmldoc from 'xmldoc'
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

const render = (code, idx) => {
  let trimedCode = code.trim()
  if (!trimedCode) {
    return ''
  }

  try {
    validateDrawioData(trimedCode)
  } catch (e) {
    return `
<div class="drawio-viewer-index-${idx} markdownItDrawioViewer markdownItDrawioViewerError">
  <p>MarkdownItDrawioViewer Error: ${e}</p>
</div>
`;
  }

  let xml = null;
  try {
    // may be XML Format <mxfile><diagram> ... </diagram></mxfile>
    let doc = new xmldoc.XmlDocument(trimedCode);
    let diagram = doc.valueWithPath('diagram');
    if (diagram) {
      xml = trimedCode;
    }
  } catch (e) {
    // may be NOT XML Format
    xml = `
<mxfile version="6.8.9" editor="www.draw.io" type="atlas">
  <mxAtlasLibraries/>
  <diagram>${trimedCode}</diagram>
</mxfile>
`
  }

  let mxGraphData = {
    editable: false,
    highlight: '#0000ff',
    nav: true,
    resize: true,
    toolbar: "zoom layers",
    edit: '_blank',
    xml: xml
  }

  const json = JSON.stringify(mxGraphData)

  return `
<div class="drawio-viewer-index-${idx} markdownItDrawioViewer">
  <div class="mxgraph" style="max-width: 100%; border: 1px solid transparent" data-mxgraph="${escapeHTML(json)}" />
</div>
`;
}

const DrawioViewerRender = () => {
  return (tokens, idx, options, env) => {
    const token = tokens[idx]
    const diag_type = token.info.trim()
    const code = token.content.trim()
    const renderStr = render(code, idx)
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

  var render = options.render || md.renderer.rules.image
  var marker = options.marker || '```'

  return markdownitfence(md, 'drawio', {
    marker: marker,
    render: DrawioViewerRender(),
    validate: MarkdownItDrawioViewerValidate,
  })
}

module.exports = MarkdownItDrawioViewerPlugin
