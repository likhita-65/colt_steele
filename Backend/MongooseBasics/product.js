const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/shopApp', {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{
    console.log("CONNECTION OPEN!!!")
})
.catch(()=> {
    console.log("OH NO ERROR!!")
    console.log(err)
})

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength:20
    },
    price:{
        type: Number,
        min: [0, 'Price must be positive']
    },
    onSale:{
        type: Boolean,
        default: false    
    },
    categories: [String],
    qty:{
        online:{
            type: Number,
            default: 0
        },
        inStore:{
            type: Number,
            default: 0
        }
    },
    size:{
        type: String,
        enum: ['S','M','L']
    }
})

productSchema.methods.greet = function(){
    console.log("HELLO!!")
    console.log(`-from ${this.name}`)
}

productSchema.methods.toggleOnSale = function(){
    this.onSale = !this.onSale;
    return this.save();
}

productSchema.methods.addCategory = function(newCat){
    this.categories.push(newCat)
    return this.save();
}

productSchema.statics.fireSale = function(){
    return this.updateMany({}, {onSale: true, price:0})
}

const Product = new mongoose.model('Product', productSchema);

const findProduct = async() =>{
    const foundProduct = await Product.findOne({name:'Bike Helmet'});
    // console.log(foundProduct)
    // foundProduct.greet();
    console.log(foundProduct)
    await foundProduct.toggleOnSale();
    console.log(foundProduct)
    await foundProduct.addCategory('Outdoors')
    console.log(foundProduct)
}

// findProduct();
Product.fireSale().then(res =>console.log(res))


// const bike = new Product({price:599})
// const bike = new Product({name:"Mountain Bike",price: 'hello'})
// const bike = new Product({name:"Mountain Bike",price: '599'})
// const bike = new Product({name:"Mountain Bike",price: 999, color: 'red'})
// const bike = new Product({name: "Bike Helmet", price: 29.50}) 
// const bike = new Product({name: "Bike Helmet From Helmet Makers", price: 29.50}) 
// const bike = new Product({name: "Bike Helmet", price: -29.50}) 
// const bike = new Product({name: "Bike Helmet", price: 19.50, categories: ['Cycling', 'Safety']})
// const bike = new Product({name: "Bike Helmet", price: 19.50, categories: ['Cycling', 'Safety', 123]})

// const bike = new Product({name: "Tire Pump", price: 19.50, categories: ['Cycling', 'Safety', 123]})
// const bike = new Product({name: "Cycling Jersey", price: 28.50, categories: ['Cycling', 'Safety', 123], size:'XS'})
// bike.save()
// .then(data => {
//     console.log("IT WORKED!!")
//     console.log(data)
// })
// .catch(err =>{
//     console.log("OH NO ERROR!")
//     // console.log(err)
//     // console.log(err.errors.name.properties.message)
//     console.log(err)
// })

// Product.findOneAndUpdate({name: "Tire Pump"}, {price: -19.99}, {new: true, runValidators: true})
// .then(data => {
//     console.log("IT WORKED!!")
//     console.log(data)
// })
// .catch(err =>{
//     console.log("OH NO ERROR!")
//     // console.log(err)
//     // console.log(err.errors.name.properties.message)
//     console.log(err)
// })