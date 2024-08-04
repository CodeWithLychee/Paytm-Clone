import express from "express";
import { User } from "../models/user.model.js";

import { generateToken } from "../utils/generateToken.js";

import { signUpValidation } from "../middlewares/signUpValidations.middleware.js";
import { signInValidation } from "../middlewares/signInValidation.middleware.js";

import { createHash } from "../utils/createHash.js";
import { validatePassword } from "../utils/validatePassword.js";

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

    const user = await User.create({
      username: username,
      fullName: fullName,
      email: email,
      password: hashedPassword,
      phoneNumber: phoneNumber,
    });

    const createdUser = await User.findOne(user._id).select(
      "-password -phoneNumber"
    );

    if (!createdUser) {
      return res.status(411).json({
        message: "Something went Wrong while registering user to our database",
      });
    }

    const token = generateToken(createdUser);

    const options = {
      httpOnly: true,
      secure: true,
    };

    return res.status(200).cookie("Token", token, options).json({
      message: "User created succesfully",
      user: createdUser,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error occur while signup",
      error: error,
    });
  }
});

route.post("/signin", signInValidation, async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      return res.status(400).json({
        message: "Email is required",
      });
    }

    if (!password) {
      return res.status(400).json({
        message: "Password is required",
      });
    }

    const user = await User.findOne({
      email: email,
    });

    if (!user) {
      return res.status(404).json({
        message: "User not exists",
      });
    }

    const hashedPassword = user.password;

    const isPasswordCorrect = await validatePassword(password, hashedPassword);

    if (!isPasswordCorrect) {
      return res.status(401).json({
        message: "Password is incorrect",
      });
    }

    const loggedInUser = await User.findOne(user._id).select(
      "-password -phoneNumber"
    );

    const token = generateToken(loggedInUser);

    const options = {
      httpOnly: true,
      secure: true,
    };

    return res.status(200).cookie("Token", token, options).json({
      message: "User Logged in Succesfully",
      user: loggedInUser,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error occur while signIn",
      error: error,
    });
  }
});

route.post("/logout", (req, res) => {});
export default route;
