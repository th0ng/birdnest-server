//function for fetching drones information
const getDronesPosition = async () => {
  const response = await axios.get(
    "https://assignments.reaktor.com/birdnest/drones",
    {
      "Content-Type": "application/xml; charset=utf-8",
    }
  );
  const jsonData = new XMLParser().parse(response.data);
  return jsonData.children[1].children;
};

//function for fetching pilot's information using drone's serial number
const getPilotInformation = async (serialNumber) => {
  const response = await axios.get(
    `https://assignments.reaktor.com/birdnest/drones/${serialNumber}`,
    {
      "Content-Type": "application/json",
    }
  );
  return response.data;
};

module.exports = { getDronesPosition, getPilotInformation };
