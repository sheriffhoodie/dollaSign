const DOMNodeCollection = require("./dom_node_collection.js");

let $l = window.$l;
let docReady = false;
let funcArray = [];

window.$l = (arg) => {
  switch(typeof arg) {
    case "function":
      return registerCallbacks(arg);
    case "object": {
      if (arg instanceof(HTMLElement)) {
        return new DOMNodeCollection(arg);
      }
    }
    case "string": {
      const nodes = document.querySelectorAll(arg);
      const nodearray = Array.from(nodes);
      return new DOMNodeCollection(nodearray);
    }
  }
};

$l.extend = (object, ...otherObjects) => {
  Object.assign(object, ...otherObjects);
  return object;
};

$l.ajax = (options) => {
  const defaults = {
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    method: 'get',
    url: "",
    success: () => {},
    error: () => {},
    data: {}
  };
  const request = new XMLHttpRequest();
  options = $l.extend(defaults, options);
  if (options.method.toUpperCase() === 'GET') {
    options.url += `?${toQueryString(options.data)}`;
  }
  request.open(options.method, options.url, true);
  request.onload = (event) => {
    if (request.status === 200) {
      options.success(request.response);
    } else {
      options.error(request.response);
    }
  };
  request.send(JSON.stringify(options.data));
};

const toQueryString = (obj) => {
  let result = "";
  for (const prop in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, prop)) {
      result += `${prop}=${obj(prop)}&`;
    }
  }
  return result.substring(0, result.length - 1);
};

const registerCallbacks = (cb) => {
  if (docReady === false) {
    funcArray.push(cb);
  } else {
    cb();
  }
};

document.addEventListener("DOMContentLoaded", () => {
  docReady = true;
  funcArray.forEach(func => {
    func();
  });
});
