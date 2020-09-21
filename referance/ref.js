const path = require("path");

// File Name
console.log(path.basename(__filename)); // ref.js

// Directory Name
console.log(path.basename(__dirname)); // referance

// File extension
console.log(path.extname(__filename)); // .js

// Create path obj
console.log(path.parse(__filename).base); // ref.js

// Concatenate paths
console.log(path.join(__dirname, "test", "hello.html")); // D:\Working\node\referance\test\hello.html
