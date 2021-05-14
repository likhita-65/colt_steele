const mongoose = require('mongoose');

const farmSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Farm must have a name']
    },
    city: {
        type: String
    },
    email: {
        type: String,
        required: [true, 'Email required']
    }
})

const Farm = mongoose.model('Farm', farmSchema);

const addFarm = async() =>{
    const res = await Farm.insertMany({name: 'Gospel Flat farms', city: 'CA', email: 'gff@gmail.com'})
    console.log(res);
}
// addFarm();

module.exports = Farm;