//Global variables...
var selectedNumber;
var numErrors = 0;
var maxNumErrors = 3;
var numHints = 0;
var maxNumHints = 3;
var numRows = 9;
var numColumns = 9;
var runningGameInfo;
var currentTime = "00:00";
var selectedRow = 0;
var selectedColumn = 0;
//End global variables



function pickGame() {
    //Decide which button was picked
    // var newGame = {difficulty:"Easy", puzzleID:"puzzle1", puzzleLoadID:"puzzleToLoad1"};
    // numToWin:45 (easy original value)
    var gameMode = this.innerText;
    switch(gameMode) {
        case "Easy":
            var newGame = {difficulty:"Easy", numLeft:9, puzzleID:
               [[2, 4, 6, 8, 5, 7, 9, 1, 3],
               [1, 8, 9, 6, 4, 3, 2, 7, 5],
               [5, 7, 3, 2, 9, 1, 4, 8, 6],
               [4, 1, 8, 3, 2, 9, 5, 6, 7],
               [6, 3, 7, 4, 8, 5, 1, 2, 9],
               [9, 5, 2, 1, 7, 6, 3, 4, 8],
               [7, 6, 4, 5, 3, 2, 8, 9, 1],
               [3, 2, 1, 9, 6, 8, 7, 5, 4],
               [8, 9, 5, 7, 1, 4, 6, 3, 2]], 
                puzzleToLoad: 
               [[2, 4, 0, 0, 0, 7, 0, 0, 0],
               [1, 8, 9, 0, 0, 0, 2, 7, 5],
               [5, 0, 3, 0, 0, 1, 4, 0, 0],
               [0, 1, 0, 0, 2, 0, 0, 0, 7],
               [0, 0, 7, 0, 0, 0, 0, 2, 0],
               [9, 5, 0, 0, 0, 0, 3, 4, 0],
               [7, 0, 4, 0, 0, 2, 8, 9, 0],
               [3, 0, 0, 0, 0, 8, 0, 5, 0],
               [8, 0, 5, 7, 1, 4, 6, 0, 0]]};
            runningGameInfo = newGame;
            renderGame(newGame,numRows,numColumns);
            break;
        case "Medium":
            var newGame = {difficulty:"Medium", numLeft:9, puzzleID:
                [[8, 2, 7, 1, 5, 4, 3, 9, 6],
               [9, 6, 5, 3, 2, 7, 1, 4, 8],
               [3, 4, 1, 6, 8, 9, 7, 5, 2],
               [5, 9, 3, 4, 6, 8, 2, 7, 1],
               [4, 7, 2, 5, 1, 3, 6, 8, 9],
               [6, 1, 8, 9, 7, 2, 4, 3, 5],
               [7, 8, 6, 2, 3, 5, 9, 1, 4],
               [1, 5, 4, 7, 9, 6, 8, 2, 3],
               [2, 3, 9, 8, 4, 1, 5, 6, 7]], 
               puzzleToLoad: 
               [[0, 2, 0, 0, 0, 4, 3, 0, 0],
               [9, 0, 0, 0, 2, 0, 0, 0, 8],
               [0, 0, 0, 6, 0, 9, 0, 5, 0],
               [0, 0, 0, 0, 0, 0, 0, 0, 1],
               [0, 7, 2, 5, 0, 3, 6, 8, 0],
               [6, 0, 0, 0, 0, 0, 0, 0, 0],
               [0, 8, 0, 2, 0, 5, 0, 0, 0],
               [1, 0, 0, 0, 9, 0, 0, 0, 3],
               [0, 0, 9, 8, 0, 0, 0, 6, 0]]};
            runningGameInfo = newGame;
            renderGame(newGame,numRows,numColumns);
            break;            
        case "Hard":
            var newGame = {difficulty:"Hard", numLeft:9, puzzleID:
               [[1, 8, 7, 2, 6, 4, 9, 5, 3],
               [2, 6, 3, 5, 7, 9, 4, 8, 1],
               [4, 9, 5, 1, 8, 3, 7, 6, 2],
               [6, 7, 2, 3, 9, 8, 5, 1, 4],
               [3, 1, 9, 4, 2, 5, 8, 7, 6],
               [5, 4, 8, 6, 1, 7, 3, 2, 9],
               [8, 2, 4, 7, 3, 1, 6, 9, 5],
               [9, 3, 1, 8, 5, 6, 2, 4, 7],
               [7, 5, 6, 9, 4, 2, 1, 3, 8]], 
                puzzleToLoad:
               [[1, 8, 0, 0, 0, 4, 0, 0, 0],
               [0, 0, 0, 0, 7, 0, 4, 0, 0],
               [0, 9, 0, 0, 8, 0, 7, 0, 0],
               [6, 0, 2, 0, 0, 8, 0, 0, 0],
               [0, 0, 0, 0, 0, 0, 0, 0, 0],
               [0, 0, 0, 6, 0, 0, 3, 2, 9],
               [0, 0, 4, 0, 3, 0, 6, 0, 5],
               [0, 0, 0, 0, 5, 0, 2, 4, 0],
               [0, 0, 0, 9, 0, 0, 0, 0, 0]],  
                          }
            runningGameInfo = newGame;
            renderGame(newGame,numRows,numColumns);
            break;
    }

}


function init() {
    'use strict'; //makes me write better code
    
    //Start the menu
    renderStartMenu();
    
}

window.onload = init; //add event listener to execute init once the page is loaded



                                                            
function checkValidNumber() {
        //Set the row and column variables
        updateCordDisplay(this);
    
         if(selectedNumber != null)
         {
               var tempCell = this.cellIndex;
               var tempRow = this.parentElement.sectionRowIndex;
               if (runningGameInfo.puzzleID[tempRow][tempCell] == selectedNumber)
                   {
                       correctNumber(this);
                   }
                else {
                    wrongNumber(this);
                }
         }
                        
}

function giveHint() {
    //define the table variable
    var myTable = document.getElementById("sudokuGameTable");
    //Check to see if the number of hints has hit its limit
    if(numHints >= maxNumHints)
        return; //Just do nothing
    
    var hintNumberX = Math.floor((Math.random() * 8) + 0);
    var hintNumberY = Math.floor((Math.random() * 8) + 0);
    
    //Try the value in the table, if it already has a value, try again
    while(myTable.rows[hintNumberX].cells[hintNumberY].innerText != "") {
        
        hintNumberX = Math.floor((Math.random() * 8) + 0);
        hintNumberY = Math.floor((Math.random() * 8) + 0);
    }
    
    //Enter the given hint into the sudoku table
    myTable.rows[hintNumberX].cells[hintNumberY].innerText = runningGameInfo.puzzleID[hintNumberX][hintNumberY];
    
    //Set the cell to not be 'hoverable'
    myTable.rows[hintNumberX].cells[hintNumberY].classList.remove("emptyCell");
    
    //Temporarily highlight the hint-generated number, so the user knows they got something out of it
    myTable.rows[hintNumberX].cells[hintNumberY].classList.add("sameCellHighlight");
    myTable.rows[hintNumberX].cells[hintNumberY].id = "hintHighlight";
    
    //Wait a bit, then remove the highlighting
        setTimeout(function(){  
            //now reset the cell
            myTable.rows[hintNumberX].cells[hintNumberY].id = "";
            myTable.rows[hintNumberX].cells[hintNumberY].classList.remove("sameCellHighlight");
        },1500);
    //runningGameInfo.numToWin++;
    //Set another checkMark
    setCheckMark();
    
}

function setCheckMark() { //For the hint marks
    var hintChecks = document.getElementById("hintChecks");
    //If find the next <span> tag that doesn't have an id, and set it to have the checksGone id
    var childChecks = hintChecks.children;
    var count = 0;
    while(childChecks[count].classList.length == 0)
        {
            count++;
        }
     childChecks[count].classList.remove("checksGone");
    numHints++; //Increment the number of used hints
    
}

function setXMark() { //For the error marks
    var errorChecks = document.getElementById("errorChecks");
    //If find the next <span> tag that doesn't have an id, and set it to have the checksGone id
    var childChecks = errorChecks.children;
    var count = 0;
    while(childChecks[count].classList.length == 0)
        {
            count++;
        }
     childChecks[count].classList.remove("checksGone");
    numErrors++; //Increment the number of used Freeby-Errors
    
}

function correctNumber(myCell) {
    //Play sound
    document.getElementById("clickSound").play();
    //Update the cells class to be unhoverable
    myCell.classList.remove("emptyCell");
    //Highlight green if it is the right number
    myCell.innerText = selectedNumber;
    myCell.id = "sameNumberHighlight";
    myCell.classList.add("sameCellHighlight");
    
    //Count the number of filled in numbers of the current selected number
    if(countSelectedNum() == 9) {
        var tempNum = selectedNumber;
        animateCompleteNum(); //Animates screen, showing that user completed all of one of the numbers
        runningGameInfo.numLeft--; //decrement the number of numbers 1-9 left to complete
        setTimeout(function(){ 
        setNextUncompleteNum(tempNum); //Highlights the next "uncomplete" number
        },3000);
    }
    
    //Decrement the number of spaces left before the puzzle is complete
    //runningGameInfo.numToWin--;
    if(runningGameInfo.numLeft == 0) {
        if(complete == true){
            gameWin();
        }
        else {
            setTimeout(function(){  
                gameWin();
            },3000);
        }
    }
        
        
       
}

function setNextUncompleteNum(num){ //called after a number has been completed, auto-selects the next number 1-9 that is uncomplete
    //var num = selectedNumber;
    var nums = document.getElementById("nums");
    for (var i = 0; i < 9; i++){
        if(num >= 9){ //this allows it to check the numbers after the selected number first, then cycle back
            num -= 9;
        }
        if(nums.children[num].className != "buttonDisabled"){
            //if the button doesn't have a buttonDisabled class, select it!
            setSelectedNumber(nums.children[num].innerText);
            nums.children[num].className = "buttonClicked";
            setSelectedCursor(selectedNumber);
            highlightSameNums(selectedNumber);
            break; //get out of here, if the next button has been selected
        }
        num++;
    }
}

function countSelectedNum() {
    var num = 0; //To track the current number of the selectedNumber
    var myTable = document.getElementById("sudokuGameTable");
    for (var i = 0; i < 9; i++){
        for (var j = 0; j < 9; j++){
            if((myTable.rows[i].cells[j].innerText == selectedNumber) && (myTable.rows[i].cells[j].classList.contains("wrongNumberHighlight") != true)){
                num++; //if the numbers match, increment the num variable
            }
        }
    }
    return num;
}

function gameWin() {
    //Unhighlight number
    selectedNumber = "";
    //Reset the number bar highlighting
    var elems = document.getElementById("nums").children;
    
    //find and change the already highlighted buttons if any
    for (var i = 0; i < elems.length; i++)
    {
        if(elems[i].id != "time" && elems[i].id != "time1")
            {
                elems[i].className = "button1";
            }
    }
    //Change the highlighted cells
        var myTable = document.getElementById("sudokuGameTable");
    
     for (var i = 0; i < 9; i++) {
         
         for (var j = 0; j < 9; j++)
             {
                 //This is to reset the currently highlighted cells, if any
                 if(myTable.rows[i].cells[j].id == "sameNumberHighlight")
                            {
                                myTable.rows[i].cells[j].id = "";
                                if (myTable.rows[i].cells[j].classList.contains("sameCellHighlight"))
                                    {
                                        myTable.rows[i].cells[j].classList.remove("sameCellHighlight");
                                    }
                            }
             }
     }
    //Pause clock
    pause();
    //Get time value
    var timeVar = document.getElementById("time");
    var totalTime = timeVar.innerText;
    
    //render the game win panel
      renderGameWinTiles(totalTime);
          

}



function gameLose() {
    //Select the empty squares, and give them the same background as an errored td
    var numRemainingSquares = 0;
    var incompleteNums = document.getElementsByTagName("td");
    for (var i = 0; i < incompleteNums.length; i++ )
        {
            if (incompleteNums[i].innerText == "")
                {
                    incompleteNums[i].classList.add("loseGameHighlight");
                    numRemainingSquares++;
                }
                
        }
    //Unhighlight number
    selectedNumber = "";
    //Reset the number bar highlighting
    var elems = document.getElementById("nums").children;
    
    //find and change the already highlighted buttons if any
    for (var i = 0; i < elems.length; i++)
    {
        if(elems[i].id != "time" && elems[i].id != "time1")
            {
                elems[i].className = "button1";
            }
    }
    //Change the highlighted cells
        var myTable = document.getElementById("sudokuGameTable");
    
     for (var i = 0; i < 9; i++) {
         
         for (var j = 0; j < 9; j++)
             {
                 //This is to reset the currently highlighted cells, if any
                 if(myTable.rows[i].cells[j].id == "sameNumberHighlight")
                            {
                                myTable.rows[i].cells[j].id = "";
                                if (myTable.rows[i].cells[j].classList.contains("sameCellHighlight"))
                                    {
                                        myTable.rows[i].cells[j].classList.remove("sameCellHighlight");
                                    }
                            }
             }
     }
    //Pause clock
    pause();
    //Get time value
    var timeVar = document.getElementById("time");
    var totalTime = timeVar.innerText;
    
    //render the game lose panel
    renderGameLose(numRemainingSquares, totalTime);
    
    //alert("You lose!");
}


function wrongNumber(myCell) {
    //So that you can't overwrite already filled cells on accident
    if(myCell.innerText != "")
        return;
    
    //Play sound
    document.getElementById("cowSound").play();
    
    myCell.innerText = selectedNumber;
    myCell.classList.add("wrongNumberHighlight");
    
    //This sets a timeout so that you can see the previous highlighting for 
    //a bit before the highlighting css is taken away
    setTimeout(function(){  
        //now reset the cell
        myCell.innerText = "";
        myCell.classList.remove("wrongNumberHighlight");
       //checks for loseEnabled and the number of errors
        if((numErrors >= maxNumErrors)&&(loseEnabled == true)) //Check to see if they have lost (exceeded the number of allowed errors)
            gameLose();
    },2500);
  if(loseEnabled == true){
       setXMark(); //Only set the X mark if Lose is enabled
  }
 
  
}

function changeBtClicked() {
    
    'use strict';
            
            
    var elems = document.getElementById("nums").children;
    
    //find and change the already highlighted buttons if any
    for (var i = 0; i < elems.length; i++)
    {
        if(elems[i].id != "time" && elems[i].id != "time1" && elems[i].className != "buttonDisabled")
            {
                elems[i].className = "button1";
            }
    }
    
    this.className = "buttonClicked";
    //Set the selected number to the selectedNumber variable
    setSelectedNumber(this);
    setSelectedCursor(this);
    highlightSameNums(this);
    
}

function setSelectedCursor(num){ //Sets the cursor png to match the selected number
    var myTable = document.getElementById("sudokuGameTable");
    
    
    
     for (var i = 0; i < 9; i++) {
         
         for (var j = 0; j < 9; j++)
             {
                 if(num == null) {
                     myTable.rows[i].cells[j].style.cursor = "default"
                 }
                 else{
                   //myTable.rows[i].cells[j].style.cursor = "url('././IMG/num"+selectedNumber+".png'), pointer";
                   //For IE / Edge .ico or .cur file must be used
                   myTable.rows[i].cells[j].style.cursor = "url('././IMG/num"+selectedNumber+".ico'), pointer";   
                 }
                
             }
     }

        
    
}

//Sets the selected number to the selectedNumber text
function setSelectedNumber(num){
    if(num.innerText == undefined){
        selectedNumber = num;
    }
    else {
         selectedNumber = num.innerText;
    }
}

//Updates the last cell that was clicked, for assignment 4
function updateCordDisplay(c) {
    selectedColumn = c.cellIndex;
    selectedRow = c.parentNode.rowIndex;
    var rowVal = document.getElementById("lastRow");
    var colVal = document.getElementById("lastCol");
    rowVal.innerText = selectedRow;
    colVal.innerText = selectedColumn;
}