const mqtt = require("mqtt");

// MQTT broker connection options
const options = {
  host: "4314b983f8004185ade203b01c5f6bab.s1.eu.hivemq.cloud",
  port: 8883,
  protocol: "mqtts",
  username: "labdevice",
  password: "Itsfun1!"
};

// Connect the client
const client = mqtt.connect(options);

client.on("connect", () => {
  console.log("Connected to MQTT broker");
  client.subscribe("/karelia/wartsila/026a/sensor/temperature", { qos: 0 }, (err) => {
    if (!err) {
      console.log("Subscribed to topic successfully");
    } else {
      console.error("Subscribe error:", err);
    }
  });
});

// When a message arrives
client.on("message", (topic, message, packet) => {
  const payload = message.toString();
  console.log(`\n📨 Message received on ${topic}`);
  console.log("📦 Payload:", payload);

  // Check if expiry interval is passed
  if (packet.properties && packet.properties.messageExpiryInterval) {
    console.log("⏳ Expiry Interval:", packet.properties.messageExpiryInterval, "seconds   Subscribed : " + new Date().toISOString() );
  } else {
    console.log("⏳ No expiry info – may be immediate/live message  Subscribed : " + new Date().toISOString());
  }
});
