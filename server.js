const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config({ path: "./config.env" });
const app = require("./app");
const DB = process.env.DATABASE;

mongoose
  .connect(DB, {})
  .then(() => {
    console.log("Database connection successful");
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });

// server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("====================================");
  console.log(`App running on PORT: ${port}...`);
  console.log("====================================");
});
