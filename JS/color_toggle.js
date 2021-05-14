var button=document.querySelector("button");

// document.querySelector("body");
// document.getElementsByTagName("body")[0];

// var isPurple= false;
// button.addEventListener("click",function(){
//     if(isPurple){
//         document.body.style.background="white";
//         isPurple=false;
//     }
//     else{
//         document.body.style.background="purple";
//         isPurple=true;
//     }
// })

// var isPurple= false;
// button.addEventListener("click",function(){
//     if(isPurple){
//         document.body.style.background="white";
//     }
//     else{
//         document.body.style.background="purple";
//     }
//     isPurple=!isPurple;
// })

var isPurple= false;
button.addEventListener("click",function(){
    document.body.classList.toggle("purple");
})