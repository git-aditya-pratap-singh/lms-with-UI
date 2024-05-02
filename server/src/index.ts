import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors())
app.use(bodyParser.json())

const PORT: string = process.env.PORT || '5000';

app.listen(PORT, ():void => {
    console.log(`listening on port ${PORT} `);
})