import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const connectToDB = async (): Promise<mongoose.Connection> =>{
    try{
        const connectionInstance = await mongoose.connect(process.env.MONGO_URL as string);
        console.log(`📥 MongoDB Connected on PORT No. => ${connectionInstance.connection.port}`)
        return connectionInstance.connection;
    }catch(err){
        console.error("Failed to connect to database:", err);
        throw new Error("Failed to connect to database");
    }
}

export default connectToDB;

