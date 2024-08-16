require("dotenv").config();
import mongoose from "mongoose";
import { app } from "./app";

async function main() {
  try {
    await mongoose.connect(process.env.DB_URL as string);
    console.log("All Ok");
    app.listen(process.env.PORT, () => {
      console.log(`server is connected on ${process.env.PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main().catch((err) => console.log(err));
