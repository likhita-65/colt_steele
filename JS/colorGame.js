var numSquares=6;
var colors=[];

var squares=document.querySelectorAll(".square");
var pickedColor;
var colorDisplay=document.getElementById("colorDisplay");
var messageDisplay=document.getElementById("message");
var h1=document.querySelector("h1");
var resetButton=document.querySelector("#reset");
var easyBtn=document.querySelector("#easyBtn");
var hardBtn=document.querySelector("#hardBtn");
var modeButons=document.querySelectorAll(".mode");


init();

function init(){
    // mode buttons event listeners
    setupModeButtons();
    setupSquares();   
}

function setupModeButtons(){
    for(var i=0;i<modeButons.length;i++){
        modeButons[i].addEventListener("click",function(){
            modeButons[0].classList.remove("selected");
            modeButons[1].classList.remove("selected");
            this.classList.add("selected");
            // figure out how many squares to show
            // pick new colors
            // pick a new pickedColor
            // update page to reflect changes
            this.textContent === "Easy" ? numSquares=3 : numSquares=6;
            reset();
        });
    }
}

function setupSquares(){
    for(var i=0;i<squares.length;i++){
        // add initial colors to squares
        squares[i].style.backgroundColor=colors[i];
    
        // add click listeners to squares
        squares[i].addEventListener("click",function(){
            // grab color of clicked square
            var clickedColor = this.style.backgroundColor;
            // compare color to pickedColor
            if(clickedColor===pickedColor){
                messageDisplay.textContent="Correct!";
                changeColor(clickedColor);
                h1.style.backgroundColor=clickedColor;
                resetButton.textContent="Play Again?";
            }
            else{
                this.style.backgroundColor="#232323";
                messageDisplay.textContent="Try Again";
            }
        })
    }
    reset(); 
}

function reset(){
    // generate all new colors
    colors=generateRandomColors(numSquares);
    // pick a new random color from array
    pickedColor=pickColor();
    messageDisplay.textContent="";
    resetButton.textContent="New Colors";
    // change colorDisplay to match pickedColor
    colorDisplay.textContent=pickedColor;
    // change colors of squares
    for(var i=0;i<squares.length;i++){
        // add initial colors to squares
        if(colors[i]){
            squares[i].style.display="block";
            squares[i].style.backgroundColor=colors[i];
        }
        else{
            squares[i].style.display="none";
        }
    }
    h1.style.backgroundColor="steelblue";
}

// easyBtn.addEventListener("click",function(){
//     hardBtn.classList.remove("selected");
//     easyBtn.classList.add("selected");
//     numSquares=3;
//     colors=generateRandomColors(numSquares);
//     pickedColor=pickColor();
//     colorDisplay.textContent=pickedColor;
//     for(var i=0;i<squares.length;i++){
//         if(colors[i]){
//             squares[i].style.backgroundColor=colors[i];
//         }
//         else{
//             squares[i].style.display="none";
//         }
//     }
// });

// hardBtn.addEventListener("click",function(){
//     hardBtn.classList.add("selected");
//     easyBtn.classList.remove("selected");
//     numSquares=6;
//     colors=generateRandomColors(numSquares);
//     pickedColor=pickColor();
//     colorDisplay.textContent=pickedColor;
//     for(var i=0;i<squares.length;i++){
//         squares[i].style.backgroundColor=colors[i];
//         squares[i].style.display="block";
//     }
// });

resetButton.addEventListener("click",function(){
   reset();
})

function changeColor(color){
    // loop through all squares
    for(var i=0;i<squares.length;i++){
    // change each color to match given color
    squares[i].style.backgroundColor=color;
    }
}

function pickColor(){
    var random=Math.floor(Math.random()*colors.length);
    return colors[random];
}

function generateRandomColors(num){
    // make an array
    var arr=[]
    // add num random colors to array
    // to repeat num times
    for(var i=0;i<num;i++){
        // get random color and push into arr
        arr.push(randomColor());
    }
    // return that array
    return arr;
}

function randomColor(){
    // pick a "red" from 0-255
    var r=Math.floor(Math.random()*256);
    // pick a "green" from 0-255
    var g=Math.floor(Math.random()*256);
    // pick a "blue" from 0-255
    var b=Math.floor(Math.random()*256);
    return "rgb(" +r + ", " +g + ", " + b + ")";

}
