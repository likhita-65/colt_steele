var obj={
    age:45,
    friends:["Bob","Tina"],
    add:function(x,y){
        return x+y;
    }
}

console.log(obj.add(5,-10));

var dogSpace={};
dogSpace.speak=function(){
    return "WOOF!";
}

console.log(dogSpace.speak());

var catSpace={};
catSpace.speak=function(){
    return "MEOW!";
}

console.log(catSpace.speak());

var comments={};
comments.data=["Good Bye","Bye","Lame"];
comments.print=function(){
    this.data.forEach(function(el){
        console.log(el);
    });
};

comments.print();