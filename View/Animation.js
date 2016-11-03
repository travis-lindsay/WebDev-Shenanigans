var activeAnimation = false;
var activeReturn = false;
var activeAnimation2 = false;
var activeReturn2 = false;
var activeAnimation3 = false;
var activeReturn3 = false;
var bombAnim = false;
var complete = false;

function animateCompleteNum() {
    complete = false;
    //Before deselecting the selectedNumber variable
    //Add the number element
    var num = document.createElement("div");
    num.innerText = selectedNumber;
    //disable the selectednumber button
    var buttonArray = document.getElementsByClassName("buttonClicked");
    var realButton = buttonArray[0];
    realButton.classList.add("buttonDisabled"); //give it a disabled 'look'
    realButton.classList.remove("buttonClicked");
    realButton.removeEventListener('click', changeBtClicked, false); //remove ability to click the number icon
    selectedNumber = null; //remove the ability to click cells / add numbers
    setSelectedCursor(null); //remove the custom cursor
    //Do the rad gradient animation thing
    var gameContainer = document.getElementById("sudokuGrid");
    var loseOverlay = document.createElement("div");
    loseOverlay.id = "lose";
    loseOverlay.classList.add("numberCompleteOverlay");
    loseOverlay.classList.add("sudokuGameGrid");
    gameContainer.insertBefore(loseOverlay, gameContainer.childNodes[0]);
    //"background: linear-gradient(to right, rgba(200,200,200,1), rgba(33, 32, 32, 0.6))"
    loseOverlay.style = "opacity: .05; transition-duration: 1s;"
    loseOverlay.style.background = "radial-gradient(yellow -40%, green 0%)";
    loseOverlay.appendChild(num);
    num.id = "completeNum";
    //Now loop through and change the values gradually for the radial gradient
    var op = .05;
    var op2 = .05;
    var green = 0;
    var yellow = -40;
    var rotation = 0;
    var rotMod = 55;
    var numAnim = setInterval(frame1, 60);
    function frame1() {
        if(green == 60){
            clearInterval(numAnim);
            complete = true;
            setTimeout(function(){ 
                     fadeOut(loseOverlay, num);
                 },1500);
        }
        else {
            rotMod -= 2;
            green += 2;
            yellow += 2;
            rotation -= rotMod;
            if(op < .5){ //check to see if gradient opacity has hit its limit
               op += .05;
                loseOverlay.style.opacity = op;
            }
            if(op2 < 1){
                op2 += .05;
                num.style.opacity = op2; //make the number slowly appear
            }
            loseOverlay.style.background = "radial-gradient(yellow " + yellow + "%, green " + green + "%)";
            num.style.transform = "rotateY("+ rotation +"deg)";
            
        }
    }
    
}//end function

function fadeOut(lose, n) {
        //slowly fade out animation, then remove it
        var op = 1;
        var op2 = 1;
        var numAnim2 = setInterval(frame2, 60);
        function frame2() {
            if(op <= -1){
                clearInterval(numAnim2);
                //delete the overlay
                var sudokuGame = document.getElementById("sudokuGrid");
                var innerChild = sudokuGame.firstChild;
                sudokuGame.removeChild(innerChild);
                }
            else {
                    op -= .1;
                    op2 -= .1;
                    lose.style.opacity = op;
                    n.style.opacity = op2;
                }
        } //end frame
}// end function

function easyAnimation() {
    var sunPos = document.getElementById("sun").style.left;
    var pix = sunPos.substring(0,3);
    if (Number(pix) > 130)
        return; //Just leave the function
    if((activeAnimation == true) || (activeReturn == true))
            return;
    
    activeAnimation = true;
    var sun = document.getElementById("sun");
    var grass1 = document.getElementById("grass1");
    var grass2 = document.getElementById("grass2");
    var bunny = document.getElementById("bunny");
    var posLeft = 130;
    var posTop = 35;
    var posTopG2 = 45;
    var posTopB = 50;
    var posLeftG1 = 168;
    var posLeftG2 = 55;
    var rotateDegSun = 0;
    var rotateDegGrass1 = 10;
    var rotateDegGrass2 = 10;
    var startAnim = setInterval(frame1, 25);
    function frame1() {
        if (posLeft == 150) {
            clearInterval(startAnim);
            var bStyle = document.getElementById("difficultyEasy");
            var cStyle = window.getComputedStyle(bStyle, null).backgroundColor;
            if(activeReturn != true)
                 setTimeout(function(){ 
                     if(cStyle == "rgb(44, 162, 15)"){
                         return;
                     }
                     else { easyReturnAnimation(); }
                 },1500);
            activeAnimation = false;
        } else {
            posTop -= 3.5;
            posLeft++;
            posTopG2 -= 1.5;
            posTopB -= 3;
            rotateDegSun++;
            rotateDegGrass1++;
            rotateDegGrass2--;
            posLeftG1++;
            posLeftG2--;
            sun.style.top = posTop + 'px'; 
            sun.style.left = posLeft + 'px'; 
            sun.style.transform = "rotate("+rotateDegSun+"deg)";
            grass1.style.left = posLeftG1 + 'px';
            grass1.style.transform = "rotate("+(rotateDegGrass1*2)+"deg)";
            grass2.style.top = posTopG2 + 'px';
            grass2.style.left = posLeftG2 + 'px';
            grass2.style.transform = "rotate("+rotateDegGrass2+"deg)";
            bunny.style.top = posTopB + 'px';
        }
    }
}

function easyReturnAnimation() {
    //Check to see if the animation has already completed
    var sunPos = document.getElementById("sun").style.left;
    var pix = sunPos.substring(0,3);
    if (Number(pix) < 150)
        return; //Just leave the function
    if((activeAnimation == true) || (activeReturn == true))
            return;
        
    activeReturn = true;
    var sun = document.getElementById("sun");
    var grass1 = document.getElementById("grass1");
    var grass2 = document.getElementById("grass2");
    var bunny = document.getElementById("bunny");
    var posLeft = 150;
    var posTop = -35;
    var posTopG2 = 15;
    var posTopB = -10;
    var posLeftG1 = 188;
    var posLeftG2 = 35;
    var rotateDegSun = 20;
    var rotateDegGrass1 = 60;
    var rotateDegGrass2 = -10;
    var startAnim = setInterval(frame2, 25);
    function frame2() {
        if (posLeft == 115) {
            clearInterval(startAnim);
            activeAnimation = false;
            activeReturn = false;
        } else {
            posTop += 2.5;
            posLeft--;
            posTopG2 += 1.5;
            posTopB += 1.7;
            rotateDegSun--;
            rotateDegGrass1 -=2;
            rotateDegGrass2++;
            posLeftG1--;
            posLeftG2++;
            sun.style.top = posTop + 'px'; 
            sun.style.left = posLeft + 'px'; 
            sun.style.transform = "rotate("+rotateDegSun+"deg)";
            grass1.style.left = posLeftG1 + 'px';
            grass1.style.transform = "rotate("+rotateDegGrass1+"deg)"; 
            grass2.style.top = posTopG2 + 'px';
            grass2.style.left = posLeftG2 + 'px';
            grass2.style.transform = "rotate("+rotateDegGrass2+"deg)";
            bunny.style.top = posTopB + 'px';
        }
    }
}

//*********************************************************Medium Button***********************************************8
function mediumAnimation() {

    var hamPos = document.getElementById("hammer").style.left;
    var pix = hamPos.substring(0,3);
    if (Number(pix) > 125)
        return; //Just leave the function
    
    activeAnimation2 = true;
    var wrench = document.getElementById("wrench");
    var hammer = document.getElementById("hammer");
    var machine = document.getElementById("machine");
    var flex = document.getElementById("flex");
    var posLeft = 55;
    var posTop = 145;
    var hamLeft = 125;
    var hamTop = 145;
    var macLeft = 45;
    var flexLeft = 150;
    var rotateDegHam = -160;
    var rotateDegWrench = 160;
    var startAnim = setInterval(frame1, 25);
    function frame1() {
        if (posLeft == 0) {
            clearInterval(startAnim);
            var bStyle = document.getElementById("difficultyMedium");
            var cStyle = window.getComputedStyle(bStyle, null).backgroundColor;
            if(activeReturn != true)
                 setTimeout(function(){ 
                     if(cStyle == "rgb(206, 131, 20)"){
                         return;
                     }
                     else { mediumReturnAnimation(); }
                 },1500);
            activeAnimation2 = false;
        } else {
            posLeft -= 2.75;
            posTop -= 1.25;
            hamLeft += 3;
            hamTop -= 1.25;
            flexLeft += 2;
            macLeft -= 2.75;
            rotateDegHam += 8;
            rotateDegWrench -= 8;
            wrench.style.left = posLeft + 'px'; 
            hammer.style.left = hamLeft + 'px';
            wrench.style.top = posTop + 'px';
            hammer.style.top = hamTop + 'px';
            flex.style.left = flexLeft + 'px';
            machine.style.left = macLeft + 'px';
            wrench.style.transform = "rotate("+rotateDegWrench+"deg)";
            hammer.style.transform = "rotate("+rotateDegHam+"deg)";

        }
    }
}

function mediumReturnAnimation() {
    //Check to see if the animation has already completed
    var hamPos = document.getElementById("hammer").style.left;
    var pix = hamPos.substring(0,3);
    if (Number(pix) < 185)
        return; //Just leave the function
        
    activeReturn2 = true;
    var wrench = document.getElementById("wrench");
    var hammer = document.getElementById("hammer");
    var machine = document.getElementById("machine");
    var flex = document.getElementById("flex");
    var posLeft = 0;
    var posTop = 120;
    var hamLeft = 185;
    var hamTop = 120;
    var macLeft = -10;
    var flexLeft = 190;
    var rotateDegHam = 0;
    var rotateDegWrench = 0;
    var startAnim = setInterval(frame2, 25);
    function frame2() {
        if (hamLeft == 125) {
            clearInterval(startAnim);
            activeAnimation2 = false;
            activeReturn2 = false;
        } else {
            posLeft += 2.75;
            posTop += 1.25;
            hamLeft -= 3;
            hamTop += 1.25;
            flexLeft -= 2;
            macLeft += 2.75;
            rotateDegHam -= 8;
            rotateDegWrench += 8;
            wrench.style.left = posLeft + 'px'; 
            hammer.style.left = hamLeft + 'px';
            wrench.style.top = posTop + 'px';
            hammer.style.top = hamTop + 'px';
            flex.style.left = flexLeft + 'px';
            machine.style.left = macLeft + 'px';
            wrench.style.transform = "rotate("+rotateDegWrench+"deg)";
            hammer.style.transform = "rotate("+rotateDegHam+"deg)";
        }
    }
}

//********************************************************Hard Animation************************************

function hardAnimation() {

    var chainPosL = document.getElementById("chainsaw").style.left;
    var pix = chainPosL.substring(0,3);
    if (Number(pix) > 120)
        return; //Just leave the function
    
    activeAnimation3 = true;
    var skull = document.getElementById("skull");
    var dragon = document.getElementById("dragon");
    var chainsaw = document.getElementById("chainsaw");
    var skullLeft = 45;
    var skullTop = 255;
    var dragonLeft = 110;
    var dragonTop = 255;
    var chainsawLeft = 120;
    var chainsawTop = 270;
    var rotateDegSkull = 0;
    var rotateDegChainsaw = -55;
    var rotateDegDragon = 0;
    animateBomb(); //calls separate function for bomb animation
    var startAnim = setInterval(frame1, 40);
    function frame1() {
        if (skullLeft == -3) {
            clearInterval(startAnim);
            var bStyle = document.getElementById("difficultyHard");
            var cStyle = window.getComputedStyle(bStyle, null).backgroundColor;
            if(activeReturn != true)
                 setTimeout(function(){ 
                     if(cStyle == "rgb(123, 2, 2)"){
                         return;
                     }
                     else { hardReturnAnimation(); }
                 },1500);
            activeAnimation3 = false;
        } else {
            skullLeft -= 4;
            skullTop += .5;
            dragonLeft += 5.5;
            dragonTop -= 2.5;
            chainsawLeft += 4;
            chainsawTop += 3;
            rotateDegSkull -= 2.5;
            rotateDegChainsaw += 7;
            rotateDegDragon += 2.5;
            skull.style.left = skullLeft + 'px'; 
            dragon.style.left = dragonLeft + 'px';
            skull.style.top = skullTop + 'px';
            dragon.style.top = dragonTop + 'px';
            chainsaw.style.left = chainsawLeft + 'px';
            chainsaw.style.top = chainsawTop + 'px';
            skull.style.transform = "rotate("+rotateDegSkull+"deg)";
            chainsaw.style.transform = "rotate("+rotateDegChainsaw+"deg)";
            dragon.style.transform = "rotate("+rotateDegDragon+"deg)";

        }
    }
}

function hardReturnAnimation() {
    //Check to see if the animation has already completed
    var chainPos = document.getElementById("chainsaw").style.left;
    var pix = chainPos.substring(0,3);
    if (Number(pix) < 168)
        return; //Just leave the function
    
    activeAnimation3 = true;
    var skull = document.getElementById("skull");
    var dragon = document.getElementById("dragon");
    var chainsaw = document.getElementById("chainsaw");
    var skullLeft = -3;
    var skullTop = 261;
    var dragonLeft = 176;
    var dragonTop = 225;
    var chainsawLeft = 168;
    var chainsawTop = 306;
    var rotateDegSkull = -30;
    var rotateDegChainsaw = 29;
    var rotateDegDragon = 30;
    var startAnim = setInterval(frame1, 40);
    function frame1() {
            if(skullLeft == 45){
                clearInterval(startAnim);
                activeAnimation3 = false;
                activeReturn3 = false;
            }
         else {
            skullLeft += 4;
            skullTop -= .5;
            dragonLeft -= 5.5;
            dragonTop += 2.5;
            chainsawLeft -= 4;
            chainsawTop -= 3;
            rotateDegSkull += 2.5;
            rotateDegChainsaw -= 7;
            rotateDegDragon -= 2.5;
            skull.style.left = skullLeft + 'px'; 
            dragon.style.left = dragonLeft + 'px';
            skull.style.top = skullTop + 'px';
            dragon.style.top = dragonTop + 'px';
            chainsaw.style.left = chainsawLeft + 'px';
            chainsaw.style.top = chainsawTop + 'px';
            skull.style.transform = "rotate("+rotateDegSkull+"deg)";
            chainsaw.style.transform = "rotate("+rotateDegChainsaw+"deg)";
            dragon.style.transform = "rotate("+rotateDegDragon+"deg)";

        }
    }
}

function animateBomb(){
    if(bombAnim == true){
       return;   
    }
    bombAnim = true;
    var bomb = document.getElementById("bomb");
    var bombLeft = 60;
    var bombTop = 260;
    var bombDeg = 145;
    var dropRatio = 4.2;
    var startAnim = setInterval(frame5, 30);
    function frame5() {
            if(bombLeft == -284){
                clearInterval(startAnim);
                //render the flames
                var flameC = document.getElementById("easyAnimation");
                var flameI = document.createElement("img");
                flameI.id = "flame";
                flameI.src = "././IMG/fire1.gif";
                try {
                flameC.appendChild(flameI);
                     }
                catch(error) {
                    return;
                //document.getElementById("userN").innerHTML = error.message;
                    //Just ignore the error, we don't really care too much about this animation failing
                }
                flameC.removeChild(bomb); //removes bomb img
                setTimeout(function(){ 
                     //slowly remove the fire img
                    var fWidth = 160;
                    var fHeight = 160;
                    var fLeft = -315;
                    var fTop = 225;
                    var opacity = 1;
                    var startAnim = setInterval(fireAnim, 100);
                    function fireAnim() {
                        fWidth -= 5;
                        fHeight -= 5;
                        fLeft += .5;
                        fTop += 2;
                        opacity -= .05;
                        flameI.style.width = fWidth + 'px';
                        flameI.style.height = fHeight + 'px';
                        flameI.style.left = fLeft + 'px';
                        flameI.style.top = fTop + 'px';
                        flameI.style.opacity = opacity;
                            if(fWidth == 5)
                                {
                                    clearInterval(fireAnim);
                                    //remove fire gif
                                    flameC.removeChild(flameI);
                                    bombAnim = false;
                                }
                    }
                    //re-set the bomb img
                    var bombI = document.createElement("img");
                    bombI.id = "bomb";
                    bombI.src = "././IMG/bomb.png";
                    flameC.appendChild(bombI);
                 },1500);
            }
         else {
            bombLeft -= 8;
            bombTop -= dropRatio;
            bombDeg -= 2;
            dropRatio -= .2;
            bomb.style.left = bombLeft + 'px';
            bomb.style.top = bombTop + 'px';
            bomb.style.transform = "rotate("+bombDeg+"deg)";
         }
    }
}