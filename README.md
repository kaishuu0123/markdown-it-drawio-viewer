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
* https://runkit.com/embed/qn4v9obx5eyr

## Use demo.html

* Use oneliner HTTP server on Project root directory.

```
$ npx http-server
or
$ npm install -D http-server
$ ./node_modules/.bin/http-server
```

* View http://127.0.0.1:8080/demo.html