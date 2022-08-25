'use strict'

import { validateDrawioData } from './drawioUtils'
import xmldoc from 'xmldoc'
import markdownitfence from '@kaishuu0123/markdown-it-fence'

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

const render = (code, idx, range) => {
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
    nav: false,
    toolbar: null,
    edit: null,
    resize: true,
    lightbox: 'false',
    // "check-visible-state": false,
    // "auto-fit": false,
    // move: false,
    xml: xml
  }

  const json = JSON.stringify(mxGraphData)

  return `
<div class="drawio-viewer-index-${idx} markdownItDrawioViewer"
  data-begin-line-number-of-markdown="${range.beginLineNumber}"
  data-end-line-number-of-markdown="${range.endLineNumber}">
  <div class="mxgraph" style="max-width: 100%; border: 1px solid transparent" data-mxgraph="${escapeHTML(json)}"></div>
</div>
`;
}

const DrawioViewerRender = () => {
  return (tokens, idx, options, env) => {
    const token = tokens[idx]
    const diag_type = token.info.trim()
    const code = token.content.trim()
    const range = {
      beginLineNumber: token.map[0],
      endLineNumber: token.map[1]
    }
    const renderStr = render(code, idx, range)
    return renderStr
  }
}

const MarkdownItDrawioViewerPlugin = (md, options) => {
  options = options || {}

  var render = options.render || md.renderer.rules.image
  var marker = options.marker || '`'

  return markdownitfence(md, 'drawio', {
    marker: marker,
    render: DrawioViewerRender()
  })
}

module.exports = MarkdownItDrawioViewerPlugin
