# markdown-it-drawio-viewer

## Install

```
npm install --save markdown-it-drawio-viewer
```

## Usage

```js
  const md = require('markdown-it')()
    .use(require('markdown-it-drawio-viewer'), opts)
```

The `opts` object can contain:

Name              | Description                                                    | Default
------------------|----------------------------------------------------------------|-----------------------------------
`drawioViewerURL` | draw.io viewer JS URL | //www.draw.io/js/viewer.min.js
`marker` | marker of blockdiag block | ```

## Runkit Example
