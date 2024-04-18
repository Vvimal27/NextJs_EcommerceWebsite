import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

async function connection() {
  try {
    const MONGO_USERNAME = encodeURIComponent(process.env.MONGO_USERNAME!);
    const MONGO_PASSWORD = encodeURIComponent(process.env.MONGO_PASSWORD!);
    const MONGO_HOST = process.env.MONGO_HOST!;
    const MONGO_DBNAME = process.env.MONGO_DBNAME!;

    const uri = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}/${MONGO_DBNAME}?retryWrites=true&w=majority`;

    await mongoose.connect(uri);

    console.log(`Connected to MongoDB database: ${MONGO_DBNAME}`);
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
}

export default connection;
