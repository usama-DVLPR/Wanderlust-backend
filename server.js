const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const app = require("./app");

// server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("====================================");
  console.log(`App running on PORT: ${port}...`);
  console.log("====================================");
});
