import mongoose from "mongoose";

const busSchema = new mongoose.Schema({
  busNumber: {
    type: String,
    required: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
  busType:{
    type :String ,
    enum : ['AC', 'Non AC'],
    default:'Non AC',
    required:true
  }
},{timestamps:true});

const Bus = mongoose.model("busSchema", Bus);

export default Bus;
