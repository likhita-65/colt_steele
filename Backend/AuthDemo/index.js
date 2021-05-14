const express = require('express');
const app = express();
const User = require('./models/user');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const session = require('express-session')

mongoose.connect('mongodb://localhost:27017/authDemo', {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{
    console.log("MONGO CONNECTION OPEN!!!")
})
.catch(()=> {
    console.log("OH NO MONGO CONNECTION ERROR!!")
    console.log(err)
})

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.urlencoded({extended: true}))
const sessionOptions = {secret: 'thisisnotagoodsecret', resave: false, saveUninitialized: false}
app.use(session(sessionOptions))

app.get('/', (req, res) => {
    res.send('This is the home page!')
})

app.get('/register', (req, res) => {
    res.render('register')
})

const requireLogin = (req, res, next) =>{
    if(!req.session.user_id){
        return res.redirect('/login')
    }
    next();
}

// app.post('/register', async(req, res) => {
//     const { username, password } = req.body;
//     const hash = await bcrypt.hash(password, 12);
//     const user = new User({
//         username,
//         password: hash
//     })
//     await user.save();
//     req.session.user_id = user._id;
//     res.redirect('/')
//     // res.send(hash)
//     // res.send(req.body);
// })

app.post('/register', async(req, res) => {
    const { username, password } = req.body;
    const user = new User({ username, password })
    await user.save();
    req.session.user_id = user._id;
    res.redirect('/')
})

app.get('/login', (req, res) => {
    res.render('login')
})

// app.post('/login', async(req, res) =>{
//     const { username, password } = req.body;
//     const user = await User.findOne({ username });
//     const validPassword = await bcrypt.compare(password, user.password);
//     if(validPassword){
//         req.session.user_id = user._id;
//         // res.send("YAY WELCOME!!")
//         res.redirect('/secret')
//     }else{
//         // res.send("TRY AGAIN")
//         res.redirect('/login')
//     }
//     // res.send(req.body)
// })
app.post('/login', async(req, res) =>{
    const { username, password } = req.body;
    const foundUser = await User.findAndValidate(username, password);
    if(foundUser){
        req.session.user_id = foundUser._id;
        // res.send("YAY WELCOME!!")
        res.redirect('/secret')
    }else{
        // res.send("TRY AGAIN")
        res.redirect('/login')
    }
    // res.send(req.body)
})

app.post('/logout', (req, res) => {
    // req.session.user_id = null;
    req.session.destroy();
    res.redirect('/login')
})

// app.get('/secret', (req, res) => {
//     if(!req.session.user_id){
//         res.redirect('/login');
//     }else{
//         // res.send("This is secret! You cannot see me unless you are logged in!!")
//         res.render('secret')
//     }
// })

app.get('/secret', requireLogin, (req, res) => {
    res.render('secret');
})

app.get('/topsecret', requireLogin, (req, res) => {
    res.send('TOP SECRET!!')
})

app.listen(3000, () => {
    console.log("SERVING YOUR APP!");
})