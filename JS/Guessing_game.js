// Create secretNumber
var secretNumber=4;

// Ask user for guess
var stringGuess=prompt("Guess a number");
var guess=Number(stringGuess);

// Check if guessvis right
if(guess===secretNumber){
    alert("YOU GOT IT RIGHT !!");
}

// check if guess is higher
else if(guess>secretNumber){
    alert("Too high. Guess again!")
}
// otherwise, check if lower
else{
    alert("Too low. Guess again!!")
}