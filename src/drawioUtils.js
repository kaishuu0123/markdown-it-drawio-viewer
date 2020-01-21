// copy from https://github.com/jgraph/drawio-tools/blob/master/tools/convert.html
import pako from 'pako'

const bytesToString = (arr) => {
  var str = '';

  for (var i = 0; i < arr.length; i++) {
    str += String.fromCharCode(arr[i]);
  }

  return str;
};

const parseXml = (xml) => {
  if (window.DOMParser) {
    var parser = new DOMParser();

    return parser.parseFromString(xml, 'text/xml');
  } else {
    var result = createXmlDocument();

    result.async = 'false';
    result.loadXML(xml);

    return result;
  }
};

export const validateDrawioData = (data) =>  {
  try {
    var node = parseXml(data).documentElement;

    if (node != null && node.nodeName == 'mxfile') {
      var diagrams = node.getElementsByTagName('diagram');

      if (diagrams.length > 0) {
        data = getTextContent(diagrams[0]);
      }
    }
  } catch (e) {
    // ignore
  }

  try {
    if (typeof window === 'undefined') {
      // Node.js
      data = new Buffer(data, 'base64').toString('binary');
    } else {
      // Browser
      data = atob(data);
    }
  } catch (e) {
    throw(`atob failed: ${e}`);
  }

  if (data.length > 0) {
    try {
      data = bytesToString(pako.inflateRaw(data));
    } catch (e) {
      throw(`inflateRaw failed: ${e}`);
    }
  }

  try {
    data = decodeURIComponent(data);
  } catch (e) {
    throw(`decodeURIComponent failed: ${e}`);
  }

  return true;
};