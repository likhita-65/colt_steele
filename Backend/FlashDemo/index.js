const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session')
const flash = require('connect-flash')

const sessionOptions = {secret: 'thisisnotagoodsecret', resave: false, saveUninitialized: false}
app.use(session(sessionOptions))
app.use((flash()))

const Farm = require('./models/farms')

mongoose.connect('mongodb://localhost:27017/flashDemo', {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{
    console.log("MONGO CONNECTION OPEN!!!")
})
.catch(()=> {
    console.log("OH NO MONGO CONNECTION ERROR!!")
    console.log(err)
})

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: true}))

// FARM ROUTES

app.use((req, res, next) => {
    res.locals.messages = req.flash('success');
    next();
})

app.get('/farms', async(req, res) => {
    const farms = await Farm.find({});
    // res.render('index', { farms, messages: req.flash('success') })
    res.render('index', { farms })
})

app.post('/farms', async(req, res) => {
    const newFarm = new Farm(req.body)
    await newFarm.save();
    req.flash('success', 'Successfully made a new farm!')
    res.redirect('/farms')
})

app.get('/farms/new', (req, res) => {
    res.render('new')
})

app.get('/farms/:id', async(req, res) => {
    const { id } = req.params;
    const farm = await Farm.findById(id);
    res.render('show', { farm })
})

app.listen(3000, () => {
    console.log("Listening on port 3000")
})