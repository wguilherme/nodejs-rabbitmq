console.log("worker started");
const queue = require("./queue");
queue.consume("queue1", message => {
  console.log("processing " + message.content.toString());
})