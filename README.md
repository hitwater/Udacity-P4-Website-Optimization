# Udacity-P5-Website Optimization


## Getting Started

**Dependencies:** node.js, npm, and gulp.

Run `npm install` to install the required node-modules for gulp.

Run `gulp serve` to open both the local and the ngrok-hosted site in your browser.

Run `gulp psi` to perform PageSpeed test for index.html and see the test results.

## Performance Improvements

### Part 1: Optimize index.html achieves a PageSpeed score of at least 90 for Mobile and Desktop.

- **Minify html, css, js files and optimize all pictures with gulp**

- **Inline all css and js**


### Part 2: Optimize pizza.html renders with a consistent frame-rate at 60fps when scrolling.

- **Use fast methods to access DOM**
line 413, line 435, line 461, line 517: changed the document.querySelector() and document.querySelectorAll() methods to document.getElementsById() or document.getElementsByClassName().

- **Optimize for loops**
line 462: moved dx,offsetWith, newwidth out of the loop.
line 519: moved document.body.scrollTop out of the loop.
line 544:Reduce the loop maximum number from 200 times to current viewport size.


