import mongoose from "mongoose";
import bcryt from "bcrypt";

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
      minLength: [12, "Username must contain atleast 12 digits"],
      maxLength: [16, "Username must contain atmost 16 digits"],
    },
    //later on i will add bank name
    pin: {
      type: String,
      required: [true, "Pin is required"],
      trim: true,
      minLength: [4, "Username must contain atleast 4 characters"],
      maxLength: [6, "Username must contain atmost 6 characters"],
    },
    balance: {
      type: Number,
      default: 2000,
    },
  },
  {
    timestamps: true,
  }
);

accountSchema.pre("save", async function (next) {
  if (!this.isModified("pin")) {
    return next();
  }

  const saltRounds = 10;
  const salt = await bcryt.genSalt(saltRounds);
  this.pin = await bcryt.hash(this.pin, salt);
});

accountSchema.methods.isPinCorrect = async function (candidatePin) {
  return await bcryt.compare(candidatePin, this.pin);
};

const Account = mongoose.model("Account", accountSchema);

export { Account };
