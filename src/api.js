const express = require('express');
const app = express();
const queue = require("./queue");

app.use(express.json());

const router = express.Router();

router.post('/task', (req, res) => {
  // const message = JSON.stringify(req.body)
  const message = req.body
  queue.sendToQueue("queue1", message);
  queue.publishInExchange("amq.direct", "route", message);
  res.json({ message: 'Your request will be processed!' });
});

app.use('/', router);

app.listen(3100);