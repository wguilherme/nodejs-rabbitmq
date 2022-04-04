function connect() {
  return require('amqplib').connect("amqp://localhost")
    .then(conn => conn.createChannel());
}

function createQueue(channel, queue) {
  return new Promise((resolve, reject) => {
    try {
      channel.assertQueue(queue, { durable: true });
      resolve(channel);
    }
    catch (err) { reject(err) }
  });
}

function sendToQueue(queue, message) {
  connect()
    .then(channel => createQueue(channel, queue))
    .then(channel => channel.sendToQueue(queue, Buffer.from(JSON.stringify(message))))
    .catch(err => console.log(err))
}

async function publishInExchange(exchange, routingKey, message) {

  try {
    connect().then(channel => {
      channel.assertExchange(exchange, 'direct', { durable: true });
      channel.publish(exchange, routingKey, Buffer.from(JSON.stringify(message)));
    })


  } catch (error) {
    console.log(error.message)
  }
}

function consume(queue, callback) {
  connect()
    .then(channel => createQueue(channel, queue))
    .then(channel => channel.consume(queue, callback, { noAck: true }))
    .catch(err => console.log(err));
}

module.exports = {
  sendToQueue,
  publishInExchange,
  consume
}