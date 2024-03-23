import dotenv from "dotenv";
import express from "express";
import cors from "cors";

import dbConnection from "./utils/dbConnection.js";

dotenv.config();
const app = express();
app.use(cors());
dbConnection();
app.use(express.json());

app.listen(3000, () => {
  console.log("Server is running..");
});
