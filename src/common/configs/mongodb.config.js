import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const MongodbConfig = async () => {
  try {
    if (mongoose.connections[0].readyState) return;
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("connected to DB.");
  } catch (error) {
    console.log(error.message);
  }
};

export default MongodbConfig;
