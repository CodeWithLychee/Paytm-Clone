import express from "express";
import mongoose from "mongoose";

import { authMiddleware } from "../middlewares/auth.middleware.js";
import { Account } from "../models/account.model.js";
import { User } from "../models/user.model.js";
import { generateToken } from "../utils/generateToken.js";

const route = express.Router();

route.post("/addAccount", authMiddleware, async (req, res) => {
  try {
    //a person will be awarded with rs 2000 initially
    const { userId, email, accountNumber } = req.body;

    const isAccountExists = await Account.findOne({
      accountNumber,
    });

    if (isAccountExists) {
      return res.status(409).json({
        message: "Account Number already exists",
      });
    }

    const newaccount = await Account.create({
      userId,
      accountNumber,
    });

    const updatedUser = await User.findOneAndUpdate(
      {
        _id: userId,
      },
      {
        $push: {
          accounts: newaccount._id,
        },
      },
      { new: true }
    ).select("-password -phoneNumber");

    const token = generateToken(updatedUser);

    const options = {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    };

    return res.status(200).cookie("token", token, options).json({
      message: "Account created succesfully",
      accountUser: newaccount,
      updatedUser: updatedUser,
    });
  } catch (error) {
    return res.status(500).json({
      err: error.name,
      message: "Something went wrong while creating account",
    });
  }
});

route.delete("/removeAccount", authMiddleware, async (req, res) => {
  try {
    const { userId, accountNumberToBeDelete } = req.body;

    const isAccountExists = await Account.findOne({
      accountNumber: accountNumberToBeDelete,
    });

    if (!isAccountExists) {
      return res.status(400).json({
        message: "Account does not exists",
      });
    }

    const deletedAccount = await Account.findOneAndDelete({
      userId,
      accountNumber: accountNumberToBeDelete,
    });

    const updatedUser = await User.findOneAndUpdate(
      {
        _id: userId,
      },
      {
        $pull: {
          accounts: deletedAccount._id,
        },
      },
      { new: true }
    );

    return res.status(200).json({
      message: "Account deleted succesfully",
      deletedAccount,
      updatedUser,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong while deleting the account ",
    });
  }
});

route.get("/accountDetails", authMiddleware, async (req, res) => {
  try {
    const { userId } = req.body;

    const userAccountdetails = await Account.find({
      userId,
    });

    res.status(200).json({
      userAccountdetails,
      message: "Account Details fetched Succesfully",
    });
  } catch (error) {
    res.status(500).json({
      err: error.name,
      message:
        "Something went wrong while finding details || Please try agaian later",
    });
  }
});

route.post("/transfer", authMiddleware, async (req, res) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const { fromAccountNumber, toAccountNumber, amount } = req.body;

    if (fromAccountNumber == toAccountNumber) {
      return res.status(400).json({
        message: "Both Account Numbers are same",
      });
    }
    const sender = await Account.findOne({
      accountNumber: fromAccountNumber,
    }).session(session);

    if (!sender) {
      await session.abortTransaction();
      return res.status(400).json({
        message: "Sender Account Number is Invalid",
      });
    }

    const receiver = await Account.findOne({
      accountNumber: toAccountNumber,
    }).session(session);

    if (!receiver) {
      await session.abortTransaction();
      return res.status(400).json({
        message: "Receiver Account Number is Invalid",
      });
    }

    if (amount <= 0) {
      await session.abortTransaction();
      return res.status(400).json({
        message: "Please Enter a valid amount",
      });
    }

    if (sender.balance < amount) {
      await session.abortTransaction();
      return res.status(400).json({
        message: "Insufficient balance",
      });
    }

    await Account.updateOne(
      {
        accountNumber: fromAccountNumber,
      },
      {
        $inc: {
          balance: -amount,
        },
      }
    ).session(session);

    await Account.updateOne(
      {
        accountNumber: toAccountNumber,
      },
      {
        $inc: {
          balance: amount,
        },
      }
    ).session(session);

    await session.commitTransaction();
    await session.endSession();

    res.status(200).json({
      message: "Transfer Succesfully",
    });
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    return res.status(500).json({
      err: error.name,
      message:
        "Something went wrong while transfering money || Please try again later",
    });
  }
});

export default route;
