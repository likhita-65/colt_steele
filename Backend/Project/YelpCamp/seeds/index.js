const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers')
const Campground = require('../models/campground')

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

const sample = (array) => array[Math.floor(Math.random()*array.length)];

const seedDB = async() => {
    await Campground.deleteMany({});
    // const c = new Campground({ title: 'purple field' });
    // await c.save();
    for(let i=0; i<300; i++){
        const random1000 = Math.floor(Math.random()*1000);
        const price = Math.floor(Math.random()*20) + 10;
        const camp = new Campground({ 
            //YOUR USER ID
            author: "60893d945906d73e34c43e73",
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            // image: 'https://source.unsplash.com/collection/483251',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad reiciendis modi aliquid temporibus voluptates doloremque dolorem officia at facere quidem corporis error, sequi itaque distinctio vel inventore asperiores eligendi! Eaque?',
            price,
            geometry : { 
                type : "Point", 
                coordinates : [ 
                    cities[random1000].longitude,
                    cities[random1000].latitude
                 ] 
            },
            images: [
                {
                  url: 'https://res.cloudinary.com/dvhqtr2kz/image/upload/v1620279162/YelpCamp/pitpiggsdinwr5rw8qnl.jpg',
                  filename: 'YelpCamp/pitpiggsdinwr5rw8qnl'
                },
                {
                  url: 'https://res.cloudinary.com/dvhqtr2kz/image/upload/v1620279223/YelpCamp/giktrhst8gpfz9o22dnh.jpg',
                  filename: 'YelpCamp/giktrhst8gpfz9o22dnh'
                }
              ]
        })
        await camp.save();
    }
}

// seedDB();
seedDB().then(() => {
    mongoose.connection.close();
})