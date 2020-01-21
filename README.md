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

**Important**

* Make sure to include A somewhere in the HTML

```html
<script type="text/javascript" src="//www.draw.io/js/viewer.min.js"></script>
```

`//www.draw.io/js/viewer.min.js` can be any URL as long as it is drawio's viewer.min.js

The `opts` object can contain:

Name              | Description                                                    | Default
------------------|----------------------------------------------------------------|-----------------------------------
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