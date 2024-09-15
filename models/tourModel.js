const mongoose = require("mongoose");
const slugify=require("slugify");
// schema
const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A tour must have a name"],
    unique: true,
    trime: true,
    maxlength:[60,"A tour name must have less or equal then 60 charaters"],
    minlength:[10,"A tour name must have more or equal then 10 charaters"] 
  },
  slug:String,
  duration: {
    type: Number,
    required: [true, "A tour must have a duration"],
  },
  maxGroupSize: {
    type: Number,
    required: [true, "A tour must have group size"],
  },
  difficulty: {
    type: String,
    required: [true, "A tour must have difficulty"],
    enum:{
      values:['easy','medium','difficult'],
      message:'Difficulty is either: easy, medium, difficult'
    }
      
  },
  price: {
    type: Number,
    required: [true, "A tour must have a price"],
  },
  ratingsAverage: {
    type: Number,
    default: 5,
    min:[1,'ratting must be above 1.0'],
    max:[5,'ratting must be above 5.0'],
  },
  ratingsQuantity: {
    type: Number,
    default: 0,
  },
  priceDiscount: Number,
  summary: {
    type: String,
    required: [true, "A tour must have description"],
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  imageCover: {
    type: String,
    required: [true, "A tour must have cover image"],
  },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now(),
    // select:false
  },
  startDates: [Date],
  secretTour:{
    type:Boolean,
    default:false
  }
},{
  toJSON:{virtuals:true},
  toObject:{virtuals:true}
});


// virtual properties 
tourSchema.virtual('durationWeeks').get(function(){
  return this.duration/7
})

// Document Middleware  (run before .save(),.create() command)
tourSchema.pre('save', function(next){
  this.slug=slugify(this.name,{lower:true})
  next()
})

// tourSchema.post('save',function(doc,next){
//   console.log(doc);
  
//   next()
// })


// Query Middleware 
tourSchema.pre(/^find/,function(next){
  this.find({secretTour: {$ne:true}})
  next()
})


// Aggregate pipeline 

tourSchema.pre('aggregate',function(next){
  this.pipeline().unshift({$match :{secretTour:{$ne:true} }})
  next()
})
// creating model from schema
const Tour = new mongoose.model("Tour", tourSchema);
module.exports = Tour;
