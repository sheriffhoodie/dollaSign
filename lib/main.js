const DOMNodeCollection = require("./dom_node_collection.js");

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

// $l.extend() => {
//
// }

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
