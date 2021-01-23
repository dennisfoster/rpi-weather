const express = require("express");
const app = express();
const port = 3000;
const sensor = require("node-dht-sensor").promises;

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.get("/room_data", async (req, res) => {
    try {
        const sensorData = await sensor.read(11, 4);
        res.send({
            temperature: sensorData.temperature.toFixed(0),
            humidity: sensorData.humidity.toFixed(0),
        });
    } catch (err) {
        res.send({ error: err });
    }
});

app.listen(port, () => {
    console.log(`Weather app listening at http://localhost:${port}`);
});
