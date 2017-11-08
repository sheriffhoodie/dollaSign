# dollaSign

dollaSign is a JavaScript DOM interaction library inspired by jQuery. Using dollaSign, users can:

* Select single or multiple DOM elements
* Traverse and manipulate DOM elements
* Build DOM elements
* Create DOMNodeCollection objects from HTMLElements
* Queue functions until DOM is fully loaded
* Simplify HTTP requests
* Getting Started

The quickest way to get started with dollaSign is to download this library into your project and include the webpack output dolla_sign.js in your source code.

        <head>
          <meta charset="utf-8">
          <link rel="stylesheet" href="./css/reset.css">
          <script type="text/javascript" src="./dolla_sign.js"></script>
          ...
        </head>

Alternatively, user can use the documents in the src folder by running webpack in the command line to recreate the webpack file.

## API

### DOM Traversal

**each**
**children**
**parent**

**DOM Manipulation**

* html
* empty
* append
* remove
* attr
* addClass
* removeClass
* toggleClass
* Event Listeners:
  * on
  * off
* $l.ajax

**$l**

The dollaSign library utilizes the global variable of $l as a wrapper for all of the methods in the dollaSign library.

It can be used four ways:

1. $l is most commonly used to select elements with CSS selectors; $l("ul") returns a DOMNodeCollection object, an array of HTMLElements.

2. Can also be used to create DOMNodeCollection objects from unwrapped HTMLElements, giving these elements access to dollaSign methods.

3. $l takes in a string of HTML code, builds HTMLElement(s) from the code, and then wraps the HTMLElement(s) in a DOMNodeCollection object.

4. As a tool to queue functions to run once the DOM is fully loaded.

$l(() => {

  const elements = $l("div");
  // The element variable is a DOMNodeCollection object, an array-like
  //structure, so a DOMNodeCollection method such as `each`
  //may be used

  elements.each((element) => {

    // Use Number 3: This use of $l takes the string of HTML code, creates a HTMLElement,
    // and wraps the HTMLElement in a DOMNodeCollection object

    const paragraph = $l("<p></p>");

    // Because the elements contained by the DOMNodeCollection are still
    // HTMLElements, they must be wrapped in an DOMNodeCollection before using
    // DOMNodeCollection methods such as `append`

    const $lelement = $l(element);
    $lelement.append(paragraph);

  });

});

### DOM Traversal

DOMNodeCollection methods to navigate DOM elements

**each**

Iterates through the elements in a DOMNodeCollection and applies a callback function passed as an argument

    const elements = $l("ul");
    elements.each(callback);
    children

Returns a DOMNodeCollection object containing all of the children elements of every HTMLElement in the original DOMNodeCollection.

**parent**

Returns a DOMNodeCollection object containing the parent elements of every HTMLElement in the original DOMNodeCollection.

### DOM Manipulation

DOMNodeCollection methods to view and/or change DOM elements

**html**

Returns the innerHTML for the first element in the DOMNodeCollection if no argument is given. If a string argument is given, changes the innerHTML of each DOMNodeCollection element to the string argument.

**empty**

Empties the innerHTML of each DOMNodeCollection element

**append**

Takes a single HTMLElement, DOMNodeCollection, or string argument and appends it to each DOMNodeCollection element.

**remove**

Remove each DOMNodeCollection element from the DOM.

**attr**

Takes either one (attr(attribute)) or two (attr(attribute, value)) arguments. If given one argument, the method gets the value of the attribute given for the the first element in the DOMNodeCollection. The method sets the attribute, given as the first argument, as the value, given as the second argument, for each DOMNodeCollection element.

**addClass**

Adds a class, given as an argument, to each DOMNodeCollection element.

**removeClass**

Removes a class, given as an argument, from each DOMNodeCollection element.

**Event Listeners**

* **on**
  * Adds event listener to each DOMNodeCollection element. List of events are available here.

* **off**
  * Removes event listener from each DOMNodeCollection element.

**$l.ajax**

Sends HTTP Request and returns a Promise object. Accepts a Hash object as an argument with any of the following attributes:

* method (default: "GET"): HTTP Request method or type
* url (default: window.location.href): URL for HTTP Request
* success: success callback
* error: error callback
* contentType (default: 'application/x-www-form-urlencoded; charset=UTF-8'): content type of HTTP Request

        $l.ajax({
          method: "POST",
          url: "/payroll.json",
          data: {
            manager: {
              name: "Blastoise",
              employees: []
            }
          },
          success: function (response) {
            console.log("Test was a success!");
          }
          failure: function (response) {
            // return failure response
          }
        });

### Example

Coming soon!
