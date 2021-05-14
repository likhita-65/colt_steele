const express = require("express");
const app = express();
const path = require("path");
const  methodOverride = require('method-override');
const { v4: uuid } = require('uuid');// renaming the de-structured 'v4' as 'uuid'

app.use(express.urlencoded({extended : true}))
app.use(express.json()) //to parse json data
app.use(methodOverride('_method'))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(express.json())

let comments = [
    {
        id: uuid(),
        username: 'Harry',
        comment: 'lol that is so funny'
    },
    {
        id: uuid(),
        username: 'Ron',
        comment: 'I like to go birdwatching with my dog'
    },
    {   
        id: uuid(),
        username: 'Hermoine',
        comment: 'Pls delete your account, Ron'
    },
    {
        id: uuid(),
        username: 'Snape',
        comment: 'Afer all this time? Always.'
    }

]

app.get('/comments', (req, res) =>{
    res.render('comments/index', { comments })
})

app.get('/comments/new',(req, res) =>{
    res.render('comments/new')
})

app.post('/comments', (req, res) =>{
    // console.log(req.body);
    const {username, comment} = req.body
    comments.push({username, comment, id: uuid() });
    // res.send("IT WORKED!"); //This is POST request's response
    res.redirect('/comments'); //redirecting to GET request
})

app.get('/comments/:id', (req, res) =>{
    const { id } = req.params;
    const comment = comments.find(c => c.id === id);
    res.render('comments/show', { comment })
})

app.get('/comments/:id/edit', (req, res) =>{
    const { id } = req.params;
    const comment = comments.find(c => c.id === id);
    res.render('comments/edit', { comment })
})

app.patch('/comments/:id', (req, res) =>{
    const { id } = req.params;
    // console.log(req.body)
    const newCommentText = req.body.comment;
    const foundComment = comments.find(c => c.id === id);
    foundComment.comment = newCommentText;
    res.redirect('/comments') 
})

app.delete('/comments/:id', (req, res) =>{
    const { id } = req.params;
    comments = comments.filter(c => c.id !== id)
    res.redirect('/comments')
})

app.get('/tacos', (req, res) =>{
    res.send("GET /tacos response")
})

app.post('/tacos', (req, res) =>{
    // console.log(req.body)
    const {meat, qty} = req.body;
    res.send(`OK, here are your ${qty} ${meat} tacos`)
})

app.listen(3000, () =>{
    console.log("Listening on port 3000")
})