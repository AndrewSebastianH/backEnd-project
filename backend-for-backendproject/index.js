import express from "express";
import cors from "cors";
import UserRoute from "./routes/user-route.js";
import SneakerRoute from "./routes/sneaker-route.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(UserRoute);
app.use(SneakerRoute);

app.listen(3030, ()=> console.log('++++++ Servernya jalan cuyyy +++++++'))