import mongoose from "mongoose";
import express from 'express'
import { DB_NAME } from "../constants.js";

const app = express()

const connection = async () => {
    try{
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`MONGO_DB connected host:${connectionInstance.connection.host}`)
    }
    catch(error){
        console.log("MONGODB connection Failed: " ,error)
    }
    
}

export default connection