var globalContext; //global context variable
var globalWidth;
var globalHeight;
var numObjects = new Array(); //array of the number objects


//From http://stackoverflow.com/questions/15661339/how-do-i-fix-blurry-text-in-my-html5-canvas
//Fixes the super blurry canvas drawing issue
var PIXEL_RATIO = (function () {
    var ctx = document.createElement("canvas").getContext("2d"),
        dpr = window.devicePixelRatio || 1,
        bsr = ctx.webkitBackingStorePixelRatio ||
              ctx.mozBackingStorePixelRatio ||
              ctx.msBackingStorePixelRatio ||
              ctx.oBackingStorePixelRatio ||
              ctx.backingStorePixelRatio || 1;

    return dpr / bsr;
})();


createHighDefCanvas = function(w, h, ratio) {
    if (!ratio) { ratio = PIXEL_RATIO; }
    var can = document.createElement("canvas");
    can.width = w * ratio;
    can.height = h * ratio;
    can.style.width = w + "px";
    can.style.height = h + "px";
    can.getContext("2d").setTransform(ratio, 0, 0, ratio, 0, 0);
    return can;
}

//Create canvas with a custom resolution.
//var myCustomCanvas = createHighDefCanvas(500, 200, 4);

function canvasAnim(){
    var xAxis = 28;
    var yAxis = 43;
    //Clear the numbers on the grid
    sudGrid = getAndClearGridNumbers();
    
    //Get reference to the canvas
    var canvas = document.getElementById("canvasGraphic");
    canvas.style.display = "initial";
    var width = canvas.width;
    globalWidth = width;
    var height = canvas.height;
    globalHeight = height;
    var ctx = canvas.getContext("2d");
    ctx.font = "bolder 20px sans-serif";
    globalContext = ctx;
    
    for(var i = 0; i < 9; i++){
        for(var j = 0; j < 9; j++){
            if(sudGrid[i][j] != ""){
                //Then print out the number
                var numb = new Object(); //creates new object for the number
                numb.numberValue = sudGrid[i][j];
                numb.xPos = xAxis;
                numb.yPos = yAxis;
                numb.yVel = 1;
                var temp = Math.random() < 0.5 ? -1 : 1;
                numb.xDir = (temp * Math.floor((Math.random() * 2) + 1));
                ctx.fillText(sudGrid[i][j],xAxis,yAxis);
                numObjects.push(numb); //pushes the new number object onto the array
            }
            //increment xAxis
            if(xAxis > 450){
                xAxis = 28;
            } else {
                xAxis += 60;
            }
        }
        //increment yAxis
        yAxis += 64;
    }
    
    //var img=document.getElementById("img1");
    //ctx.drawImage(img,20,20, 30, 25)
    
    //now that everything is set up...kick off the animation
    renderNumbers();
}

function getAndClearGridNumbers(){
    var returnGrid = [[0, 0, 0, 0, 0, 0, 0, 0, 0],
               [0, 0, 0, 0, 0, 0, 0, 0, 0],
               [0, 0, 0, 0, 0, 0, 0, 0, 0],
               [0, 0, 0, 0, 0, 0, 0, 0, 0],
               [0, 0, 0, 0, 0, 0, 0, 0, 0],
               [0, 0, 0, 0, 0, 0, 0, 0, 0],
               [0, 0, 0, 0, 0, 0, 0, 0, 0],
               [0, 0, 0, 0, 0, 0, 0, 0, 0],
               [0, 0, 0, 0, 0, 0, 0, 0, 0]];
    var sudokuGrid = document.getElementById("sudokuGameTable");
    for(var i = 0; i < 9; i++){
        for(var j = 0; j < 9; j++){
            if(sudokuGrid.rows[i].cells[j].innerText != " "){
                returnGrid[i][j] = sudokuGrid.rows[i].cells[j].innerText;
                sudokuGrid.rows[i].cells[j].innerText = " ";
            }
        }
    }
   return returnGrid; 
}

function renderNumbers(){
    var canvas = document.getElementById("canvasGraphic");
    globalContext.clearRect(0,0,globalWidth, globalHeight);
    
    numObjects.forEach(function(obj){
        
        obj.yVel *=.99;
        obj.yVel +=.25;
        obj.yPos += obj.yVel;
        obj.xPos += obj.xDir;
        //var plusOrMinus = Math.random() < 0.5 ? -2 : 2;
        //obj.xPos += plusOrMinus;
        //obj.xPos += Math.floor((Math.random() * 5) -5);
        //draw the text again
        if (obj.yPos + obj.yVel > 600 || obj.yPos + obj.yVel < 0) {
            obj.yVel = -obj.yVel;
        }
        if (obj.xPos + obj.xDir > 549 || obj.xPos + obj.xDir < 0) {
            obj.xDir = -obj.xDir;
        }
        globalContext.fillText(obj.numberValue,obj.xPos,obj.yPos);
    });
    
    //so that it repeats for a good while
    requestAnimationFrame(renderNumbers);
    setTimeout(function(){
    cancelAnimationFrame(renderNumbers);
    canvas.style.display = "none";
    
    },7000);
    
}