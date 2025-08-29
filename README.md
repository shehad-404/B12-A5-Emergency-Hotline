# B12-A5-Emergency-Hotline

# JavaScript Interview Q&A

This document contains common JavaScript interview questions with clear answers and code examphles.

---

## 1. What is the difference between `getElementById`, `getElementsByClassName`, and `querySelector` / `querySelectorAll`?

- **`getElementById("id")`** → Returns a single element by its unique `id`.
- **`getElementsByClassName("class")`** → Returns all elements with a given class as a **live HTMLCollection**.
- **`querySelector("selector")`** → Returns the **first element** that matches a CSS selector.
- **`querySelectorAll("selector")`** → Returns **all elements** matching a CSS selector as a **static NodeList**.

```js
document.getElementById("title");       // single element by ID
document.getElementsByClassName("box"); // all .box elements (HTMLCollection)
document.querySelector(".box");         // first .box element
document.querySelectorAll(".box");      // all .box elements (NodeList)
```

## 2. How do you create and insert a new element into the DOM?

- You can create elements using document.createElement(), set properties, and insert them using appendChild(), prepend(), before(), or after()..

```js
let newDiv = document.createElement("div");
newDiv.textContent = "Hello World!";
newDiv.className = "box";

document.body.appendChild(newDiv); // inserts at the end of <body>
```

## 3. What is Event Bubbling and how does it work?

- Event Bubbling is the process where an event triggered on a child element bubbles up to its parent elements.

```html
<div id="container">
  <button id="btn">Click Me</button>
</div>

```

```js
document.getElementById("btn").addEventListener("click", () => {
  console.log("Button clicked");
});
document.getElementById("container").addEventListener("click", () => {
  console.log("Container clicked");
});
// Output when clicking button:
// "Button clicked"
// "Container clicked"

```

## 4. How do you create and insert a new element into the DOM?

- You can create elements using document.createElement(), set properties, and insert them using appendChild(), prepend(), before(), or after()..

```js
let newDiv = document.createElement("div");
newDiv.textContent = "Hello World!";
newDiv.className = "box";

document.body.appendChild(newDiv); // inserts at the end of <body>
```

## 5. How do you create and insert a new element into the DOM?

- You can create elements using document.createElement(), set properties, and insert them using appendChild(), prepend(), before(), or after()..

```js
let newDiv = document.createElement("div");
newDiv.textContent = "Hello World!";
newDiv.className = "box";

document.body.appendChild(newDiv); // inserts at the end of <body>
```
