const axios = require("axios");
const qs = require("querystring");

//mqtt client
var mqtt = require("mqtt");

// mqtt client
const options = {
  // Clean session
  clean: true,
  connectTimeout: 4000,
  // Auth
  clientId: "backend_server",
  username: "admin",
  password: "admin",
};
//Connect to the MQTT Server
var client = mqtt.connect(process.env.MQTT_URL, options);

function writeToDatabase(data) {

}

client.on("connect", function () {
  client.subscribe("temp");
  client.subscribe("humi");
  client.subscribe("hourtemp");
  client.subscribe("hourhumi");
  client.subscribe("hourcommit");
});



client.on("message", async function (topic, message, packet) {});
module.export = client;
