const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

const { server, httpServer, ws, aedes } = require("./mqtt/server");
const mqttClient = require("./mqtt/client");
const port = 1883;
const wsPort = 8888;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// mqtt server
async function mqttServer() {
  server.listen(port, function () {
    console.log(`MQTT Broker running on port: ${port}`);
  });
  ws.createServer(
    {
      server: httpServer,
    },
    aedes.handle
  );
  httpServer.listen(wsPort, function () {
    console.log("websocket server listening on port ", wsPort);
  });
}

mqttServer()
  .then(() => {
    mqttClient;
    console.log(`Server is running on ports ${port},${wsPort}.`);
  })
  .catch((err) => {
    console.log(err);
  });
