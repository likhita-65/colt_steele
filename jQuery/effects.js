// $("button").on("click",function(){
//     $('div').fadeOut(1000);
//     console.log("fade completed");
// });
// console.log prints before the fade out actually finishes(beacuse it takes 1 complete second to fade out and js doesn't wait until it finishes)

// HENCE
// $("button").on("click",function(){
//     $('div').fadeOut(1000,function(){
//         console.log("fade completed");
//     });
// });

// INSPECT
// $("button").on("click",function(){
//     $('div').fadeOut(1000,function(){
//         $(this).remove();
//     });
//     // $('div').remove();
// });


// display:none is set in style tag
// $("button").on("click",function(){
//     $('div').fadeIn(1000,function(){
//     });
// });

// $("button").on("click",function(){
//     $('div').fadeToggle(500,function(){
//     });
// });

// display : none is et in style tag
// $("button").on("click",function(){
//     $('div').slideDown(1000,function(){
//     });
// });

// display:none is commented out
// $("button").on("click",function(){
//     $('div').slideUp(1000,function(){
//     });
// });

// $("button").on("click",function(){
//     $('div').slideToggle(1000,function(){
//         console.log("SLIDE IS DONE");
//     });
// });

// INSPECT
$("button").on("click",function(){
    $('div').slideToggle(1000,function(){
        $(this).remove();
    });
});

