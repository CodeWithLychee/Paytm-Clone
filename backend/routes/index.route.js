import express from "express";
import userRouter from "./user.route.js";
import accountRouter from "./account.route.js";
const route = express.Router();

route.use("/user", userRouter);
route.use("/account", accountRouter);

export default route;
