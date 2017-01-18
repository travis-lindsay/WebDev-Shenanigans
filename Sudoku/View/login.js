

function init() {
    var login = document.getElementById("loginBt");
    login.addEventListener('click', renderLogin, false);
    var user = document.getElementById("tInput");
    var pass = document.getElementById("pInput");
    var cancel = document.getElementById("cancel");
    var loginBt = document.getElementById("login");
    user.addEventListener("focus", textFocus, false);
    user.addEventListener("blur", textBlur, false);
    user.addEventListener("keydown", checkEnterKey, false);
    pass.addEventListener("keydown", checkEnterKey, false);
    cancel.addEventListener("click", renderLogin, false);
    loginBt.addEventListener("click", login, false);
    
}
window.onload = init; //add event listener to execute init once the page is loaded

function renderLogin() {
    var setMenu = document.getElementById("setC");
    
    if(setMenu.style.display == "block"){
        var errorSpan = document.getElementById("errorMsg");
        if(errorSpan.innerText != ""){
            errorSpan.innerText = "";
        }
        setMenu.style.display = "none";
    }
    else{
        setMenu.style.display = "block";
    }
   
}

function textFocus() {
    var textInput = document.getElementById("tInput");
    if(textInput.value == "e.g. Harpo"){
     textInput.value = "";   
    }
    textInput.style.color = "black";
}

function textBlur() {
    var textInput = document.getElementById("tInput");
    if(textInput.value == ""){
        textInput.value = "e.g. Harpo";
        textInput.style.color = "gray";
    }
}

function login() {
    var userName = document.getElementById("tInput").value;
    var passWord = document.getElementById("pInput").value;
    var dataToSend = "userName=" + userName +"&password=" + passWord;
   var localRequest = new XMLHttpRequest();
    //Set up SYNCHRONOUS AJAX request
    localRequest.open("POST", "http://universe.tc.uvu.edu/cs2550/assignments/PasswordCheck/check.php", false);
    localRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    localRequest.send(dataToSend);
    //Data won't be 200 if request if for a local file
    if(localRequest.status == 200){
        var responseJson = JSON.parse(localRequest.responseText);
        if(responseJson["result"] == "invalid"){ //if the response was invalid
            displayLoginError();
        }
        else{
            //Store the log-in info string in local storage with the key cs2550timestamp
            //make a log-in info string that is a concatentation of the user log-in name, a space, and the timestamp
            var locSto = responseJson["userName"] + " " + responseJson["timestamp"];
            localStorage.setItem("cs2550timestamp", locSto);
            //then load the game grid page
            window.location.assign("GameGrid.html");
        }
        
	//alert("Your username is: " + responseJson["userName"]);
    }
    else {
        //display some sort of error
        displayLoginError();
    }
   //http://universe.tc.uvu.edu/cs2550/assignments/PasswordCheck/check.php
}

function displayLoginError(){
    var errorSpan = document.getElementById("errorMsg");
    errorSpan.innerHTML = "Username or Password incorrect";
    //alert("login error");
}

function checkEnterKey(event) {
    var keyP = event.key;
    if (keyP == "Enter"){ //Enter key
        login();
    }
}