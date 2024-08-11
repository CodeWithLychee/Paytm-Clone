import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    senderAccountNumber: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Account",
      required: [true, "Sender's Account Number is required"],
    },
    receiverAccountNumber: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Account",
      required: [true, "Receiver's Account Number is required"],
    },
    amount: {
      type: Number,
      required: [true, "Amount is required"],
    },
  },
  {
    timestamps: true,
  }
);

const Transaction = mongoose.model("Transaction", transactionSchema);

export { Transaction };
