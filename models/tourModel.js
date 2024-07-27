const mongoose = require("mongoose");

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
const Tour = new mongoose.model("Tour", tourSchema);
module.exports = Tour;
