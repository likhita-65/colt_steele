const jokes = require("give-me-a-joke")
const colors = require("colors")
const cowsay = require("cowsay") // accessing global package using the cmd 'npm link cowsay'

// console.dir(jokes)
// To get a random dad joke
jokes.getRandomDadJoke (function(joke) {
    console.log(joke.rainbow);
});
