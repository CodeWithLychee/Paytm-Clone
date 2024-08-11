import mongoose from "mongoose";
import { boolean } from "zod";

const transactionSchema = new mongoose.Schema(
  {
    senderAccountNumber: {
      type: String,
      required: [true, "Sender's Account Number is required"],
    },
    receiverAccountNumber: {
      type: String,
      required: [true, "Receiver's Account Number is required"],
    },
    amount: {
      type: Number,
      required: [true, "Amount is required"],
    },
    success: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Transaction = mongoose.model("Transaction", transactionSchema);

export { Transaction };
