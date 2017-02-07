function init() {
    //Set the eventListener for the Run Jira button
    //document.getElementById("JiraAgent").addEventListener("click", runJiraAgent, false);
    //document.getElementById("dateTime").addEventListener("mouseover", displayLastRefreshed, false);
    //document.getElementById("dateTime").addEventListener("mouseleave", displayDateTime, false);
    
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
    myCallback(this);
    }
  };
  xhttp.open("GET", "https://app.mozenda.com/rest?WebServiceKey=FF2EBAE5-D535-4546-8FED-49AD29CD7DDD&Service=Mozenda10&Operation=View.GetItems&ViewID=1145", true);
  xhttp.send();

}

window.onload = init(); //run this function upon loading the page

$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip();   
});
//API call for the agent data from testapp
//https://testapp.mozenda.com/rest?WebServiceKey=A3F23DB6-7485-4F86-BE15-7E32D10BE0AA&Service=Mozenda10&Operation=View.GetItems&ViewID=1000
//API call for agent on Production
//https://app.mozenda.com/rest?WebServiceKey=FF2EBAE5-D535-4546-8FED-49AD29CD7DDD&Service=Mozenda10&Operation=View.GetItems&ViewID=1145

function myCallback(xml) {
  var number = "";
  var status = "";
  var employee = "";
  var xmlDoc = xml.responseXML;
  var x = xmlDoc.getElementsByTagName("Item");
  for (var i = 0; i <x.length; i++) { 
    //table += "<tr><td class=\"name\">" + x[i].getElementsByTagName("Employee")[0].childNodes[0].nodeValue + "</td>";
    // += "<td>" + x[i].getElementsByTagName("Status")[0].childNodes[0].nodeValue + "</td>";
    //table += "<td>" + x[i].getElementsByTagName("Number")[0].childNodes[0].nodeValue + "</td>";
      employee = x[i].getElementsByTagName("Employee")[0].childNodes[0].nodeValue;
      status = x[i].getElementsByTagName("Status")[0].childNodes[0].nodeValue;
      try{
          number = x[i].getElementsByTagName("Number")[0].childNodes[0].nodeValue;
      }
      catch(err){
          number = 0;
        }
      checkEmployee(employee, status, number); //parse all the data from the xml response and put it in the appropriate table cells
      checkEmployee2(employee, status, number); //parse data for the second table
  }
          setTimeout(function()
                 { getTotals(); //now calculate the totals
                   getLastRunTime(); //Get the date-time that the agent was last run
                 }, 1500);
}//end of callback function

function checkEmployee(employee, status, number){
    var index = 0;
    
    switch(employee) {
    case "mike":
        row = document.getElementById("qa1"); 
        index = getIndexFromStatus(status);
        if(index != 0)
            row.children[index].innerText = number;
        break;
    case "nathan":
        row = document.getElementById("qa2"); 
        index = getIndexFromStatus(status);
        if(index != 0)
            row.children[index].innerText = number;
        break;
    case "brian":
        row = document.getElementById("qa3"); 
        index = getIndexFromStatus(status);
        if(index != 0)
            row.children[index].innerText = number;
        break;
    case "travis":
        row = document.getElementById("qa4"); 
        index = getIndexFromStatus(status);
        if(index != 0)
            row.children[index].innerText = number;
        break;
    default:
        console.log("something broke in the data feed");
        break;
    }//end switch
} //end of checkEmployee function

function checkEmployee2(employee, status, number){
    var index = 0;
    
    switch(employee) {
    case "mike":
        row = document.getElementById("qa12"); 
        index = getIndexFromStatus2(status);
        if(index != 0)
            row.children[index].innerText = number;
        break;
    case "nathan":
        row = document.getElementById("qa22"); 
        index = getIndexFromStatus2(status);
        if(index != 0)
            row.children[index].innerText = number;
        break;
    case "brian":
        row = document.getElementById("qa32"); 
        index = getIndexFromStatus2(status);
        if(index != 0)
            row.children[index].innerText = number;
        break;
    case "travis":
        row = document.getElementById("qa42"); 
        index = getIndexFromStatus2(status);
        if(index != 0)
            row.children[index].innerText = number;
        break;
    default:
        console.log("something broke in the data feed");
        break;
    }//end switch
} //end of checkEmployee function

function getIndexFromStatus(status){
    //Returns the index of the cell that the value will be placed in based on the status
    switch(status){
        case "hold":
            return 1;
            break;
        case "low":
            return 2;
            break;
        case "medium":
            return 3;
            break;
        case "high":
            return 4;
            break;
        case "critical":
            return 5;
            break;
        case "customer":
            return 6;
            break;
        case "duplicate":
            return 7;
            break;
        default:
            return 0; //Don't do anything
            break;
    }//end switch
} //end of getIndexFromStatus

function getIndexFromStatus2(status){
    //Returns the index of the cell that the value will be placed in based on the status
    switch(status){
        case "hold":
            return 1;
            break;
        case "low2017":
            return 2;
            break;
        case "medium2017":
            return 3;
            break;
        case "high2017":
            return 4;
            break;
        case "critical2017":
            return 5;
            break;
        case "customer2017":
            return 6;
            break;
        case "duplicate2017":
            return 7;
            break;
        default:
            return 0; //don't do anything
            break;
    }//end switch
} //end of getIndexFromStatus

//*********************************Global Variables and such************************************
//Current point values by priority
var subMagnifier = 0;
var lowMagnifier = 1;
var medMagnifier = 2;
var highMagnifier = 3;
var critMagnifier = 4;
var custMagnifier = 5;
var dupMagnifier = -2;
var magnifierArray = [subMagnifier, lowMagnifier, medMagnifier, highMagnifier, critMagnifier, custMagnifier, dupMagnifier];
var numCategories = 7; // the number of categories, (e.g. low, med, high, etc)
var dateTime;


function getTotals(){
    //var row = document.getElementById("qa1");
    //var totalCell = document.getElementById("qa1total");
    var idArray1 = ["qa1", "qa2", "qa3", "qa4", "qa12", "qa22", "qa32", "qa42"];
    var totalsArray = ["qa1total", "qa2total", "qa3total", "qa4total", "qa12total", "qa22total", "qa32total", "qa42total"];
    var pointsArray = ["qa1points", "qa2points", "qa3points", "qa4points", "qa12points", "qa22points", "qa32points", "qa42points"];
    for(var i = 0; i < idArray1.length; i++)
        {
            addBugs(document.getElementById(idArray1[i]), document.getElementById(totalsArray[i]));
            addPoints(document.getElementById(idArray1[i]), document.getElementById(pointsArray[i]));
        }
}

function addBugs(row, totalCell){
    var total = 0; //end calculated amount
    
    for(var i = 1; i < (numCategories +1); i++){
        total += parseInt(row.children[i].innerText);
    }
    totalCell.innerText = total;
    
}

function addPoints(row, pointsCell){
    var total = 0; //end calculated amount
    //calculate based on the global magnifier variables
    for(var i = 1; i < (numCategories +1); i++){
        //add the number in the cell multiplied by its point value to the total
        total += (parseInt(row.children[i].innerText) * magnifierArray[i-1]);
    }
    pointsCell.innerText = total; //place total in the given cell
}

function getLastRunTime(){
    //https://app.mozenda.com/rest?WebServiceKey=FF2EBAE5-D535-4546-8FED-49AD29CD7DDD&Service=Mozenda10&Operation=Job.GetList&Job.State=Archived
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
        theCallback(this);
        }
    };
    xhttp.open("GET", "https://app.mozenda.com/rest?WebServiceKey=FF2EBAE5-D535-4546-8FED-49AD29CD7DDD&Service=Mozenda10&Operation=Job.GetList&Job.State=Archived", true);
    xhttp.send();
}

function theCallback(xml){
        var xmlDoc = xml.responseXML;
        var nodes = xmlDoc.getElementsByTagName("Job");
        for (var i = 0; i <nodes.length; i++) { 
            if(nodes[i].getElementsByTagName("JobRestriction")[0].childNodes[0].nodeValue == "atlassian.net"){
                // If it is from Jira, the first one will be the most recent
                document.getElementById("dateTime").innerText = nodes[i].getElementsByTagName("Created")[0].childNodes[0].nodeValue;
                break; //we only want the first one
            }
            else {
                //Else, something has gone terribly wrong... The schedule for the agent has probably broken
                console.warn("The schedule of the agent is most likely broken");
            }
        
        }
    }

//function runJiraAgent(){
    //alert("yup");
    
/*    https://api.mozenda.com/rest?WebServiceKey=FF2EBAE5-D535-4546-8FED-49AD29CD7DDD&Service=Mozenda10&Operation=Agent.Run&AgentID=1123
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "https://api.mozenda.com/rest?WebServiceKey=FF2EBAE5-D535-4546-8FED-49AD29CD7DDD&Service=Mozenda10&Operation=Agent.Run&AgentID=1123", true);
    xhttp.send();*/
    
    
//}

$('#JiraAgent').on('click', function () {
    $(this).button('toggle')
    //$(this).button.value = "Loading...";
    this.innerText = "Queued...";
    // business logic...
    //$btn.button('reset')
    })

function displayLastRefreshed(){
    var node = document.getElementById("dateTime");
    dateTime = node.innerText;
    node.innerText = "Last Refreshed...";
}

function displayDateTime(){
    var node = document.getElementById("dateTime");
    node.innerText = dateTime;
}

$('#TotalTable').on('hidden.bs.collapse', function () {
  // do something…
    alert("it happened");
    console.log("it happened");
})