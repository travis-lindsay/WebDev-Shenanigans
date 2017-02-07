function init(){
  //set the event listeners for the tiles
    document.getElementById("tile1").addEventListener('mouseover', animateTileTilt1, false);
    document.getElementById("tile1").addEventListener('mouseleave', animateTileTiltLeave1, false);
    document.getElementById("tile2").addEventListener('mouseover', animateTileTilt2, false);
    document.getElementById("tile2").addEventListener('mouseleave', animateTileTiltLeave2, false);
    document.getElementById("tile3").addEventListener('mouseover', animateTileTilt3, false);
    document.getElementById("tile3").addEventListener('mouseleave', animateTileTiltLeave3, false);
    
}
window.onload = init; //add event listener to execute init once the page is loaded    


var complete = true;
var completeLeave = true;
var complete2 = true;
var completeLeave2 = true;
var complete3 = true;
var completeLeave3 = true;
var complete4 = true;
var completeLeave4 = true;

function animateTileTilt1() {
    var tile = this
    if((tile.style.opacity < 1) && (tile.style.opacity != "")){
        return;
    }
    //set variable that animation is in progress
    complete = false;
    //set zindex higher
    tile.style.zIndex = 50;
    
    var rotation = 0;
    var opacity = 1;
    var tileAnim = setInterval(frame1, 60);
    function frame1() {
        if(rotation == 180){
            //Clears animation interval
            clearInterval(tileAnim);
            //fades in the text on the tile
            $("#tile1text").fadeIn(500);
            $("#tile1text2").fadeIn(1000);
            //set that animation is complete
            complete = true;
        
            //To ensure that if the mouse is still on the tile that the leave animation doesn't kick off
            var bStyle = document.getElementById("tile1");
            var cStyle = window.getComputedStyle(bStyle, null).backgroundColor; 
                //wait a set amount of time before kicking of return animation
                
                     if(cStyle == "rgb(255, 255, 255)"){
                         //complete = false;
                         //console.warn(cStyle);
                         return;
                     }
                     else { 
                         //console.warn(cStyle);
                         //complete = true;
                         setTimeout(function(){ 
                             animateTileTiltLeave1();
                         },1500);
                         }
        }
        else {
            rotation +=20;
            opacity -= .05;
            tile.style.transform = "rotateY("+ rotation +"deg)";
            tile.style.opacity = opacity;
            
        }
    }
    
}//end function

function animateTileTiltLeave1() {
    var tile = document.getElementById("tile1");
    /*var bStyle = document.getElementById("tile1");
    var cStyle = window.getComputedStyle(bStyle, null).backgroundColor;
    console.warn(cStyle);*/
    if((complete == true) && (completeLeave == true) && (tile.style.transform == "rotateY(180deg)")){
        completeLeave = false;
    } else {
        return;
    }
    
    $("#tile1text2").fadeOut(50);
    $("#tile1text").fadeOut(50);
    var rotation = 180;
    var opacity = .55;
    var tileAnim = setInterval(frame1, 60);
    function frame1() {
        if(rotation == 0){
            clearInterval(tileAnim);
            complete = true;
            completeLeave = true;
            //reset zindex
            tile.style.zIndex = 1;
        }
        else {
            rotation -=20;
            opacity += .05;
            tile.style.transform = "rotateY("+ rotation +"deg)";
            tile.style.opacity = opacity;
        }
    }
}

function animateTileTilt2() {
    var tile = this;
    //don't continue if the animation isn't already complete
    if((tile.style.opacity < 1) && (tile.style.opacity != "")){
        return;
    }
    
    //set zindex higher
    tile.style.zIndex = 50;
    
    var rotation = 0;
    var opacity = 1;
    var tileAnim = setInterval(frame1, 60);
    function frame1() {
        if(rotation == 180){
            clearInterval(tileAnim);
            $("#tile2text").fadeIn(500);
            $("#tile2text2").fadeIn(1000);
            
            complete2 = true;
             //To ensure that if the mouse is still on the tile that the leave animation doesn't kick off
            var bStyle = document.getElementById("tile2");
            var cStyle = window.getComputedStyle(bStyle, null).backgroundColor; 
                //wait a set amount of time before kicking of return animation
                
                     if(cStyle == "rgb(255, 255, 255)"){
                         return;
                     }
                     else { 
                         //console.warn(cStyle);
                         //complete = true;
                         setTimeout(function(){ 
                             animateTileTiltLeave2();
                         },1500);
                         }
        }
        else {
            rotation +=20;
            opacity -= .05;
            tile.style.transform = "rotateY("+ rotation +"deg)";
            tile.style.opacity = opacity;
            
        }
    }
    
}//end function

function animateTileTiltLeave2() {
    var bStyle = document.getElementById("tile2");
    var cStyle = window.getComputedStyle(bStyle, null).backgroundColor; 
    if(cStyle == "rgb(255, 255, 255)"){
                         return;
                     }
    var tile = document.getElementById("tile2");
    if((complete2 == true) && (completeLeave2 == true) && (tile.style.transform == "rotateY(180deg)")){
        completeLeave2 = false;
    } else {
        return;
    }
    $("#tile2text2").fadeOut(50);
    $("#tile2text").fadeOut(50);
    var rotation = 180;
    var opacity = .55;
    var tileAnim = setInterval(frame1, 60);
    function frame1() {
        if(rotation == 0){
            clearInterval(tileAnim);
            complete2 = true;
            completeLeave2 = true;
            //reset zindex
            tile.style.zIndex = 1;
        }
        else {
            rotation -=20;
            opacity += .05;
            tile.style.transform = "rotateY("+ rotation +"deg)";
            tile.style.opacity = opacity;
        }
    }
}

function animateTileTilt3() {
    var tile = this;
    //alert(tile.style.transform);
    if((tile.style.opacity < 1) && (tile.style.opacity != "")){
        return;
    }
    /*if((complete2 == true) && (completeLeave2 == true)){
        complete2 = false;
    } else {
        return; //to avoid the jitter of trying to restart this function if the animation isn't complete
    }*/
    
    //set zindex higher
    tile.style.zIndex = 50;
    
    var rotation = 0;
    var opacity = 1;
    var tileAnim = setInterval(frame1, 60);
    function frame1() {
        if(rotation == 180){
            clearInterval(tileAnim);
            $("#tile3text").fadeIn(500);
            $("#tile3text3").fadeIn(1000);
            
             //To ensure that if the mouse is still on the tile that the leave animation doesn't kick off
            var bStyle = document.getElementById("tile3");
            var cStyle = window.getComputedStyle(bStyle, null).backgroundColor; 
                //wait a set amount of time before kicking of return animation
                
                     if(cStyle == "rgb(255, 255, 255)"){
                         //complete = false;
                         //console.warn(cStyle);
                         return;
                     }
                     else { 
                         //console.warn(cStyle);
                         //complete = true;
                         setTimeout(function(){ 
                             animateTileTiltLeave3();
                         },1500);
                         }
        }
        else {
            rotation +=20;
            opacity -= .05;
            tile.style.transform = "rotateY("+ rotation +"deg)";
            tile.style.opacity = opacity;
            
        }
    }
    
}//end function

function animateTileTiltLeave3() {
    var tile = document.getElementById("tile3");
    if((complete3 = true) && (completeLeave3 == true) && (tile.style.transform == "rotateY(180deg)")){
        completeLeave3 = false;
    } else {
        return;
    }
    $("#tile3text3").fadeOut(50);
    $("#tile3text").fadeOut(50);
    var rotation = 180;
    var opacity = .55;
    var tileAnim = setInterval(frame1, 60);
    function frame1() {
        if(rotation == 0){
            clearInterval(tileAnim);
            complete3 = true;
            completeLeave3 = true;
            //reset zindex
            tile.style.zIndex = 1;
        }
        else {
            rotation -=20;
            opacity += .05;
            tile.style.transform = "rotateY("+ rotation +"deg)";
            tile.style.opacity = opacity;
        }
    }
}