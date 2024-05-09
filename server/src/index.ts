import express from 'express';
import cors from 'cors';
import dotenv from "dotenv";
import connectToDB from './config/dbConnection';

dotenv.config();

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))

connectToDB()

const PORT: string = process.env.PORT || '5000';

app.listen(PORT, ():void => {
    console.log(`🌏 Server Start on PORT No. => ${PORT}`);
})