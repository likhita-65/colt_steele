const express = require('express');
const app = express();
const morgan = require('morgan');

const AppError = require('./AppError');

// morgan('tiny');

// app.use(() => {
//     console.log("HEYYY!!!");
// })

//MIDDLEWARE

// app.use(morgan('tiny'));
// app.use(morgan('dev'));
app.use(morgan('common'));
app.use((req, res, next) =>{
    // req.method = 'GET';
    req.requestTime = Date.now();
    console.log(req.method, req.path);
    next();
})

app.use('/dogs', (req, res, next) =>{
    console.log("I LOVE DOGS!!");
    next();
})

const verifyPassword = (req, res, next) =>{
    const { password } = req.query;
    if(password === 'chickennuggets'){
        next();
    }
    else{
        throw new AppError('Password Required!', 401);
        // res.send("SORRY YOU NEED A PASSWORD!");
        // throw new Error('Password Required!');
    }
}
// app.use((req, res, next) => {
//     // res.send("HIJACKED BY MY APP.USE!");
//     console.log("THIS IS MY FIRST MIDDLEWARE!!!");
//     next();
//     console.log("THIS ISMY FIRST MIDDLEWARE - AFTER CALLING NEXT()")
// })

// app.use((req, res, next) => {
//     console.log("THIS IS MY SECOND MIDDLEWARE!!!");
//     next();
// })

app.get('/', (req, res)=>{
    console.log(`REQUEST DATE: ${req.requestTime}`);
    res.send('HOME PAGE!')
})

app.get('/dogs', verifyPassword, (req, res) => {
    console.log(`REQUEST DATE: ${req.requestTime}`);
    res.send('WOOF WOOF!');
})

app.get('/secret',verifyPassword, (req, res) => {
    res.send('MY SECRET IS: Sometimes I wear headphones in public so I dont need to talk to anyone')
})

app.get('/admin', (req, res) => {
    throw new AppError('You are not an admin!', 403);
})

app.get('/error', (req, res) => {
    chicken.fly();
})

app.use((req, res) =>{
    res.status(404).send("NOT FOUND!")
})

// app.use((err, req, res, next) => {
//     console.log("*********************************************");
//     console.log("************ERROR********************");
//     console.log("**********************************************");
//     // res.status(500).send("OH BOY, WE GOT AN ERROR!")
//     console.log(err);
//     next(err);
// })

app.use((err, req, res, next) => {
    const { status = 500, message = 'Something went wrong' } = err;
    // res.status(status).send("ERRORRRR!!!");
    // console.log(err);
    res.status(status).send(message);
})

app.listen(3000, ()=>{
    console.log("App is running on localhost:3000");
})