import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      minLength: [4, "Username must contain at least 4 characters"],
      trim: true,
      lowercase: true,
    },
    fullName: {
      type: String,
      required: [true, "Full Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minLength: [6, "Password must contain atleast 6 characters"],
      maxLength: [14, "Password must contain atmost 14 characters"],
    },
    phoneNumber: {
      type: String,
      required: [true, "Phone Number is required"],
      unique: true,
      trim: true,
      minLength: [10, "Phone Number must contain exactly 10 digits"],
      maxLength: [10, "Phone Number must contain exactly 10 digits"],
    },
    image: {
      type: String,
      //updated by cloudinary later-->when i implementated that
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export { User };
