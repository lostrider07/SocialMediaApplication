import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import { errorHandler } from "./controller/error.js";
import authRoutes from "./routes/auth.js";
import messageRoutes from "./routes/message.js";
import connectDB from "./config/db.js";

const app = express();
dotenv.config();
connectDB();
app.use(bodyParser.json());

const PORT = process.env.PORT;
app.use(cors());
app.use("/api/auth", authRoutes);
app.use("/api/users/:id/messages", messageRoutes);
app.get("/", (req, res) => {
  res.send("Social App Server");
});

app.use((req, res, next) => {
  let err = new Error("Not found");
  err.status = 404;
  next(err);
});
app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`Server running on port:${PORT}`);
});
