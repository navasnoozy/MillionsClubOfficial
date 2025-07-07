import express from "express";
import connectDB from "./config/db";


const app = express ();

const port = process.env.PORT || 3000;


app.listen (port, ()=>{
   console.log("Server is running on ", port);
   connectDB ();
})