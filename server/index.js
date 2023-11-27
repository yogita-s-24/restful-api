import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";

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

const PORT = process.env.PORT || 5000


app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`);
})
