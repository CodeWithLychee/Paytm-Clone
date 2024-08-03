import mongoose from "mongoose";

const pnbBankSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  accountNumber: {
    //Starts with SBI...
    type: String,
    unique: true,
    required: [true, "Account Number is required"],
    trim: true,
  },
  accountType: {
    type: String,
    required: [true, "Account type is required"],
    trim: true,
    enum: ["Saving", "Current", "Fixed Deposit"],
  },
  balance: {
    type: Number,
    default: 0,
  },
});

const PNBBank = mongoose.model("PNBBank", pnbBankSchema);

export { PNBBank };
