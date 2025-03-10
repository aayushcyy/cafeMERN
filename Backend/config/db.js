import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Database connected successful!");
  } catch (error) {
    console.error("MongoDb connection failed: ", error);
    process.exit();
  }
};

export default connectDB;
