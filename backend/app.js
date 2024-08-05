import express from "express";
import rootRouter from "./routes/index.route.js";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
app.use(bodyParser.json());
app.use(express.json());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(cookieParser());

app.use("/api/v1", rootRouter);

export { app };
