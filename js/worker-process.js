//Creating working objects
Process = function(insertedPosition,priority,burstTime){
	//Identify insertion position like an id
	this.insertedPosition = insertedPosition;
	//setted when is necessary an algorith ordered by priority
	this.priority = priority;
	//set the time used by the process to perform the operation required
	this.burstTime = burstTime;
}

//This variable will storage the process 
//global instanced objects
//Use the defaults methods to push and pop elements like an generic List in JAVA
processList = [];


function roundRobin(){
	var tableProcessData = document.querySelector("#rrData");
	var processList_rr = processList.slice(0);
	var averageWait = 0;
	var cont=0;
	var processAlive;
	do{
		processAlive=false;
		for(var i=0; i<processList_rr.length; i++){

			if(processList_rr[i] != null){
				processAlive=true;
				cont++;
				
				if(processList_rr[i].burstTime-quantum > 0){
					if(cont>1)
						averageWait += quantum;

					processList_rr[i].burstTime -= quantum;
					addRow(tableProcessData,cont,processList[i].insertedPosition,processList[i].priority,processList[i].burstTime,averageWait);
					
				}else{
					if(cont>0)
						averageWait += processList_rr[i].burstTime;

					processList_rr[i].burstTime = 0;
					addRow(tableProcessData,cont,processList[i].insertedPosition,processList[i].priority,processList[i].burstTime,averageWait);

					processList_rr[i] = null;
				}
			}
		}
	}while(processAlive);
}
function priorityScheduler(){
	var tableProcessData = document.querySelector("#srtnData");


}

function shortestJobFirst(){

}
function firstComeFirstServed(){

	var tableProcessData = document.querySelector("#fcfsData");
	var averageWait=0;
	//reset entry
	tableProcessData.innerHTML="";

	
	for(var i=0 ; i < processList.length ; i++){
		addRow(tableProcessData,i,processList[i].insertedPosition,processList[i].priority,processList[i].burstTime,averageWait);
		averageWait += processList[i].burstTime;
	}
}
function addRow(element,cont,id,priority,burstTime,averageWait){
		element.innerHTML += "<tr>"+"<td>" + cont +"</td>" +"<td>" + id +"</td>"+"<td>" + priority +"</td>"+"<td>" + burstTime +"</td>"+"<td>" + averageWait +"</td>"+ "</tr>";
}
