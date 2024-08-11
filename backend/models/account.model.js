import mongoose from "mongoose";

const accountSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    accountNumber: {
      type: String,
      required: [true, "Account Number is required"],
      trim: true,
      unique: true,
    },
    //later on i will add bank name
    balance: {
      type: Number,
      default: 2000,
    },
  },
  {
    timestamps: true,
  }
);

const Account = mongoose.model("Account", accountSchema);

export { Account };
