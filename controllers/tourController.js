const Tour = require("./../models/tourModel");

exports.getAllTours = async (req, res, next) => {
  try {
    queryObject = { ...req.query };
    const excluedFields = ["page", "sort", "limit", "fields"];

    excluedFields.forEach((el) => delete queryObject[el]);

    let queryString = JSON.stringify(queryObject);
    queryString = queryString.replace(
      /\b(gte|gt|lte|lt)\b/g,
      (match) => `$${match}`
    );

    let query =  Tour.find(JSON.parse(queryString));

    // Sorting

    if(req.query.sort){
        const sortBy=req.query.sort.split(',').join(" ");

        query=query.sort(sortBy)
    }else{
        query=query.sort('-createdAt')
    }

    // fields liminting
    if(req.query.fields){
        const fields=req.query.fields.split(',').join(' ');
        query=query.select(fields);
    }else{
        query=query.select('-__v')
    }

    // pagination
    const page=req.query.page * 1 || 1;
    const limit =req.query.limit *1 || 100;
    const skip= (page-1)*limit ;
    query=query.skip(skip).limit(limit);

    if(req.query.page){
        const numTours=await Tour.countDocument;
        console.log(numTours );
        if(skip => numTours){
            throw new Error("This page does not exist");

        }

    }

    const tours = await query;
    res.status(200).json({
      status: "success",
      results: tours.length,
      data: tours,
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error,
    });
  }
};

exports.addTour = async (req, res, next) => {
  try {
    const newTour = await Tour.create(req.body);
    res.status(201).json({
      status: "success",
      data: newTour,
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error,
    });
  }
};

exports.getTour = async (req, res, next) => {
  try {
    const tour = await Tour.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: tour,
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error,
    });
  }
};

exports.updateTour = async (req, res, next) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "success",
      data: tour,
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error,
    });
  }
};

exports.deleteTour = async (req, res, next) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);
    res.status(204).json({ status: "success" });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error,
    });
  }
};
