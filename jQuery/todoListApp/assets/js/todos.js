// Check off specific Todos by clicking
// $("li").click(function(){
//     // if li is gray
//     if($(this).css("color") === "rgb(128, 128, 128)"){
//         // turn it black
//         $(this).css({
//             color:"black",
//             textDecoration:"none"
//         });
//     }
//     else{
//         // turn it gray
//         $(this).css({
//             color:"gray",
//             textDecoration:"line-through"
//         });
//     }
// });

$("ul").on("click","li",function(){
    $(this).toggleClass("completed");
})

// Click on X to delete Todo
$("ul").on("click","span",function(event){
    // $(this).parent().fadeOut().remove(); HERE remove() WILL NOT WAIT UNTIL fadeOut() FINISHES.
    $(this).parent().fadeOut(500,function(){
        $(this).remove();
        // HERE $(this) refers to "li"
    })
    event.stopPropagation();
    // to prevent event bubbling
})

$('input[type="text"]').keypress(function(event){
    if(event.which === 13){
        // Grabbibg new todo text from input
        var todoText=$(this).val();
        $(this).val("");
        //Create a new li and add to ul
        $("ul").append("<li><span><i class='fa fa-trash'></i></span> " + todoText + "</li>");
    } 
})

$(".fa-plus").click(function(){
    $("input[type='text']").fadeToggle();
})
