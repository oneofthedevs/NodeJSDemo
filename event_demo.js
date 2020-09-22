const { SlowBuffer } = require("buffer");
const Emitter = require("events");

// Create Class
class MyEmitter extends Emitter {}

// Init Obj

const myEmitter = new MyEmitter();

// Event Listen
myEmitter.on("event", () => console.log("log"));

// Init Event
myEmitter.emit("event");
myEmitter.emit("event");
myEmitter.emit("event");
myEmitter.emit("event");
