const express = require("express");
const tourController = require("../controllers/tourController");

const router = express.Router();

// routes

router.route("/").get(tourController.getAllTours).post(tourController.addTour);

router
  .route("/:id")
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
