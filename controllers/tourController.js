const Tour = require("./../models/tourModel");

exports.getAllTours = (req, res, next) => {
  res.status(200).json({
    status: "success",
    // results: tours.length,
    // isHasTours: tours.length > 0,
    // data: tours,
  });
};

exports.addTour = (req, res, next) => {
  res.status(201).json({
    status: "success",
  });
};

exports.getTour = (req, res, next) => {
  const id = +req.params.id;

  res.status(200).json({
    status: "success",
  });
};

exports.updateTour = (req, res, next) => {
  res.status(200).json({ status: "success", data: "<Updated Tour here...>" });
};

exports.deleteTour = (req, res, next) => {
  res.status(204).json({ status: "success", data: null });
};
