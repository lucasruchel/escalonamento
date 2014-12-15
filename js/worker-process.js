//Creating working objects
Process = function(insertedPosition,priority,burstTime){
	//Identify insertion position like an id
	this.insertedPosition = insertedPosition;
	//setted when is necessary an algorith ordered by priority
	this.priority = priority;
	//set the time used by the process to perform the operation required
	this.burstTime = burstTime;
	//set average wait time 
	this.averageWait = 0;
}

//This variable will storage the process 
//global instanced objects
//Use the defaults methods to push and pop elements like an generic List in JAVA
processList = [];


function roundRobin(){
	var tableData = document.querySelector("#rrData");




}

function shortestRemainTimeNext(){
	alert("srtn");
}

function shortestJobFirst(){

}
function firstComeFirstServed(){

	var tableProcessData = document.querySelector("#fcfsData");
	var averageWait=0;
	//reset entry
	tableProcessData.innerHTML="";

	
	for(var i=0 ; i < processList.length ; i++){
		tableProcessData.innerHTML += "<tr>"+"<td>" + i +"</td>" +"<td>" + i +"</td>"+"<td>" + processList[i].priority +"</td>"+"<td>" + processList[i].burstTime +"</td>"+"<td>" + averageWait +"</td>"+ "</tr>";
		
		averageWait += processList[i].burstTime;
	}
}

