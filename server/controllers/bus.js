import Bus from "../models/Bus.js";

//post API - /api/buses
const postApiBuses = async (req, res) => {
  const { busNumber, capacity, busType } = req.body;

  const buses = new Bus({
    busNumber: busNumber,
    capacity: capacity,
    busType: busType,
  });

  try {
    const savebuses = await buses.save();
    res.json({
      success: true,
      data: savebuses,
      message: "Buses save Successfully.",
    });
  } catch (err) {
    console.log("error", err);
  }
};

//get API - /api/buses
const getApiBuses = async (req, res) => {
  try {
    const allBusesData = await Bus.find();
    res.json({
      success: true,
      data: allBusesData,
      message: "Fetch all Data",
    });
  } catch (err) {
    res.json({
      success: true,
      message: "Error in fetching the data.",
    });
  }
};

//get API - /api/buses/:id
const getApiBusesId = async (req, res) => {
  const { id } = req.params;

  try {
    const busData = await Bus.findById({ _id: id });
    res.json({
      success: true,
      data: busData,
      message: "Fetch Bus by Id",
    });
  } catch (err) {
    res.json({
      success: false,
      message: "Not Fetch Bus by Id",
    });
  }
};

//put API - /api/buses/:id
const putApiBus = async (req, res) => {
  const { id } = req.params;
  try {
    const { busNumber, capacity, busType } = req.body;

    await Bus.updateOne(
      { _id: id },
      {
        $set: {
          busNumber,
          capacity,
          busType,
        },
      }
    );

    const updateBus = await Bus.findOne({ _id: id });
    res.json({
      success: true,
      message: "Update Successfully",
    });
  } catch (err) {
    res.json({
      success: false,
      message: "Not Updated",
    });
  }
};

//patch API - /api/buses/:id
const patchApiBus = async (req, res) => {
  const { id } = req.params;
  try {
    const { busNumber } = req.body;
    await Bus.updateOne({ _id: id }, { $set: { busNumber: busNumber } });
    res.json({
      success: true,
      message: "Updated Successfully",
    });
  } catch (err) {
    res.json({
      success: false,
      message: "Not Updated",
    });
  }
};

//delete API - /api/buses/
const deleteApiBuses = async (req, res) => {
    const { id } = req.params;
  
    try {
      const deleteBusData = await Bus.deleteOne({ _id: id });
      res.json({
        success: true,
        data: deleteBusData,
        message: "Bus data deleted Successfully.",
      });
    } catch (err) {
      res.json({
        success: false,
        message: "Bus not deleted.",
      });
    }
  }

export { postApiBuses, getApiBuses, getApiBusesId, putApiBus, patchApiBus, deleteApiBuses };
