const express = require("express");
const app = express();
const port = 3000;
const sensor = require("node-dht-sensor").promises;

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.post("/room_data", async (req, res) => {
    try {
        const sensorData = await sensor.read(11, 4);

        // res.send({
        //     temperature: sensorData.temperature.toFixed(1),
        //     humidity: sensorData.humidity.toFixed(1),
        // });
        res.send({
            fulfillment_response: {
                messages: [
                    {
                        text: {
                            text: [
                                "Current humidity is " +
                                    sensorData.humidity.toFixed(0) +
                                    ", current temperature is " +
                                    sensorData.temperature.toFixed(0) +
                                    ".",
                            ],
                        },
                    },
                ],
            },
        });
    } catch (err) {
        res.send("Failed to read sensor data:", err);
    }
});

app.listen(port, () => {
    console.log(`Weather app listening at http://localhost:${port}`);
});
