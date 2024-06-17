import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import dotenv from "dotenv";
import ConnectDatabase from './config/dbConnection';
import router from './routes/auth.routes';

dotenv.config();
const app = express();

const apiUrl = process.env.HOST +':'+ process.env.PORT;

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], 
    allowedHeaders: ['Content-Type', 'Authorization'], 
    credentials: true
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("../dist/public"))

app.use(cookieParser())
app.use(bodyParser.json());

// callig Database connection
new ConnectDatabase().connectMongodb()

app.use('/api/v1', router)

const PORT: string = process.env.PORT || '5000';

app.listen(PORT, ():void => {
    const msg = '🎉 Server started at ' + apiUrl
    console.log(String('*').padEnd(msg.length + 20, '*'))
    console.log('*' + String('').padEnd(msg.length + 18, ' ') + '*')
    console.log(`*${String('').padEnd(9, ' ')}${msg}${String('').padEnd(9, ' ')}*`)
    console.log('*' + String('').padEnd(msg.length + 18, ' ') + '*')
    console.log(String('*').padEnd(msg.length + 20, '*'))
})