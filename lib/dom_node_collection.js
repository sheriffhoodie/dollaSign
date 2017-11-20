class DOMNodeCollection {
  constructor(htmlArray) {
    this.htmlArray = htmlArray;
  }

  each(func) {
    this.htmlArray.forEach(func);
  }

  addInnerHtml(string) {
    if (typeof string === 'undefined') {
      return this.htmlArray[0].innerHTML;
    } else {
      this.each(element => {
        element.innerHTML = string;
      });
    }
  }

  emptyElement() {
    this.html("");
  }

  appendOffspring(offspring) {
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

  removeOffspring() {
    this.each(node => node.parentNode.removeChild(node));
  }

  setAttr(name, value) {
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

  returnChildren() {
    let offspring = [];
    this.htmmlArray.each(node => {
      offspring.concat(Array.from(node.children));
    });
    return new DOMNodeCollection(offspring);
  }

  returnParents() {
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

  addEvent(eventName, callback) {
    this.htmlArray.each(node => {
      node.addEventListener(eventName, callback);
      const eventKey = `${eventName}`;
      if (typeof node[eventKey] === 'undefined') {
        node[eventKey] = [];
      }
      node[eventKey].push(callback);
    });
  }

  removeEvent(eventName) {
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
