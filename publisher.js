const mqtt = require("mqtt");

// MQTT broker connection options
const options = {
  host: "4314b983f8004185ade203b01c5f6bab.s1.eu.hivemq.cloud",
  port: 8883,
  protocol: "mqtts",
  username: "labdevice",
  password: "Itsfun1!"
};

// Create MQTT client
const client = mqtt.connect(options);

// Sample payload
const data = {
  timestamp: new Date().toISOString(),
  sensor_id: "026a-temp-01",
  value: 21.7,
  unit: "°C",
  status: "ok"
};

// MQTT 5 property: Message Expiry Interval
const properties = {
  messageExpiryInterval: 3600 // 1 hour in seconds
};

// On successful connection
client.on("connect", () => {
  console.log("Connected to MQTT broker");

  // Publish with expiry

  client.publish(
    "/karelia/wartsila/026a/sensor/temperature",
    JSON.stringify(data),
    {
      retain: true,  // ✅ This stores the message in the broker
      properties: {
        messageExpiryInterval: 3600  // ✅ Expire after 1 hour
      }
    },
    () => {
      console.log("✅ Message published and retained for 3600 seconds  , published : " + new Date().toISOString());
      client.end();
    }
  );
});
