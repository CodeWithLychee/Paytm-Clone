import express from "express";
import bodyParser from "body-parser";
import rootRouter from "./routes/index.route.js";
import cors from "cors";

const app = express();
app.use(bodyParser.json());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use("/api/v1", rootRouter);

export { app };
