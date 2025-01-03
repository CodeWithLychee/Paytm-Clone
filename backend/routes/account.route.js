import express from "express";
import mongoose from "mongoose";

import { Account } from "../models/account.model.js";
import { User } from "../models/user.model.js";
import { Transaction } from "../models/transaction.model.js";

import { authMiddleware } from "../middlewares/auth.middleware.js";
import { addAccountValidation } from "../middlewares/accountMiddlewares/addAccountValidation.middleware.js";
import { deleteAccountValidation } from "../middlewares/accountMiddlewares/deleteAccountValidation.middleware.js";
import { transferMoneyValidation } from "../middlewares/accountMiddlewares/transferMoneyValidation.middleware.js";

import { generateToken } from "../utils/generateToken.js";
import { nextCallProcess } from "../utils/nextCallProcess.js";

import { transactionQueue } from "../constants.js";

const route = express.Router();

//add account
route.post(
  "/addAccount",
  authMiddleware,
  addAccountValidation,
  async (req, res) => {
    try {
      const { userId, accountNumber, pin } = req.body;

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
        pin,
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
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
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
  }
);

//delte account
route.delete("/deleteAccount", authMiddleware, async (req, res) => {
  try {
    console.log(req.body);
    const { accountNumber } = req.query;
    const { userId } = req.body;

    const userAccount = await Account.findOne({
      accountNumber,
    });
    console.log(userAccount);
    if (!userAccount) {
      return res.status(400).json({
        message: "Account does not exists",
      });
    }

    // const isPinCorrect = userAccount.isPinCorrect(pin);

    // if (!isPinCorrect) {
    //   return res.status(401).json({
    //     message: "Invalid account credentials",
    //   });
    // }

    const deletedAccount = await Account.findOneAndDelete({
      userId,
      accountNumber,
    }).select("-pin -balance");
    console.log(deletedAccount);

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
    ).select("-password -phoneNumber");

    return res.status(200).json({
      message: "Account deleted succesfully",
      deletedAccount,
      updatedUser,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      error,
      message: "Something went wrong while deleting the account ",
    });
  }
});

//find account details
route.get("/accountDetails", authMiddleware, async (req, res) => {
  try {
    const { userId } = req.body;
    const userAccountdetails = await Account.find({
      userId,
    }).select("-pin");

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

route.post(
  "/transferMoney",
  authMiddleware,
  transferMoneyValidation,
  async (req, res) => {
    const ApiCall = async () => {
      let isTransactionCompleted = false;

      let isCommitedTransaction = false;
      let isSessionEnded = false;

      const session = await mongoose.startSession();
      session.startTransaction();

      const { userId, fromAccountNumber, toAccountNumber, pin, amount } =
        req.body;

      if (fromAccountNumber == toAccountNumber) {
        return res.status(400).json({
          message: "Both Account Numbers are same",
        });
      }

      const sender = await Account.findOne({
        userId,
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

      const isPinCorrect = await sender.isPinCorrect(pin);

      if (!isPinCorrect) {
        await session.abortTransaction();
        return res.status(401).json({
          message: "Incorrect pin",
        });
      }

      if (sender.balance < amount) {
        await session.abortTransaction();
        return res.status(400).json({
          message: "Insufficient balance",
        });
      }

      const senderId = await User.findOne({
        _id: userId,
      });

      const reciverId = await User.findOne({
        _id: receiver.userId,
      });

      req.body.senderId = senderId._id;
      req.body.senderName = senderId.fullName;
      req.body.senderImage = senderId.image;

      req.body.receiverId = reciverId._id;
      req.body.receiverName = reciverId.fullName;
      req.body.receiverImage = reciverId.image;

      try {
        await Account.findOneAndUpdate(
          {
            accountNumber: fromAccountNumber,
          },
          {
            $inc: {
              balance: -amount,
            },
          }
        ).session(session);

        await Account.findOneAndUpdate(
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
        isCommitedTransaction = true;
        await session.endSession();
        isSessionEnded = true;

        isTransactionCompleted = true;

        await Transaction.create({
          senderId: senderId._id,
          senderName: senderId.fullName,
          senderAccountNumber: fromAccountNumber,
          senderImage: senderId.image,
          receiverId: reciverId._id,
          receiverName: reciverId.fullName,
          receiverAccountNumber: toAccountNumber,
          receiverImage: reciverId.image,
          amount,
          success: isTransactionCompleted,
        });

        const senderAccountNumberbalance = await Account.findOne(
          {
            accountNumber: fromAccountNumber,
          },
          { new: true }
        ).select("balance -_id");

        res.status(200).json({
          message: "Transfer Succesfully",
          balanceLeft: senderAccountNumberbalance,
        });
      } catch (error) {
        if (!isCommitedTransaction) {
          await session.abortTransaction();
          await session.endSession();
        }
        if (isCommitedTransaction && !isSessionEnded) {
          await session.endSession();
        }

        await Transaction.create({
          senderId: req.body.senderId,
          senderName: req.body.senderName,
          senderAccountNumber: req.body.fromAccountNumber,
          senderImage: req.body.senderImage,
          receiverName: req.body.receiverName,
          reciverId: req.body.reciverId,
          receiverAccountNumber: req.body.toAccountNumber,
          receiverImage: req.body.receiverImage,
          amount: req.body.amount,
          success: isTransactionCompleted,
        });

        return res.status(500).json({
          err: error,
          message:
            "Something went wrong while transfering money || Please try again later",
        });
      }
    };
    transactionQueue.push(ApiCall);

    nextCallProcess();
  }
);

route.get("/paymentSend", authMiddleware, async (req, res) => {
  try {
    const { userId } = req.body;

    const transaction = await Transaction.find({
      senderId: userId,
    });

    return res.status(200).json({
      message: "Transaction details fetched succesfully",
      transaction,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong while fetching transaction details",
    });
  }
});
route.get("/paymentRecived", authMiddleware, async (req, res) => {
  try {
    const { userId } = req.body;

    const transaction = await Transaction.find({
      receiverId: userId,
    });

    return res.status(200).json({
      message: "Transaction details fetched succesfully",
      transaction,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong while fetching transaction details",
    });
  }
});

route.use((err, req, res, next) => {
  return res.status(500).json({
    message: "Something went Wrong || Internal Server error",
  });
});
export default route;
