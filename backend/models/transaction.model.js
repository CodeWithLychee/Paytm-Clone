import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Sender's ID is required"],
    },
    senderName: {
      type: String,
      required: [true, "Sender's Name is required"],
    },
    senderAccountNumber: {
      type: String,
      required: [true, "Sender's Account Number is required"],
    },
    receiverName: {
      type: String,
      required: [true, "Receiver's Name is required"],
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Receiver's ID is required"],
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
