import express from "express";
import rootRouter from "./routes/index.route.js";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
console.log("op");

dotenv.config({ path: "./.env" });
console.log("dotenv");

const app = express();
app.use(bodyParser.json());
app.use(express.json());
console.log("cors");
console.log(process.env.CORS_ORIGIN);

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true); // Allow requests with no origin (e.g., same-origin requests)
      callback(null, true); // Allow all origins dynamically
    },
    credentials: true, // Allow credentials (cookies) to be sent and received
  })
);
console.log("cors mc");

app.use(cookieParser());

app.use("/api/v1", rootRouter);

export { app };
