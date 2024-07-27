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
    required: [true, "A tour must have a name"],
    unique: true,
  },
  price: {
    type: Number,
    required: [true, "A tour must have a price"],
  },
  rating: {
    type: Number,
    default: 5,
  },
});

// creating model from schema
const TourModel = new mongoose.model("Tour", tourSchema);

const testTour = new TourModel({
  name: "The Forest Hiker",
  price: 499,
});
testTour
  .save()
  .then((res) => console.log(res))
  .catch((err) => {
    if (err.name === "ValidationError") {
      for (let field in err.errors) {
        console.error(`${err.errors[field].message}`);
        if (err.errors[field].properties && err.errors[field].properties.type) {
          console.error(`Error code: ${err.errors[field].properties.type}`);
        }
      }
    } else {
      console.error("Error creating tour:", err);
    }
  });
// server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("====================================");
  console.log(`App running on PORT: ${port}...`);
  console.log("====================================");
});
