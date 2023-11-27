import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
import User from "./models/User.js";

dotenv.config();

const app = express();
app.use(express.json());

const connectionDB = async() =>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI);
    
        if(conn){
            console.log("MongoDB Connected");
        }

    }
    catch(err){
        console.error("MongoDB is not connected");
    }
};
connectionDB();

app.get('/api/healths', async(req,res)=>{
    res.send("Server is running on.")
})

//post API - /api/users

app.post('/api/users', async(req,res)=>{
    const {userName, email, password} = req.body;

    const user = new User({
        userName: userName,
        email:email,
        password:password
    })

    try{
        const saveUserData = await user.save();
    
        res.json({
            success:true,
            data:saveUserData,
            message:"User Create Successfully"
        });
    }catch(err){
        return res.json({
            success:false,
            error: err.message
            });
    }
})

//get API - /api/users

app.get('/api/users', async(req, res)=>{

try{
    const alluserData = await User.find();
    res.json({
        success:true,
        data : alluserData,
        message:'All users'
        })
}
catch(err){
    res.json({
        success:false,
        message:'Error in fetching the data'
        })
}
});

const PORT = process.env.PORT || 5000


app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`);
});
