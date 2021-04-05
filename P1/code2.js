let can = document.getElementById("drawingCanvas");
let brush = can.getContext("2d");
// let results = document.getElementById("results");
let numberOfCircles;
numberOfCircles = 10;



let myMouse = {
    x: -1,
    y: -1,
    clicked: false,
};

function ToRadians(degrees){
    return degrees * Math.PI / 180;
}

function GetRandomInteger(a, b){
    // returns a random integer x such that a <= x <= b
    // 
    // @params
    // a: integer
    // b: integer
    // @returns
    // a random integer x such that a <= x <= b

    // switch the large and small if out of order
    if (a > b){
        small = b;
        large = a;
    }
    else{
        small = a;
        large = b;
    }
    
    let x = parseInt(Math.random() * (large - small + 1)) + small
    return x;
}

function RandomColor(){
    let r = GetRandomInteger(0, 255);
    let g = GetRandomInteger(0, 255);
    let b = GetRandomInteger(0, 255);
    return "rgba(" + r + ", " + g + ", " + b + ", 1.0)";
}

class Circle{
    constructor(x, y, radius, dX, dY, color){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.dX = dX;
        this.dY = dY;
        this.color = color;
        this.dr = 1;
    }

    ChangeRadius(){
              
       let newRad = this.radius;
       
       if(this.radius >= 15){
            this.dr = -1;
        }
        if(this.radius <= 5){
            this.dr = 1;
        } 
              
        this.radius += this.dr;
    }

    Move(){
        let newX = this.x + this.dX;
        

        if(newX + (this.radius - 1) < can.width){
            this.x = newX;
        }
        else{
            this.dX = -this.dX;
        }

        if (newX - (this.radius - 1) >= 0){
            this.x = newX;
        }
        else{
            this.dX = -this.dX;
        }

        let newY = this.y + this.dY;

        if(newY + (this.radius - 1) < can.height){
            this.y = newY;
        }
        else{
            this.dY = -this.dY;
        }

        if (newY - (this.radius - 1) >= 0){
            this.y = newY;
        }
        else{
            this.dY = -this.dY;
        }
        this.ChangeRadius();
        
    }

    IsInCircle(x,y){
        
        let p1x = this.x 
        let p1y = this.y 
        let p2x = x;
        let p2y = y; 

        let dist = Math.sqrt(Math.pow((p1x - p2x), 2) +  Math.pow((p1y - p2y),2));
        
        // console.log(dist, this.radius);
        
        if (dist <= this.radius + 5){
            console.log(true);
            return true;
        }else{
            console.log(false);
            return false;
        }
        
    }

    

    Draw(){
        brush.beginPath();
        brush.arc(this.x, this.y, this.radius, ToRadians(0), ToRadians(360));
        brush.closePath();
        brush.fillStyle = this.color;
        brush.fill();
    }
}

function MakeACircle(){
    let radius = 5; /* 5 */
    let ranX = GetRandomInteger(10,25);
    let ranY = GetRandomInteger(10,25);
    let dX = GetRandomInteger(-10, 10);
    let dY = GetRandomInteger(-10, 10);
    let color = RandomColor();
    let c = new Circle(ranX, ranY, radius, dX, dY, color);
    return c;
}

function MakeCircles(n){
    let arr = []; 

    let i = 0;
    while(i < n){
        let circle = MakeACircle();
        arr.push(circle);
        i++;
    }

    return arr;
}


//
// let circles = MakeCircles(10);
let circles;

console.log(circles);

function DrawCircles(){
    brush.clearRect(0,0,can.width, can.height);
    
        
    
    
    for(let i = circles.length - 1; i >= 0; i--){
        // add code here
        circles[i].Draw();
        circles[i].Move();
    
        if(myMouse.clicked){
            if(circles[i].IsInCircle(myMouse.x,myMouse.y)){
               circles.splice(i,1); 
            }
            if(circles.length < 1){
              endGame();
            }
               
        }
        
    }
    
    
    myMouse.clicked = false; 
   
  
     
}



let intObject;
let gameStart;


function beginGame() {
    gameStart = Date.now();
    circles = MakeCircles(numberOfCircles);
    intObject = setInterval(DrawCircles, 100);
}

function endGame(){
    console.log("made it")
    brush.clearRect(0,0,can.width, can.height);
    clearInterval(intObject);
    let seconds = Math.round((Date.now() - gameStart) / 1000);
    let el = document.getElementById("result");
    el.innerHTML = ("Way to go! You popped " + numberOfCircles + " circles in " + seconds + " seconds.");
}


addEventListener("click", function(event){
    let rect = can.getBoundingClientRect();
    myMouse.x = event.clientX - rect.left;
    myMouse.y = event.clientY - rect.top;
    myMouse.clicked = true;

    
}) 