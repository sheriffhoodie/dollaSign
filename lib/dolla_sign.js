/******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const DOMNodeCollection = __webpack_require__(1);

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


/***/ }),
/* 1 */
/***/ (function(module, exports) {


class DOMNodeCollection {
  constructor(htmlArray) {
    this.htmlArray = htmlArray;
  }

  each(func) {
    this.htmlArray.forEach(func);
  }

  html(string) {
    if (typeof string === 'undefined') {
      return this.htmlArray.findIndex(0).innerHTML;
    } else {
      this.each(element => {
        element.innerHTML = string;
      });
    }
  }

  empty() {
    this.html("");
  }

  append(offspring) {
    if (this.htmlArray.length === 0) return;

    if (typeof offspring === 'object' && typeof offspring !== DOMNodeCollection) {
      if (offspring instanceof(HTMLElement)) {
        new DOMNodeCollection(offspring);
        this.append(offspring);
      }
    }
    if (typeof offspring === "string") {
      this.each((node) => {
        node.innerHTML += offspring;
      });
    } else if (offspring instanceof DOMNodeCollection) {
      this.each(node => {
        offspring.each(offspringNode => {
          node.appendChild(offspringNode.cloneNode(true));
        });
      });
    }
  }

  attr(name, value) {
    if (typeof value !== "string") {
      return this.htmlArray[0].getAttribute(name);
    }
    this.each(node => {
      node.setAttribute(name, value);
    });
  }

  addClass(newClass) {
    this.htmlArray.each(node => {
      node.classList.add(newClass);
    });
  }

  removeClass(oldClass) {
    this.htmlArray.each(node => {
      node.classList.remove(oldClass);
    });
  }

  children() {
    let offspring = [];
    this.htmmlArray.each(node => {
      offspring.concat(Array.from(node.children));
    });
    return new DOMNodeCollection(offspring);
  }

  parent() {
    let parents = [];
    this.htmlArray.each(node => {
      parents.push(node.parentElement);
    });
    return new DOMNodeCollection(parents);
  }

  find(selectors) {
    const nodes = [];
    this.htmlArray.each(node => {
      const resultList = node.querySelectorAll(selectors);
      nodes.concat(Array.from(resultList));
    });
    return new DOMNodeCollection(nodes);
  }

  on(eventName, callback) {
    this.htmlArray.each(node => {
      node.addEventListener(eventName, callback);
      const eventKey = `${eventName}`;
      if (typeof node[eventKey] === 'undefined') {
        node[eventKey] = [];
      }
      node[eventKey].push(callback);
    });
  }

  off(eventName) {
    this.htmlArray.each(node => {
      const eventKey = `${eventName}`;
      if (node[eventKey]) {  
        node[eventKey].forEach(callback => {
          node.removeEventListener(eventName, callback);
        });
      }
      node[eventKey] = [];
    });
  }

}

module.exports = DOMNodeCollection;


/***/ })
/******/ ]);