import mongoose from "mongoose";

const connnetDB = async () => {
  mongoose.connection.on("connected", () => console.log("Database Connected!"));

  await mongoose.connect(process.env.MONGODB_URL);
};

export default connnetDB;