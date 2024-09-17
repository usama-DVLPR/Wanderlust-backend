const express = require("express");
const morgan = require("morgan");
const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoutes");
const app = express();

// middelware

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.json());

// routes
app.use("/api/tours", tourRouter);
app.use("/api/users", userRouter);
app.all("*",(req,res,next)=>{
  res.status(404).json({
    status:'fail',
    data:null,
    message:`Can't find ${req.originalUrl} on this server!`
  })
})

module.exports = app;
