# B12-A5-Emergency-Hotline

# JavaScript Interview Q&A

This document contains common JavaScript interview questions with clear answers and code examples.

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
