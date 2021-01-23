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
            payload: {
                google: {
                    expectUserResponse: false,
                    richResponse: {
                        items: [
                            {
                                simpleResponse: {
                                    textToSpeech: "this is a simple response",
                                },
                            },
                        ],
                    },
                },
            },
        });
    } catch (err) {
        res.send("Failed to read sensor data:", err);
    }
});

app.listen(port, () => {
    console.log(`Weather app listening at http://localhost:${port}`);
});
