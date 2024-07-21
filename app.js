const express = require("express");
const fs = require("fs");
const morgan = require("morgan");

const app = express();
// middelware
app.use(morgan("dev"));
app.use(express.json());

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/mock/tours-simple.json`)
);

// routes handlers
const getAllTours = (req, res, next) => {
  res.status(200).json({
    status: "success",
    results: tours.length,
    isHasTours: tours.length > 0,
    data: tours,
  });
};

const addTour = (req, res, next) => {
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
};

const getTour = (req, res, next) => {
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
};

const updateTour = (req, res, next) => {
  const id = +req.params.id;
  if (id > tours.length) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid ID",
    });
  }
  res.status(200).json({ status: "success", data: "<Updated Tour here...>" });
};

const deleteTour = (req, res, next) => {
  const id = +req.params.id;
  if (id > tours.length) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid ID",
    });
  }
  res.status(204).json({ status: "success", data: null });
};

const getAllUsers = (req, res, next) => {
  res.status(500).json({
    status: "err",
    message: "This route is not define yet",
  });
};
const addUser = (req, res, next) => {
  res.status(500).json({
    status: "err",
    message: "This route is not define yet",
  });
};

const getUser = (req, res, next) => {
  res.status(500).json({
    status: "err",
    message: "This route is not define yet",
  });
};
const updateUser = (req, res, next) => {
  res.status(500).json({
    status: "err",
    message: "This route is not define yet",
  });
};
const deleteUser = (req, res, next) => {
  res.status(500).json({
    status: "err",
    message: "This route is not define yet",
  });
};
// routes

// app.get("/api/tours", getAllTours);

// app.post("/api/tours", addTour);

// app.get("/api/tours/:id", getTour);

// app.patch("/api/tours/:id", updateTour);

// app.delete("/api/tours/:id", deleteTour);

app.route("/api/tours").get(getAllTours).post(addTour);

app.route("/api/tours/:id").get(getTour).patch(updateTour).delete(deleteTour);

app.route("/api/users").get(getAllUsers).post(addUser);
app.route("/api/users/:id").get(getUser).patch(updateUser).delete(deleteUser);

// server
const port = 3000;
app.listen(port, () => {
  console.log("====================================");
  console.log(`App running on PORT: ${port}...`);
  console.log("====================================");
});
