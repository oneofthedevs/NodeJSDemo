const Person = require("./person");
const p1 = new Person("Yoda", 900);
const Logger = require("./logger");

const log = new Logger();

Logger.on("message", (data) => console.log(`called listener:`, data));

Logger.log("hello there");
