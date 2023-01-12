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

var dronesData = [];

setInterval(async () => {
  const newDronesData = await service.getDronesPosition();
  for (drone in newDronesData) {
    //Check if the position is in the no-fly zone
    const distance = Math.hypot(
      Math.abs(drone.children[8].value - 250000),
      Math.abs(drone.children[7].value - 250000)
    );
    //Check if the distance is less than 100000
    if (distance < 100000) {
      const found = dronesData.find(
        (obj) => obj.data.serialNumber === drone.children[0].value
      );
      const updatedClosestDistance =
        distance < found.data.distance ? distance : found.data.closestDistance;
    }
    //Define the updated piece of data
    const updatedDroneData = new droneConstructor(
      found.data.serialNumber,
      drone.children[8].value,
      drone.children[7].value,
      updatedClosestDistance,
      found.data.pilotInformation
    );
    const updatedDrone = {
      data: updatedDroneData,
      time: Date.now(),
    };
  }
}, 2000);

app.get("/", async (req, res) => {
  res.send("Hello world! Welcome to th0ng's birdnest server!");
});

app.get("/drones", (req, res) => {
  res.json(data);
});
