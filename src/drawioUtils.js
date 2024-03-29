// copy from https://github.com/jgraph/drawio-tools/blob/master/tools/convert.html
import pako from 'pako'
import xmldoc from 'xmldoc'

const bytesToString = (arr) => {
  var str = '';

  for (var i = 0; i < arr.length; i++) {
    str += String.fromCharCode(arr[i]);
  }

  return str;
}

export const getTextContent = (node) => {
  return (node != null) ? node[(node.textContent === undefined) ? 'text' : 'textContent'] : '';
}

export const validateUncompressedDrawioData = (data) => {
  return new RegExp('/<mxGraphModel/').test(data);
};

export const validateCompressedDrawioData = (data) =>  {
  try {
    let doc = new xmldoc.XmlDocument(data);
    let diagram = doc.valueWithPath('diagram');
    data = diagram
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
}
