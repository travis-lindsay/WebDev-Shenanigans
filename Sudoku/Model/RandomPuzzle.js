//Sudoku game object starting point
    var sudokuSlate = 
               [[0, 0, 0, 0, 0, 0, 0, 0, 0],
               [0, 0, 0, 0, 0, 0, 0, 0, 0],
               [0, 0, 0, 0, 0, 0, 0, 0, 0],
               [0, 0, 0, 0, 0, 0, 0, 0, 0],
               [0, 0, 0, 0, 0, 0, 0, 0, 0],
               [0, 0, 0, 0, 0, 0, 0, 0, 0],
               [0, 0, 0, 0, 0, 0, 0, 0, 0],
               [0, 0, 0, 0, 0, 0, 0, 0, 0],
               [0, 0, 0, 0, 0, 0, 0, 0, 0]];
//array of available column numbers
    var availableColumns = 
            [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
             [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
             [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
             [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
             [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
             [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
             [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
             [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
             [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],];
//array of available row numbers
    var availableRows = 
            [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
             [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
             [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
             [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
             [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
             [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
             [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
             [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
             [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],];
//array of available grid numbers
    var availableGrids = 
            [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
             [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
             [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
             [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
             [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
             [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
             [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
             [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
             [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],];

var itWorked = false;
var grid = 0;

function randomGeneration(){
    //This is very much a beta function, on how to randomly generate a puzzle
    
    //Randomly generate a valid table
    //For loop for entire table
    for(var i = 0; i < 9; i++){ //loop for rows
        
        for(var j = 0; j < 9; j++){ //loop for columns, (cells)
            //Try a random number
            itWorked = false; //reset var
            while(itWorked == false){
                itWorked = tryNumber(i, j, randomNumGen(9));
            }
        }
    }
    
    
    //Check row available nums()
    
    
    //Check 3x3 grid()
    
    //Check Up and down available nums()
    
    
    //Take some numbers away
    
    
}

//Function to kick off all the checking nonsense
function tryNumber(row, col, number){
    //Vars to determine whether the number can be placed in the grid
    var rowBool = false;
    var colBool = false;
    var gridBool = false;
    //Check the numbers
    rowBool = checkRow(row, number);
    colBool = checkCol(col, number);
    gridBool = checkGrid(row, col, number);
    
    if((rowBool == true) && (colBool == true) && (gridBool == true)){
        //set the value of that array to zero
        availableRows[row][number] = 0;
        availableColumns[col][number] = 0;
        availableGrids[grid][number] = 0;
        setNum(row, col, number);
    }
    else{
        if((rowBool == false) && (colBool == false) && (gridBool == false)){
            //breakpoint
            return false;
        }
        return false; //default return
    }
}

//Generates random number 1-9
//accept parameters for how big the array is of available numbers, index
function randomNumGen(index){
    var num = Math.floor((Math.random() * index) + 1);
    return num;
}

//Checks valid numbers available in row, returns true if that number is available
function checkRow(row, number){
    if(availableRows[row][number] != 0){ 
        return true;
    }
    else{
        return false;   
    }
}

//Checks valid numbers available in column, returns true if that number is available
function checkCol(col, number){
    if(availableColumns[col][number] != 0){
        return true;
    }
    else{
        return false;   
    }
}

//Checks valid numbers available in grid, returns true if that number is available
function checkGrid(row, col, number){
    //get the grid index
    grid = whatGridIsThis(col, row);
    if(availableGrids[grid][number] != 0){
        return true;
    }
    else{
        return false;   
    }
}

//Sets the number in the randomly generated puzzle, based on the row and col passed in
function setNum(row, col, num){
    sudokuSlate[row][col] = num;
}

//Function checks and returns which grid, (index of grid), that the cell belongs to
//Pretend the grids are numbered 0-8 starting from top left
//function first checks to see which row it is in, then passes starting number of grid index to inner function
//
// GRID REPRESENTATION, (real implementation is just an array of 9 arrays containing numbers 1-9)
// ___________________
// |     |     |     |
// |  0  |  1  |  2  |
// |     |     |     |
// -------------------
// |     |     |     |
// |  3  |  4  |  5  |
// |     |     |     |
// -------------------
// |     |     |     |
// |  6  |  7  |  8  |
// |     |     |     |
// -------------------
//
function whatGridIsThis(col, row){
    var returnNum;
    if(row < 3){
        whatGridCol(0);
    }
    else if((row > 3) && (row < 6)){
        whatGridCol(3);
    }
    else{ //must be between 6-8
        whatGridCol(6);
    }
            
    function whatGridCol(rowNumber){ //nested function, takes the rowNumber and increments grid index returned based on its location
        if(col < 3){
            returnNum = rowNumber;
        }
        else if((col > 3) && (col < 6)){
            returnNum = (rowNumber + 1);
        }
        else{ //must be between 6-8
            returnNum = (rowNumber + 2);
        }
    } //end function
    return returnNum;        
}