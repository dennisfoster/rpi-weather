const express = require("express");
const app = express();
const port = 3000;
const sensor = require("node-dht-sensor").promises;

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.get("/room_data", async (req, res) => {
    try {
        const res = await sensor.read(11, 4);
        console.log(`temp: ${res.temperature.toFixed(1)}°C, ` + `humidity: ${res.humidity.toFixed(1)}%`);
    } catch (err) {
        console.error("Failed to read sensor data:", err);
    }
});

app.listen(port, () => {
    console.log(`Weather app listening at http://localhost:${port}`);
});
