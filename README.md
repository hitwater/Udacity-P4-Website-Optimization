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

- **Reduce the number of moving pizzas**

- **Optimize for loops**

All unnecessary code was moved outside of the loops.

- **Save layout time with `translateX`**

`translateX` achieves the same result as `left` but triggers only the composite process.


