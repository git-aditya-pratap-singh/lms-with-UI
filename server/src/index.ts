import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import dotenv from "dotenv";
import DatabaseConnection from './config/dbConnection';
import authRouter from './routes/auth.routes';

dotenv.config();
const app = express();

const apiUrl = process.env.HOST +':'+ process.env.PORT;

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("../dist/public"))

app.use(cookieParser())
app.use(bodyParser.json());

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    allowedHeaders: ['Content-Type', 'Authorization'],
    methods: 'HEAD,GET,POST,PUT,PATCH,DELETE',
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 204,
}))

// callig Database connection
new DatabaseConnection().connectToMongoDB()

app.use('/api/v1', authRouter)

const PORT: string = process.env.PORT || '5000';

app.listen(PORT, ():void => {
    const msg = '🎉 Server started at ' + apiUrl
    console.log(String('*').padEnd(msg.length + 20, '*'))
    console.log('*' + String('').padEnd(msg.length + 18, ' ') + '*')
    console.log(`*${String('').padEnd(9, ' ')}${msg}${String('').padEnd(9, ' ')}*`)
    console.log('*' + String('').padEnd(msg.length + 18, ' ') + '*')
    console.log(String('*').padEnd(msg.length + 20, '*'))
})