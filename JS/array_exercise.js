function printReverse(arr){
    for(var i=arr.length-1; i>=0;i--)
    {
        console.log(arr[i]);
    }
}

printReverse([-100,20,-395,0]);

// ************************************************
function isUniform(arr){
    var first=arr[0];
    for(var i=1; i<arr.length;i++){
        if(arr[i]!== first){
            return false;
        }
    } 
    return true;   
}

var res=isUniform([1,2,2]);
console.log(res);

// function isUniform(arr){
//     var first=arr[0];
//     arr.forEach(function(ele){
//         if(ele!== first){
//             return false;
//         }
//     }); 
//     return true;   
// } WRONGGGG O/P

// *************************************************
function sumArray(arr){
    var total=0;
    arr.forEach(function(element){
        total+=element;
    });
    return total;
}

var res=sumArray([-10,10,100]);
console.log(res);


// *************************************************
function max(arr){
    var max=arr[0];
    for(var i=1;i<arr.length;i++)
    {
        if(arr[i]>max)
        {
            max=arr[i];
        }
    }
    return max;
}

var res=max([365,20,4000]);
console.log(res);