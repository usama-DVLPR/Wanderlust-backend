const fs = require("fs");

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../mock/tours-simple.json`)
);

exports.checkId = (req, res, next, val) => {
  const id = +req.params.id;
  if (id > tours.length || id < 0) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid ID",
    });
  }
  next();
};

exports.getAllTours = (req, res, next) => {
  res.status(200).json({
    status: "success",
    results: tours.length,
    isHasTours: tours.length > 0,
    data: tours,
  });
};

exports.addTour = (req, res, next) => {
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

exports.getTour = (req, res, next) => {
  const id = +req.params.id;

  const tour = tours.find((tour) => tour.id === id);
  res.status(200).json({
    status: "success",
    data: tour,
  });
};

exports.updateTour = (req, res, next) => {
  res.status(200).json({ status: "success", data: "<Updated Tour here...>" });
};

exports.deleteTour = (req, res, next) => {
  const id = +req.params.id;
  if (id > tours.length) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid ID",
    });
  }
  res.status(204).json({ status: "success", data: null });
};
