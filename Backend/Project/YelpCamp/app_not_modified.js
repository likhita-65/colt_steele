const express = require('express');
const path = require('path')
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const { campgroundSchema, reviewSchema } = require('./schemas.js')
const catchAsync = require('./utils/catchAsync');
const ExpressError = require('./utils/ExpressError');
const methodOverride = require('method-override');
const Campground = require('./models/campground');
const Review = require('./models/review');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const app = express();

app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({ extended: true}))
app.use(methodOverride('_method'));

// const validateCampground = (req, res, next) =>{
//      const campgroundSchema = Joi.object({
//             campground: Joi.object({
//             title: Joi.string().required(),
//             price: Joi.number().required().min(0),
//             image: Joi.string().required(),
//             location: Joi.string().required(),
//             description: Joi.string().required()
//         }).required()
//     })
//     const result = campgroundSchema.validate(req.body);
//     const { error } = result;
//     if(error){
//         const msg = error.details.map(el => el.message).join(',')
//         throw new ExpressError(msg, 400)
//     }else{
//         next();
//     }
// }

// MOVING SCHEMA OUT OF FILE
const validateCampground = (req, res, next) =>{
   const result = campgroundSchema.validate(req.body);
   const { error } = result;
   if(error){
       const msg = error.details.map(el => el.message).join(',')
       throw new ExpressError(msg, 400)
   }else{
       next();
   }
}

const validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if(error){
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    }else{
        next();
    }
}

app.get('/', (req, res) => {
    // res.send("HELLO FROM YELPCAMP!!");
    res.render('home')
})

// app.get('/makecampground', async(req, res) => {
//     const camp = new Campground({title: 'My Backyard', description: 'cheap camping!'});
//     await camp.save();
//     res.send(camp)
// })

app.get('/campgrounds', catchAsync(async(req, res) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', { campgrounds })
}))

app.get('/campgrounds/new', (req, res) => {
    res.render('campgrounds/new')
})

// USING TRY AND CATCH
// app.post('/campgrounds', async(req, res, next) => {
//     try{
//         // res.send(req.body)
//         const campground = new Campground(req.body.campground);
//         await campground.save();
//         res.redirect(`/campgrounds/${campground._id}`)
//     }catch(e){
//         next(e);
//     }
// })

// USING ASYNC ERROR UTILITY
// app.post('/campgrounds', catchAsync(async(req, res, next) => {
//     if(!req.body.campground) throw new ExpressError('Invalid Campground Data', 400);
//     const campground = new Campground(req.body.campground);
//     await campground.save();
//     res.redirect(`/campgrounds/${campground._id}`)
// }))

// USING JOI SCHEMA VALIDATIONS ON SERVER SIDE
// app.post('/campgrounds', catchAsync(async(req, res, next) => {
//     const campgroundSchema = Jio.object({
//         campground: Jio.object({
//             // passing keys nested under campground
//             title: Joi.string().required(),
//             price: Joi.number().required(),
//             image: Joi.string().required(),
//             location: Joi.string().required(),
//             description: Joi.string().required()
//         }).required()
//     })
//     const result = campgroundSchema.validate(req.body);
//     const { error } = result;
//     if(error){
//         const msg = error.details.map(el => el.message).join(',')
//         throw new ExpressError(msg, 400)
//     }
//     console.log(result);//CHECK IN POSTMAN
//     // campground:{
//     //     title:'asddf',
//     //     price:68,so on
//     // }
//     const campground = new Campground(req.body.campground);
//     await campground.save();
//     res.redirect(`/campgrounds/${campground._id}`)
// }))

app.post('/campgrounds', validateCampground, catchAsync(async(req, res, next) => {
    const campground = new Campground(req.body.campground);
    await campground.save();
    res.redirect(`/campgrounds/${campground._id}`)
}))

app.get('/campgrounds/:id', catchAsync(async(req, res) => {
    const campground = await Campground.findById(req.params.id).populate('reviews');
    // console.log(campground);
    res.render('campgrounds/show', { campground })
}))

app.get('/campgrounds/:id/edit', catchAsync(async(req, res) => {
    const campground = await Campground.findById(req.params.id);
    res.render('campgrounds/edit', { campground })
}))

app.put('/campgrounds/:id', validateCampground, catchAsync(async(req, res) => {
    const { id } = req.params;
    const campground = await Campground.findByIdAndUpdate(id, {...req.body.campground});
    res.redirect(`/campgrounds/${campground._id}`);
}))

app.delete('/campgrounds/:id', catchAsync(async(req, res) =>{
    const { id } = req.params;
    await Campground.findByIdAndDelete(id);
    res.redirect('/campgrounds');
}))

app.post('/campgrounds/:id/reviews', validateReview, catchAsync(async(req, res) => {
    // res.send("YOU MADE IT!!")
    const campground = await Campground.findById(req.params.id);
    const review = new Review(req.body.review);
    campground.reviews.push(review);
    await review.save();
    await campground.save();
    res.redirect(`/campgrounds/${campground._id}`);

}))

app.delete('/campgrounds/:id/reviews/:reviewId', catchAsync(async(req, res) => {
    // res.send("DELETE ME!!")
    const { id, reviewId } = req.params;
    await Campground.findByIdAndUpdate(id, {$pull: { reviews: reviewId }});
    const review = await Review.findByIdAndDelete(reviewId);
    res.redirect(`/campgrounds/${id}`);
}))

app.all("*", (req, res, next) => {
    // res.send("404!!!");
    next(new ExpressError('Page Not Found', 404));
})

// app.use((err, req, res, next) => {
//     const { statusCode = 500, message = "Something went wrong" } = err;
//     res.status(statusCode).render('error');
//     // res.status(statusCode).send(message); 
//     // res.send('Oh Boy, something went wrong!!')
// })

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if(!err.message) err.message = "Oh No, Something Went Wrong!"
    res.status(statusCode).render('error', { err });
})

app.listen(3000, () => {
    console.log("Serving on port 3000");
})