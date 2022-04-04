console.log("worker started");
const queue = require("./queue");
queue.consume("fila1", message => {
  console.log("processing " + message.content.toString());
})