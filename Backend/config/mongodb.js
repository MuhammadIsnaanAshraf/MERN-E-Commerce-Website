import mongoose from "mongoose";

const connectToDB = async () => {
  mongoose.connection.on("connected", () => {
    console.log("Connected to DB");
  });
  await mongoose.connect(`${process.env.MONGO_URL}/e-commerce-app`);
};

export default connectToDB;
