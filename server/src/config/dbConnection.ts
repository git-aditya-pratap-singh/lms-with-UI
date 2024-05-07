import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const connectToDB = async (): Promise<mongoose.Connection> =>{
    try{
        const conn = await mongoose.connect(peocess.env.MONGO_URL as string);
        console.log("Connected to MongoDB");
        return conn.connection;
    }catch(err){
        console.error("Failed to connect to database:", err);
        throw new Error("Failed to connect to database");
    }
}

export default connectToDB;

