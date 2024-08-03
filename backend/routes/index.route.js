import express from "express";
import userRouter from "./user.route.js";

const route = express.Router();

route.use("/user", userRouter);

export default route;
