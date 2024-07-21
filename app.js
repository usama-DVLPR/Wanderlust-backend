const express = require("express");
const fs = require("fs");
const app = express();

// middelware
app.use(express.json());

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/mock/tours-simple.json`)
);
// routes
app.get("/api/tours", (req, res, next) => {
  res.status(200).json({
    status: "success",
    results: tours.length,
    isHasTours: tours.length > 0,
    data: tours,
  });
});

app.post("/api/tours", (req, res, next) => {
  const id = tours.length;
  const newTour = Object.assign({ id }, req.body);
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/mock/tours-simple.json`,
    JSON.stringify(tours),
    (err) => console.log("error while saving file", err)
  );
  res.status(201).json({
    status: "success",
    data: newTour,
  });
});

app.get("/api/tours/:id", (req, res, next) => {
  const id = +req.params.id;

  const tour = tours.find((tour) => tour.id === id);

  if (!tour) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid ID",
    });
  }
  res.status(200).json({
    status: "success",
    data: tour,
  });
});

app.patch("/api/tours/:id", (req, res, next) => {
  const id = +req.params.id;
  if (id > tours.length) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid ID",
    });
  }
  res.status(200).json({ status: "success", data: "<Updated Tour here...>" });
});

app.delete("/api/tours/:id", (req, res, next) => {
  const id = +req.params.id;
  if (id > tours.length) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid ID",
    });
  }
  res.status(204).json({ status: "success", data: null });
});

// server
const port = 3000;
app.listen(port, () => {
  console.log("====================================");
  console.log(`App running on PORT: ${port}...`);
  console.log("====================================");
});
