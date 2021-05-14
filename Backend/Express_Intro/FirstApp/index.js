const express = require("express");
const app = express(); //executes express and saves the returned value to app
// console.dir(app)

// express parses the incoming HTTP request into a JS object --> req
// app.use((req, res) => {
//     console.log("WE GOT A NEW REQUEST!!!");
//     // res.send("HELLO, WE GOT YOUR REQUEST! THIS IS A RESPONSE!") //sends the HTTP response
//     // res.send({color:'red'})
//     res.send("<h1>This is my webpage!</h1>")
// })

app.get('/', (req, res) => {
    res.send("This is the home page!");
})

// defining patterns
app.get('/r/:subreddit', (req, res) => {
    // console.log(req.params);
    // console.log(req.params.subreddit);
    const {subreddit} = req.params;
    res.send(`<h1>Browsing the ${subreddit} subreddit </h1>`);
})

app.get('/r/:subreddit/:postId', (req, res) => {
    console.log(req.params);
    const {subreddit, postId} = req.params;
    res.send(`<h1>Viewing the Post Id : ${postId} on the ${subreddit} subreddit </h1>`);
})

app.get('/cats', (req, res) => {
    res.send('MEOW!!');
})

app.get('/dogs', (req, res) => {
    res.send('WOOF!!');
})

// working with query strings
app.get("/search", (req, res) => {
    console.log(req.query);
    const { q } = req.query;
    if(!q){
        res.send("NOTHING FOUND IF NOTHING SEARCHED!");
    }
    res.send(`<h1>Search results for : ${q}</h1>`);
})

app.get("*", (req, res) => {
    res.send("I don't know the path!");
})

// app.listen(3000, () => {
//     console.log("LISTENING ON PORT 3000!")
// })

app.listen(8080, () => {
    console.log("LISTENING ON PORT 8080!")
})