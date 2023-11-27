import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
import Booking from "./models/Booking.js";

dotenv.config();

//import controller
import { getApiHealth } from "./controllers/health.js";
import { postApiUsers, getApiUsers, deleteApiUsers } from "./controllers/user.js";
import { postApiBuses, getApiBuses, getApiBusesId, putApiBus, patchApiBus, deleteApiBuses } from "./controllers/bus.js";


const app = express();
app.use(express.json());

const connectionDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    if (conn) {
      console.log("MongoDB Connected");
    }
  } catch (err) {
    console.error("MongoDB is not connected");
  }
};
connectionDB();

app.get("/api/v1/healths", getApiHealth);

//post API - /api/users

app.post("/api/v1/users", postApiUsers);

//get API - /api/users

app.get("/api/v1/users", getApiUsers);

//delete API - /api/users/:id

app.delete("/api/v1/users/:id", deleteApiUsers);

//post API - /api/buses
app.post("/api/v1/buses", postApiBuses);

//get API - /api/buses
app.get("/api/v1/buses", getApiBuses);

//get API - /api/buses/:id
app.get('/api/v1/buses/:id',getApiBusesId);

//put API - /api/buses/:id
app.put('/api/v1/buses/:id',putApiBus);

//patch API - /api/v1/buses/:id
app.patch('/api/v1/buses/:id',patchApiBus);

//delete API - /api/v1/buses/:id
app.delete('/api/v1/buses/:id',deleteApiBuses);

//post API - /api/booking

app.post('/api/bookings', async(req,res)=>{
    const {user,bus,contactNumber,seatNumber,date,isConfirmed,to,from} = req.body;

    try{
      const booking = new Booking ({
          user,
          bus,
          contactNumber,
          seatNumber,
          date,
          isConfirmed,
          to,
          from
      })
  
      const saveBookings = await booking.save();
  
      res.json({
          success:true,
          data:saveBookings,
          message:"Booking created successfully"
      })

    }catch(err){
      console.log('Error in saving booking');
    }
});

//GET /booking/:id
app.get("/api/bookings/:id", async (req, res) => {
  const { id } = req.params;
  const findBooking = await Order.findById(id).populate("user booking");

  //This not show in booking
  findBooking.user.password = undefined;

  res
    .json({
      success: true,
      data: findBooking,
      message: "Booking successfully found",
    })
    .populate("user booking");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
