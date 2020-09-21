const fs = require("fs");
const path = require("path");

// // Create Folder
// fs.mkdir(path.join(__dirname, "/test"), (err) => {
//   if (err) throw err;
//   console.log("Folder Created");
// });

// // Create and write file
// fs.writeFile(path.join(__dirname, "test", "hello.txt"), "hello ", (err) => {
//   if (err) throw err;
//   console.log("File created");
// });

// // Append File
// fs.appendFile(path.join(__dirname, "test", "hello.txt"), "there", (err) => {
//   if (err) throw err;
//   console.log("File created");
// });

// Read File
fs.readFile(path.join(__dirname, "test", "hello.txt"), "utf8", (err, data) => {
  if (err) throw err;
  console.log(data);
});

// Rename file
fs.rename(
  path.join(__dirname, "test", "hello.txt"),
  path.join(__dirname, "test", "hellothere.txt"),
  (err) => {
    if (err) throw err;
    console.log("Renamed");
  }
);
