import express from "express";
import { signup } from "./routes/signup";
import { signin } from "./routes/signin";
import { signout } from "./routes/signout";
import { currentUser } from "./routes/current-user";
import dotenv from 'dotenv';
import connectDB from "./config/db";

const app = express ();

const port = process.env.PORT || 3000;

app.use(express.json());
dotenv.config();

app.use(signup)
app.use(signin)
app.use(signout)
app.use(  currentUser)


app.listen (port, ()=>{
    console.log('server running on',port);
    connectDB()
    
})