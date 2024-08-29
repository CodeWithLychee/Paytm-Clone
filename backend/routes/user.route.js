import express from "express";
import { User } from "../models/user.model.js";

import { signUpValidation } from "../middlewares/userMiddlewares/signUpValidations.middleware.js";
import { signInValidation } from "../middlewares/userMiddlewares/signInValidation.middleware.js";
import { updateValidation } from "../middlewares/userMiddlewares/userDetailsUpdateValidation.middleware.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

import { generateToken } from "../utils/generateToken.js";

const route = express.Router();

route.post("/signup", signUpValidation, async (req, res) => {
  try {
    const { username, fullName, email, password, phoneNumber } = req.body;

    //checking if userName already exists
    const isUsernameExists = await User.findOne({
      username,
    });

    if (isUsernameExists) {
      return res.status(409).json({ message: "Username already taken" });
    }

    //checking if email already exists
    const isEmailExists = await User.findOne({
      email,
    });

    if (isEmailExists) {
      return res.status(409).json({ message: "Email already taken" });
    }

    //checking if phoneNumber is already exists
    const isPhoneNumberExists = await User.findOne({
      phoneNumber,
    });

    if (isPhoneNumberExists) {
      return res.status(409).json({ message: "PhoneNumber already taken" });
    }

    const user = await User.create({
      username,
      fullName,
      email,
      password, //here the hashed password will be stored before creating the user in the database
      phoneNumber,
    });

    const createdUser = await User.findOne(user._id).select(
      "-password -phoneNumber"
    );

    if (!createdUser) {
      return res.status(500).json({
        message: "Something went Wrong while registering user to our database",
      });
    }

    const token = generateToken(createdUser);

    const options = {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    };

    return res.status(200).cookie("token", token, options).json({
      message: "User created succesfully",
      user: createdUser,
    });
  } catch (error) {
    res.status(500).json({
      error: error.name,
      message: "Error occur while signup",
    });
  }
});

route.get("/name", authMiddleware, async (req, res) => {
  const name = await User.findOne({
    email: req.body.email,
  }).select("-_id fullName");

  return res.status(200).json({
    fullName: name,
  });
});

route.get("/details", authMiddleware, async (req, res) => {
  const details = await User.findOne({ email: req.body.email }).select(
    "-_id -password"
  );
  return res.status(200).json({
    details,
  });
});

route.post("/signin", signInValidation, async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const user = await User.findOne({
      email,
    });

    if (!user) {
      return res.status(404).json({
        message: "User not exists",
      });
    }

    const isPasswordCorrect = await user.isPasswordCorrect(password);

    if (!isPasswordCorrect) {
      return res.status(401).json({
        message: "Invalid user credentials",
      });
    }

    const loggedInUser = await User.findOne(user._id).select(
      "-password -phoneNumber"
    );

    const token = generateToken(loggedInUser);

    const options = {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    };

    return res.status(200).cookie("token", token, options).json({
      message: "User Logged in Succesfully",
      user: loggedInUser,
    });
  } catch (error) {
    res.status(500).json({
      error: error.name,
      message: "Error occur while signIn",
    });
  }
});

route.post("/logout", authMiddleware, (req, res) => {
  const options = {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  };
  return res.status(200).clearCookie("token", options).json({
    message: "User logout Succesfully",
  });
});

route.get("/checkLogin", authMiddleware, (req, res) => {
  return res.status(200).json({
    message: "User is already loggedIn",
  });
});

route.put("/update", authMiddleware, updateValidation, async (req, res) => {
  try {
    const { password, fullName } = req.body;

    const updatedUser = await User.findOneAndUpdate(
      {
        _id: req.body.userId,
      },
      {
        fullName,
        password,
      },
      { new: true } // This ensures the updated document is returned
    ).select("-password -phoneNumber");

    const updatedToken = generateToken(updatedUser);

    const options = {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    };

    return res.status(200).cookie("token", updatedToken, options).json({
      message: "Updated successfully",
      updatedUser,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.name,
      message: "Error while updating information",
    });
  }
});

route.get("/bulk", authMiddleware, async (req, res) => {
  try {
    const filter = req.query.filter || "";

    const users = await User.find({
      fullName: {
        $regex: filter,
      },
    });

    res.status(200).json({
      message: users.map((user) => ({
        userId: user._id,
        username: user.username,
        fullName: user.fullName,
        accounts: user.accounts,
      })),
    });
  } catch (error) {
    return res.status(500).json({
      error: error.name,
      message: "Error while fetching userNames",
    });
  }
});

route.use((err, req, res, next) => {
  return res.status(500).json({
    message: "Something went Wrong || Internal Server error",
  });
});

export default route;
