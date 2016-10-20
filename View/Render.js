//Global Game Settings variables
var highlightEnabled = true;
var loseEnabled = true;
var userName = "";

function renderStartMenu() {
    //This function will render the start menu of the sudoku game
    var startPoint = document.getElementById("sudokuGrid");
    var menuDiv = document.createElement("div");
    menuDiv.classList.add("startMenu");
    menuDiv.id = "startMenu";
    startPoint.appendChild(menuDiv);
    //TODO, render html for menu
    var gameTitle = document.createElement("h1");
    gameTitle.id = "gameTitle";
    gameTitle.innerText = "SUDOKU";
    menuDiv.appendChild(gameTitle);
    var startButton = document.createElement("div");
    startButton.classList.add("startButtons");
    menuDiv.appendChild(startButton);
    //Create Buttons
    var button1 = document.createElement("button");
    button1.classList.add("startButton1");
    button1.innerText = "Start Game";
    var button2 = document.createElement("button");
    button2.classList.add("startButton1");
    button2.innerText = "How To Play";
    //Add buttons
    startButton.appendChild(button1);
    startButton.appendChild(button2);
    //Make the buttons do something
    button1.addEventListener('click', renderPickGame, false);
    button2.addEventListener('click', renderHowTo, false);
}

function renderHowTo(){
    //remove the old stuff
    removeOldStuff("sudokuGrid");
    //render the How To Menu
    //Render the pickGame difficulty menu
    //Adjust the size of the grid to fit a larger how to video
    var startPoint = document.getElementById("sudokuGrid");
    startPoint.style.width = "100%";
    startPoint.style.height = "700px";
    var menuDiv = document.createElement("div");
    menuDiv.classList.add("pickDifficulty");
    menuDiv.id = "difDiv";
    startPoint.appendChild(menuDiv);
    var gameTitle = document.createElement("h1");
    gameTitle.id = "difficultyTitle";
    gameTitle.innerText = "How to play";
    menuDiv.appendChild(gameTitle);
    var startButton = document.createElement("div");
    startButton.classList.add("helpMenu");
    menuDiv.appendChild(startButton);
    startButton.innerHTML = "<video id=\"helpvid\" width=\"100%\" height=\"500px\" controls><source src=\"../IMG/demoHowTo.mp4\" type=\"video/mp4\">Your browser does not support the video tag, please update your web browser to view the video.</video>";
}

function removeOldStuff(nodeID){
    var sudokuGame = document.getElementById(nodeID);
    var innerChild = sudokuGame.firstChild;
    while(innerChild) {
        sudokuGame.removeChild(innerChild);
        innerChild = sudokuGame.firstChild;
    }
}

function renderPickGame() {
    //this function will be the one that lets you pick the difficulty
    //Delete the start menu
    removeOldStuff("sudokuGrid");
    
    //Render the pickGame difficulty menu
    var startPoint = document.getElementById("sudokuGrid");
    var menuDiv = document.createElement("div");
    menuDiv.classList.add("pickDifficulty");
    menuDiv.id = "difDiv";
    startPoint.appendChild(menuDiv);
    var gameTitle = document.createElement("h1");
    gameTitle.id = "difficultyTitle";
    gameTitle.innerText = "Select Difficulty";
    menuDiv.appendChild(gameTitle);
    var startButton = document.createElement("div");
    startButton.classList.add("startButtons");
    menuDiv.appendChild(startButton);
    //Create animation container for easy button
    var animCont = document.createElement("div");
    animCont.classList.add("animationContainer");
    animCont.id = "easyCont";
    startButton.appendChild(animCont);
    //Create animation div for easy button
    var easyAnim = document.createElement("div");
    easyAnim.classList.add("difAnimation");
    easyAnim.id = "easyAnimation";
    animCont.appendChild(easyAnim);
    //Add sun image
    easyAnim.innerHTML = "<img src=\"../IMG/Sun2.png\" id=\"sun\"><img src=\"../IMG/Grass2.png\" id=\"grass1\"><img src=\"../IMG/Grass2.png\" id=\"grass2\"><img src=\"../IMG/bunny.png\" id=\"bunny\"><img src=\"../IMG/hammer.png\" id=\"hammer\"><img src=\"../IMG/wrenchy.png\" id=\"wrench\"><img src=\"../IMG/machine.png\" id=\"machine\"><img src=\"../IMG/flex.png\" id=\"flex\"><img src=\"../IMG/skull.png\" id=\"skull\"><img src=\"../IMG/dragonFace.png\" id=\"dragon\"><img src=\"../IMG/chainsaw.png\" id=\"chainsaw\"><img src=\"../IMG/bomb.png\" id=\"bomb\">"
    
     //Create Buttons
    var button1 = document.createElement("button");
    button1.classList.add("difficultyButtons");
    button1.id ="difficultyEasy";
    button1.innerText = "Easy";
    var button2 = document.createElement("button");
    button2.classList.add("difficultyButtons");
    button2.id = "difficultyMedium";
    button2.innerText = "Medium";
    var button3 = document.createElement("button");
    button3.classList.add("difficultyButtons");
    button3.id = "difficultyHard";
    button3.innerText = "Hard";
    //Add buttons
    animCont.appendChild(button1);
    animCont.appendChild(button2);
    animCont.appendChild(button3);
    //Add Event Listeners for buttons
    button1.addEventListener('click', pickGame, false);
    button1.addEventListener('mouseover', easyAnimation, false);
    button1.addEventListener('mouseleave', easyReturnAnimation, false);
    button2.addEventListener('click', pickGame, false);
    button2.addEventListener('mouseover', mediumAnimation, false);
    button2.addEventListener('mouseleave', mediumReturnAnimation, false);
    button3.addEventListener('click', pickGame, false);
    button3.addEventListener('mouseover', hardAnimation, false);
    button3.addEventListener('mouseleave', hardReturnAnimation, false);

}

//Test render html table with javacript, with params for grid width
function renderGame(gameInfo,x,y) {
    //Delete Previous menu stuff...
    removeOldStuff("sudokuGrid");
    //Change the puzzle that is loaded based on the difficulty selected
    
    //Render the game buttons
    renderGameButtons();
    
    var startPoint = document.getElementById("sudokuGrid");
    var newTable = document.createElement("table");
    newTable.id = "sudokuGameTable";
    startPoint.appendChild(newTable);
    
    
    //Start adding in the rows and columns
    for(var t = 0; t < x; t++){
        var row = newTable.insertRow(t);
        //Switch depending on row type
        switch(t) {
            case 0:
                newTable.rows[t].classList.add("topBorderEdge");
                break;
            case 3:
                newTable.rows[t].classList.add("topEdge");
                break;
            case 6:
                newTable.rows[t].classList.add("topEdge");
                break;
            case 8:
                newTable.rows[t].classList.add("bottomBorderEdge");
                break;
            default:
                break;
        }
        
        
        for(var u = 0; u < y; u++) {
            //Create the new cell
            newTable.rows[t].insertCell(u);
            //Add the event listener to the cell
            newTable.rows[t].cells[u].addEventListener('click', checkValidNumber, false);
            //Add the number for the puzzle, if available
            if(gameInfo.puzzleToLoad[t][u] != 0)
                {
                   newTable.rows[t].cells[u].innerText = gameInfo.puzzleToLoad[t][u];
                }
            else {
                newTable.rows[t].cells[u].innerText = "";
                //It should have a hover css style
                newTable.rows[t].cells[u].classList.add("emptyCell");
            }
            //Adds attributes depending on the cell number
            switch(u) {
                case 0: 
                    newTable.rows[t].cells[u].classList.add("leftBorderEdge");
                    break;
                case 2:
                    newTable.rows[t].cells[u].classList.add("rightEdge");
                    break;
                case 3:
                    newTable.rows[t].cells[u].classList.add("leftEdge");
                    break;
                case 5:
                    newTable.rows[t].cells[u].classList.add("rightEdge");
                    break;
                case 6:
                    newTable.rows[t].cells[u].classList.add("leftEdge");
                    break;
                case 8:
                    newTable.rows[t].cells[u].classList.add("rightBorderEdge");
                    break;
                default:
                    break;
            }
        }
    } //END GAME TABLE LOOPS
    //Set ID for tbody
    var body = document.getElementById("sudokuGameTable");
    body.firstChild.id = "tableBody";

}//End renderGame()

function renderGameButtons() {
    
    //Create the buttons and such
    var numsContainer = document.getElementById("nums");
    
    for(var i = 1; i < 10; i++){
        var button = document.createElement("button");
        button.classList.add("button1");
        button.innerText = i;
        numsContainer.appendChild(button);
    }
    //Create the time and current time buttons
    var timeButton = document.createElement("button");
    timeButton.classList.add("timer");
    timeButton.id = "time1";
    timeButton.innerText = "Time:"
    numsContainer.appendChild(timeButton);
    var timeButton2 = document.createElement("button");
    timeButton2.classList.add("elapsedTime");
    timeButton2.id = "time";
    timeButton2.innerText = "00:00"
    numsContainer.appendChild(timeButton2);
    
    //Create all of the Hint and Error buttons
    var checksContainer = document.getElementById("checks");
    var setDiv = document.createElement("div");
    //var settings = document.createElement("button");
    var hint = document.createElement("button");
    var hChecks = document.createElement("button");
    var error = document.createElement("button");
    var eChecks = document.createElement("button");
    setDiv.class = "settingsMenu";
    //settings.id = "settings";
    hint.id = "hintButton";
    hChecks.class = "secondaryMenu";
    hChecks.id = "hintChecks";
    error.class = "secondaryMenu";
    error.id = "errorChunk";
    eChecks.class = "secondaryMenu";
    eChecks.id = "errorChecks";
    hint.innerText = "Hint";
    error.innerText = "Errors";
    //append them
    //checksContainer.appendChild(settings);
    checksContainer.appendChild(setDiv);
    checksContainer.appendChild(hint);
    checksContainer.appendChild(hChecks);
    checksContainer.appendChild(error);
    checksContainer.appendChild(eChecks);
    setDiv.innerHTML = "<div id=\"relC\"><button id=\"settings\"></button><div class=\"settingsMenuContent\" id=\"setC\"><p id=\"gameOpt\"><b>Game Options:</b></p><select id=\"highOpt\"><option value=\"Grid-Highlighting\">Grid-Highlighting</option><option value=\"No-Highlighting\">No-Highlighting</option></select><select id=\"loseOpt\"><option value=\"Losing-Enabled\">Losing-Enabled<\/option><option value=\"Losing-Disabled\">Losing-Disabled</option></select><p id=\"gameOpt\">User Name:</p><input id=\"tInput\" value=\"e.g. myUser\" type=\"text\" name=\"userName\" maxlength=\"16\"><button id=\"save\">Save</button><button id=\"cancel\">Cancel</button></div></div>"
    hChecks.innerHTML = 
        "<span class=\"checksGone\">&#x2714</span><span class=\"checksGone\">&#x2714</span><span class=\"checksGone\">&#x2714</span>";
    eChecks.innerHTML = 
        "<span class=\"checksGone\">&#x2718</span><span class=\"checksGone\">&#x2718</span><span class=\"checksGone\">&#x2718</span>"

    //Set Event listener for Game Menu button
    var gameMenuButton = document.getElementById("returnToMenu");
    gameMenuButton.addEventListener('click', returnMenu, false);
    
    //Set eventlisteners for the number buttons
    //Set variable containing all the children, the number buttons, of the div containing the buttons
    var myNumButtons = document.getElementById("nums").childNodes;
        for (var k = 0; k < myNumButtons.length; k++)
            {
                //sets the onclick event to call the changeBtClicked function
                if(myNumButtons[k].id != "time" && myNumButtons[k].id != "time1")
                {
                myNumButtons[k].addEventListener('click', changeBtClicked, false);
                }
            }
    
    //set eventListener for the hint button
    var hintButton = document.getElementById("hintButton");
    hintButton.addEventListener('click', giveHint, false);
    //Set eventListener for the Settings button
    var setButton = document.getElementById("settings");
    setButton.addEventListener('click', renderSetMenu, false);
    //Set event for removing settings menu
    //var setM = document.getElementById("setC");
    //setM.addEventListener('mouseleave', removeSetMenu, false);
    var cancelBt = document.getElementById("cancel");
    cancelBt.addEventListener('click', removeSetMenu, false);
    var saveBt = document.getElementById("save");
    saveBt.addEventListener('click', saveSettings, false);
    //Set event for onfocus text input
    var textInput = document.getElementById("tInput");
    textInput.addEventListener("focus", textFocus, false);
    textInput.addEventListener("blur", textBlur, false);
    textInput.addEventListener("keydown", checkEnterKey, false);
    
    //Test for the timer function
    showTimer();
    //Start the game timer  
    startTimer();
}

function renderGameWinTiles(t) {
    var myTable = document.getElementById("sudokuGameTable");
    var moveOn = false;
    var i = 0;
    var j = 0;
    var winAnim = setInterval(frame1, 40);
    function frame1() {
        if(i==9){
            moveOn = true;
            clearInterval(winAnim);
            renderGameWin(t);
            //return; //loop should be over
        }
        if(j==9){
            i++; //move on to the next row
            j = 0; //reset the cell index variable
        }
        if(i != 9){
        myTable.rows[i].cells[j].style = "color: green; font-size: 22px;";
        j++; 
        }
    //code that eventually runs and highlights all the numbers
    }
}

function renderGameWin(gameTime)
{    
    var gameContainer = document.getElementById("sudokuGrid");
    var loseOverlay = document.createElement("div");
    loseOverlay.classList.add("loseOverlay");
    loseOverlay.classList.add("sudokuGameGrid");
    gameContainer.insertBefore(loseOverlay, gameContainer.childNodes[0]);
    loseOverlay.innerHTML = "<h1 id=\"gameTitle\">YOU WIN!</h1><div class = \"startButtons\"><div class=\"gameStatHeaders\"> <h2>Completion: <span id=\"percentComplete\"></span></h2><h2>Time: <span id=\"totalTime\"></span></h2></div><button class=\"startButton1\" id=\"try\">Play Again?</button><button class=\"startButton1\" id=\"men\">Game Menu</button>";
    //Calculate the percentage, and display it
    var percentContainer = document.getElementById("percentComplete");
    percentContainer.innerText = "100%";
    //Set the time value
    var timeContainer = document.getElementById("totalTime");
    timeContainer.innerHTML = gameTime;
    
    //Set eventListeners for the two buttons
    var tryAgain = document.getElementById("try");
    var menu = document.getElementById("men");
    tryAgain.addEventListener('click', pickGame, false);
    menu.addEventListener('click', returnMenu, false);
}

function renderGameLose(numRem, gameTime)
{
    var gameContainer = document.getElementById("sudokuGrid");
    var loseOverlay = document.createElement("div");
    loseOverlay.classList.add("loseOverlay");
    loseOverlay.classList.add("sudokuGameGrid");
    gameContainer.insertBefore(loseOverlay, gameContainer.childNodes[0]);
    loseOverlay.innerHTML = "<h1 id=\"gameTitle\">GAME OVER</h1><div class = \"startButtons\"><div class=\"gameStatHeaders\"> <h2>Completion: <span id=\"percentComplete\"></span></h2><h2>Time: <span id=\"totalTime\"></span></h2></div><button class=\"startButton1\" id=\"try\">Try Again?</button><button class=\"startButton1\" id=\"men\">Game Menu</button>";
    //Calculate the percentage, and display it
    var percentContainer = document.getElementById("percentComplete");
    //Number of remaining squares / total squares * 100 - 100, then take the absolute value of that since it should be a negative value
    var total = Math.abs(Math.round(((numRem/81)*100))-100);
    percentContainer.innerText = total+"%";
    //Set the time value
    var timeContainer = document.getElementById("totalTime");
    timeContainer.innerHTML = gameTime;
    
    //Set eventListeners for the two buttons
    var tryAgain = document.getElementById("try");
    var menu = document.getElementById("men");
    tryAgain.addEventListener('click', pickGame, false);
    menu.addEventListener('click', returnMenu, false);
}

function highlightSameNums(myElem) {
    'use strict';

    var myTable = document.getElementById("sudokuGameTable");
    
     for (var i = 0; i < 9; i++) {
         
         for (var j = 0; j < 9; j++)
             {
                 //This is to reset the currently highlighted cells, if any
                  if (myTable.rows[i].cells[j].classList.contains("sameCellHighlight"))
                                    {
                                        myTable.rows[i].cells[j].classList.remove("sameCellHighlight");
                                    }
                 if(myTable.rows[i].cells[j].id == "sameNumberHighlight")
                            {
                                myTable.rows[i].cells[j].id = "";
                            }
                 //If the No-Highlighting option is selected...just skip over this part
                    if(highlightEnabled == true){
                        if(myTable.rows[i].cells[j].innerText == selectedNumber)
                        {
                            //if they are the same number, highlight the cell
                            myTable.rows[i].cells[j].id = "sameNumberHighlight";
                            myTable.rows[i].cells[j].classList.add("sameCellHighlight");
                            //Increment the number of currently found numbers for the specific number
                            //TODO
                        }
                        
                    }
                     
             }

     }
}

function returnMenu() {
    //Delete the sudoku game
    removeOldStuff("sudokuGrid");
    //Delete the game buttons as well
    removeOldStuff("nums");
    //Delete game check buttons as well
    removeOldStuff("checks");
    
    //Reset the game variables
    numHints = 0;
    numErrors = 0;
    selectedNumber = null;
    
    //Re-render the start menu
    renderStartMenu();
}

function renderSetMenu() {
    var setMenu = document.getElementById("setC");
    setMenu.style.display = "block";
}

function removeSetMenu() {
    //Check to see if the userName was saved
    if(userName == ""){
        var textInput = document.getElementById("tInput");
        textInput.value = "e.g. myUser";
        textInput.style.color = "gray";
    }
    var setMenu = document.getElementById("setC");
    setMenu.style.display = "none";
}

function textFocus() {
    var textInput = document.getElementById("tInput");
    if(textInput.value == "e.g. myUser"){
     textInput.value = "";   
    }
    textInput.style.color = "black";
}

function textBlur() {
    var textInput = document.getElementById("tInput");
    if(textInput.value == ""){
        textInput.value = "e.g. myUser";
        textInput.style.color = "gray";
    }
}

function saveSettings() {
    var textInput = document.getElementById("tInput");
    var highlight = document.getElementById("highOpt");
    var lose = document.getElementById("loseOpt");
    if((textInput.value != "") &&(textInput.value != "e.g. myUser")){
        userName = textInput.value; 
        renderUserName();
    } else {
        userName = "";
        renderUserName();
    }
    if(highlight.value == "Grid-Highlighting"){
        highlightEnabled = true;
        //If a number is selected this will highlight the numbers
        highlightSameNums();
    } else {
        highlightEnabled = false;
        //this will reset any currently highlighted numbers
        highlightSameNums();
    }
    if(lose.value == "Losing-Enabled"){
        loseEnabled = true;
    } else {
        loseEnabled = false;
    }
    //Now remove the panel
    removeSetMenu();
}

function renderUserName(){
    var name = document.getElementById("userN");
    if(userName == ""){
        name.innerText = "Javascript";
    } else {
       name.innerText = userName;   
    }
}

function checkEnterKey(event) {
    var keyP = event.key;
    if (keyP == "Enter"){ //Enter key
        saveSettings();
    }
}