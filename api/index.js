import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoute from "./routes/auth.js";
import hotelsRoute from "./routes/hotels.js";
import roomsRoute from "./routes/rooms.js";
import usersRoute from "./routes/users.js";

const app = express();

dotenv.config();
const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("connected to mongodb");
    } catch (error) {
        throw error;
    }
}

mongoose.connection.on("disconnected", () => {
    console.log("mongodb disconnected");
});
mongoose.connection.on("connected", () => {
    console.log("mongodb connected");
});

const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,
    optionSuccessStatus:200
}

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use("/", (req, res) => {
    console.log('Cookies: ', req.cookies)
    console.log('Signed Cookies: ', req.signedCookies)
    return;
})

app.use("/api/auth", authRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);
app.use("/api/users", usersRoute);

app.use((err,req,res,next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "something went wrong!";
    return res.status(errorStatus).json({
        success: false,
        states: errorStatus,
        message: errorMessage,
        stack: err.stack,
    })

})

app.listen(2000, () => {
    // connect();
    console.log("connected");
});