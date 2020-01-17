(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("MarkdownItDrawioViewer", [], factory);
	else if(typeof exports === 'object')
		exports["MarkdownItDrawioViewer"] = factory();
	else
		root["MarkdownItDrawioViewer"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _markdownItFence = __webpack_require__(1);

var _markdownItFence2 = _interopRequireDefault(_markdownItFence);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var escapeHTML = function escapeHTML(string) {
  if (typeof string !== 'string') {
    return string;
  }
  return string.replace(/[&'`"<>]/g, function (match) {
    return {
      '&': '&amp;',
      "'": '&#x27;',
      '`': '&#x60;',
      '"': '&quot;',
      '<': '&lt;',
      '>': '&gt;'
    }[match];
  });
};

var drawioViewerDefaultURL = function drawioViewerDefaultURL() {
  return '//www.draw.io/js/viewer.min.js';
};

var render = function render(code, drawioViewerURL, idx) {
  var trimedCode = code.trim();
  if (!trimedCode) {
    return '';
  }
  var mxGraphData = {
    editable: false,
    highlight: '#0000ff',
    nav: true,
    resize: true,
    toolbar: "zoom layers",
    edit: '_blank',
    xml: code
  };

  var json = JSON.stringify(mxGraphData);

  return '\n<div class="drawio-viewer-index-' + idx + ' markdownItDrawioViewer">\n  <div class="mxgraph" style="max-width: 100%; border: 1px solid transparent" data-mxgraph="' + escapeHTML(json) + '">\n  </div>\n  <script type="text/javascript" src="' + drawioViewerURL + '" />\n</div>\n';
};

var DrawioViewerRender = function DrawioViewerRender(drawioViewerURL) {
  return function (tokens, idx, options, env) {
    var token = tokens[idx];
    var diag_type = token.info.trim();
    var code = token.content.trim();
    var renderStr = render(code, drawioViewerURL, idx);
    return renderStr;
  };
};

var MarkdownItDrawioViewerValidate = function MarkdownItDrawioViewerValidate(params) {
  var diag_types = ['drawio'];

  var type = params.trim().split(' ', 2)[0];
  return diag_types.includes(type);
};

var MarkdownItDrawioViewerPlugin = function MarkdownItDrawioViewerPlugin(md, options) {
  options = options || {};

  var drawioViewerURL = options.drawioViewerURL || drawioViewerDefaultURL();
  var render = options.render || md.renderer.rules.image;
  var marker = options.marker || '```';

  return (0, _markdownItFence2.default)(md, 'drawio', {
    marker: marker,
    render: DrawioViewerRender(drawioViewerURL),
    validate: MarkdownItDrawioViewerValidate
  });
};

module.exports = MarkdownItDrawioViewerPlugin;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var index = function (md, name, opts) {
  function defaultValidate(params) {
    return params.trim().split(' ', 2)[0] === name
  }

  function defaultRender(tokens, idx, _options, env, self) {
    if (tokens[idx].nesting === 1) {
      tokens[idx].attrPush(['class', name]);
    }

    return self.renderToken(tokens, idx, _options, env, self)
  }

  var options = Object.assign({
    validate: defaultValidate,
    render: defaultRender
  }, opts);

  function fence(state, startLine, endLine) {
    var optionMarker = options.marker || '`';
    var pos = state.bMarks[startLine] + state.tShift[startLine];
    var max = state.eMarks[startLine];
    var haveEndMarker = false;

    if (state.sCount[startLine] - state.blkIndent >= 4) { return false }
    if (pos + 3 > max) { return false }

    var marker = state.src.charCodeAt(pos);

    if (marker !== optionMarker.charCodeAt(0)) { return false }

    var mem = pos;
    pos = state.skipChars(pos, marker);
    var len = pos - mem;

    if (len < 3) { return false }

    var markup = state.src.slice(mem, pos);
    var params = state.src.slice(pos, max);

    if (params.indexOf(String.fromCharCode(marker)) >= 0) { return false }

    var nextLine = startLine;

    for (;;) {
      nextLine++;
      if (nextLine >= endLine) { break }

      pos = mem = state.bMarks[nextLine] + state.tShift[nextLine];
      max = state.eMarks[nextLine];

      if (pos < max && state.sCount[nextLine] < state.blkIndent) { break }
      if (state.src.charCodeAt(pos) !== marker) { continue }
      if (state.sCount[nextLine] - state.blkIndent >= 4) { continue }

      pos = state.skipChars(pos, marker);

      if (pos - mem < len) { continue }

      pos = state.skipSpaces(pos);

      if (pos < max) { continue }

      haveEndMarker = true;

      break
    }

    len = state.sCount[startLine];
    state.line = nextLine + (haveEndMarker ? 1 : 0);

    var token;
    if (options.validate(params)) { token = state.push(name, 'div', 0); }
    else { token = state.push('fence', 'code', 0); }
    token.info = params;
    token.content = state.getLines(startLine + 1, nextLine, len, true);
    token.markup = markup;
    token.map = [startLine, state.line];

    return true
  }

  md.block.ruler.before('fence', name, fence, {
    alt: ['paragraph', 'reference', 'blockquote', 'list']});
  md.renderer.rules[name] = options.render;
};

module.exports = index;


/***/ })
/******/ ]);
});
//# sourceMappingURL=markdown-it-drawio-viewer.js.map