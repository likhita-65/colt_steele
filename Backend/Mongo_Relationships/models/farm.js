const mongoose = require('mongoose');
const { Schema } = mongoose;

mongoose.connect('mongodb://localhost:27017/relationshipDemo', {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{
    console.log("MONGO CONNECTION OPEN!!!")
})
.catch(()=> {
    console.log("OH NO MONGO CONNECTION ERROR!!")
    console.log(err)
})

const productSchema = new Schema({
    name: String,
    price: Number,
    season: {
        type: String,
        enum: ['Spring', 'Summer', 'Fall', 'Winter']
    }
});

// const Product = mongoose.model('Product', productSchema);

const farmSchema = new Schema({
    name: String,
    city: String,
    products: [{ type: Schema.Types.ObjectId, ref: 'Product' }]
})

const Product = mongoose.model('Product', productSchema);
const Farm = mongoose.model('Farm', farmSchema);

// const makeFarm = async() =>{
//     const farm = new Farm({name: 'Full Belly Frams', city:'Guinda, CA'});
//     const melon = await Product.findOne({name: 'Goddess Melon'}); 
//     farm.products.push(melon);
//     await farm.save();
//     console.log(farm);
// }
// makeFarm();

// const addProduct = async() =>{
//     const farm = await Farm.findOne({name: 'Full Belly Frams'});
//     const watermelon = await Product.findOne({name: 'Sugar Baby Watermelon'});
//     farm.products.push(watermelon);
//     await farm.save();
// }
// addProduct();

//WITHOUT populate
// Farm.findOne({name: 'Full Belly Frams'}).then( res => console.log(res))
// WITH populate
Farm.findOne({name: 'Full Belly Frams'})
    .populate('products')
    .then( res => console.log(res))

