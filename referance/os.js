const os = require("os");

// Plateform
console.log(os.platform());

// CPU Arch
console.log(os.arch());

// CPU core Info
console.log(os.cpus());

// Free memory
console.log(os.freemem());

// Total memory
console.log(os.totalmem());

// Used memory
console.log(os.totalmem() - os.freemem());

// Home dir
console.log(os.homedir());
