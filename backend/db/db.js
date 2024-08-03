import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const ConnectDb = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_CONNECTION_URL}/${DB_NAME}`);
    console.log("MongoDb Connected !!");
  } catch (err) {
    console.error("MongoDb Connection Error\n", err);
    process.exit(1);
  }
};

export { ConnectDb };
