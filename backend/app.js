import express from "express";
import bodyParser from "body-parser";
import { User } from "./models/user.model.js";

const app = express();
app.use(bodyParser.json());

app.post("/signup", async (req, res) => {
  console.log(req.body);

  const { username, fullName, email, password, phoneNumber } = req.body;

  try {
    await User.create({
      username,
      fullName,
      email,
      password,
      phoneNumber,
    });

    console.log("done");

    res.json({
      msg: "User created",
    });
  } catch (error) {
    console.log(error.message);
  }
});
export { app };
