const express = require("express");
const app = express();
const service = require("./services/service");

const cors = require("cors");
app.use(cors());

const data = [
  {
    name: "test 1",
    value: "test 1 value",
  },
  {
    name: "test 2",
    value: "test 2 value",
  },
  {
    name: "test 3",
    value: "test 3 value",
  },
];

//constructor for drone data
function droneConstructor(
  serialNumber,
  positionX,
  positionY,
  closestDistance,
  pilotInformation
) {
  this.serialNumber = serialNumber;
  this.positionX = positionX;
  this.positionY = positionY;
  this.closestDistance = closestDistance;
  this.pilotInformation = pilotInformation;
}

app.get("/", async (req, res) => {
  res.send("Hello world! Welcome to th0ng's birdnest server!");
});

app.get("/drones", (req, res) => {
  res.json(data);
});
