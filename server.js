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

// schema
const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, "A tour must have a name"],
    unique: true,
  },
  price: {
    type: Number,
    require: [true, "A tour must have a price"],
  },
  rating: {
    type: Number,
    default: 5,
  },
});

// creating model from schema
const TourModel = new mongoose.model("Tour", tourSchema);

// server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("====================================");
  console.log(`App running on PORT: ${port}...`);
  console.log("====================================");
});
