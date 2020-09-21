const url = require("url");

const myURL = new URL("http://www.oneofthedevs.netlify.com");

// Serialized URL
console.log(myURL.href);

// URL to String
console.log(myURL.toString());

// Hostname with port
console.log(myURL.host);

// Hostname wo port
console.log(myURL.hostname);

// Serialized query
console.log(myURL.search);

// Add param
myURL.searchParams.append("Hellothere", "General Kenobi!");

// Param Obj
console.log(myURL.searchParams);
