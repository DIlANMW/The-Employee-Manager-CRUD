import dotenv from "dotenv";
import express from "express";
import cors from "cors";

import dbConnection from "./utils/dbConnection.js";
import routes from "./routes/routes.js";

dotenv.config();
const app = express();
dbConnection();
app.use(cors());
app.use(express.json());
app.use("/api", routes);

app.listen(3000, () => {
  console.log("Server is running..");
});
