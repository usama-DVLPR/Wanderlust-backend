const express = require("express");
const morgan = require("morgan");
const AppError=require('./utils/appError')
const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoutes");
const errorHandler=require('./controllers/errorController')
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
  next(new AppError(`Can't find ${req.originalUrl} on this server!`,404));
})

// error midellware 
app.use(errorHandler)

module.exports = app;
