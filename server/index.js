import express, { json } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import mongoose from "mongoose";
import router from "./router/index.js";
import errorMiddleware from "./middlewares/error-middleware.js";
dotenv.config();
const PORT = process.env.PORT || 4444;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use("/api", router);
app.use(errorMiddleware);

const start = async () => {
  try {
    await mongoose
      .connect(process.env.DB_ACCESS, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log("DB IS OK !");
      })
      .catch((error) => {
        console.log("DB ERROR ! ", +error);
      });
    app.listen(PORT, () => {
      console.log("Server strted on " + PORT);
    });
  } catch (error) {
    console.log(error);
  }
};

app.get("/", (req, res) => {
  res.send(`Hello ${PORT}`);
});
start();
