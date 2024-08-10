import express from "express";
import rootRouter from "./routes/index.route.js";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

const app = express();
app.use(bodyParser.json());
app.use(express.json());

app.use(cookieParser());

app.use("/api/v1", rootRouter);

export { app };
