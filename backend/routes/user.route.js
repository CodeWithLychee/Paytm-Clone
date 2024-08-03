import express from "express";
import { signUpValidation } from "../middlewares/zodValidation/signUpValidation.middleware.js";
import { User } from "../models/user.model.js";
import { createHash } from "../utils/createHash.js";

const route = express.Router();

route.post("/signup", signUpValidation, async (req, res) => {
  try {
    const { username, fullName, email, password, phoneNumber } = req.body;

    //checking if userName already exists
    const isUsernameExists = await User.findOne({
      username: username,
    });

    if (isUsernameExists) {
      return res.status(411).json({ message: "Username already taken" });
    }

    //checking if email already exists
    const isEmailExists = await User.findOne({
      email: email,
    });

    if (isEmailExists) {
      return res.status(411).json({ message: "Email already taken" });
    }

    //checking if phoneNumber is already exists
    const isPhoneNumberExists = await User.findOne({
      phoneNumber: phoneNumber,
    });

    if (isPhoneNumberExists) {
      return res.status(411).json({ message: "PhoneNumber already taken" });
    }

    const hashedPassword = await createHash(password);

    const newUser = await User.create({
      username: username,
      fullName: fullName,
      email: email,
      password: hashedPassword,
      phoneNumber: phoneNumber,
    });

    if (!newUser) {
      return res.status(411).json({
        message: "Something went Wrong while registering user to our database",
      });
    }

    res.status(200).json({
      message: "User created succesfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error occur while signup",
      error: error.message,
    });
  }
});

export default route;
