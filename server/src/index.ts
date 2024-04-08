import express from "express";

const app = express();

app.listen(5000, (): void=>{
    console.log("Server has been Started on PORT No. 5000")
})