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
      const duplicateIndex = dronesData.findIndex(
        (obj) => obj.data.serialNumber === drone.children[0].value
      );
      if (duplicateIndex !== -1) {
        const updatedClosestDistance =
          distance < found.data.distance
            ? distance
            : found.data.closestDistance;
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
      } else {
        service
          .getPilotInformation(drone.children[0].value)
          .then((pilotInformation) => {
            const newViolatingDrone = {
              data: new droneConstructor(
                drone.children[0].value,
                drone.children[8].value,
                drone.children[7].value,
                distance,
                pilotInformation
              ),
              time: Date.now(),
            };
            dronesData.splice(0, 0, newViolatingDrone);
          });
      }
    }
  }
}, 2000);

app.get("/", async (req, res) => {
  res.send("Hello world! Welcome to th0ng's birdnest server!");
});

app.get("/drones", (req, res) => {
  res.json(dronesData);
});
