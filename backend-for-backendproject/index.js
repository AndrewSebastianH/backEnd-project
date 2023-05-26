import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import UserRoute from "./routes/user-route.js";
import SneakerRoute from "./routes/sneaker-route.js";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();

app.use(cookieParser());
app.use(cors({ credentials:true, origin:'http://localhost:3000' }));
app.use(express.json());
app.use(UserRoute);
app.use(SneakerRoute);



app.listen(3030, ()=> console.log('============ SERVERNYA JALAN COYY ==========='))