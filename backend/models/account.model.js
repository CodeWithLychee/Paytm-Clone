import mongoose from "mongoose";

const accountSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  accountNumber: {
    type: Number,
    required: [true, "Account Number is required"],
    trim: true,
    unique: true,
  },
  bankName: {
    type: String,
    required: true,
    enum: ["SBI", "HDFC", "PNB", "AXIS"],
  },
  balance: {
    type: Number,
    default: 0,
  },
});

const Account = mongoose.model("Account", accountSchema);

export { Account };
