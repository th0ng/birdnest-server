const express = require("express");
const app = express();
const service = require("./services/service");

const cors = require("cors");
app.use(cors());

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

app.get("/", async (req, res) => {});
