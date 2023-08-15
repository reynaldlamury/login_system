import express from "express";
import db from "./config/database.js";

const app = express();

// database connection checking ...
try {
  db.authenticate();
  console.log("Database Connected ...");
} catch (error) {
  console.log(error);
}

app.listen(500, () => console.log("server is running at port 5000"));
