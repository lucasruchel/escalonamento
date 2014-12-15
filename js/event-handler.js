
var btnQuantum = document.querySelector("#add-quantum");
var btnAddProcess = document.querySelector("#add-process");
var btnExecute = document.querySelector('#execute');
	
	//Show Process properties on a table
	tableData = document.querySelector("#processData");

	//counter of process entries
	cont = 0;

btnQuantum.addEventListener('click',function(){
	var checkQuantum = document.querySelector('#quantum-time').value;

	if (!isNaN(checkQuantum)){
		quantum	= parseInt(checkQuantum);
	}
	 else{
	 	document.querySelector(".cpu-time-field .alert").classList.add("alert-error");
	}
});

btnAddProcess.addEventListener('click',function(){
	var checkPrority = document.querySelector('#priority').value;
	var checkBurst = document.querySelector('#burst-time').value;

	if  ((!isNaN(checkBurst)) && (!isNaN(checkPrority))) {
		priority = parseInt(checkPrority);
		burstTime = parseInt(checkBurst);
		var process = new Process(++cont,priority,burstTime);
		processList.push(process);
		addTableData(process);
	}
	 else{
	 	document.querySelector(".process-create-field .alert").classList.add("alert-error");
	}
});
function addTableData(processData){
	tableData.innerHTML += "<tr>" + "<td>" + processData.insertedPosition + "</td>" + "<td>" + processData.priority + "</td>" + "<td>"+ processData.burstTime+ "</td>"+ "</tr>"
}

btnExecute.addEventListener('click', function(){
	var operations = document.querySelectorAll(".algorith-option:checked");
	
	for (var i=0; i < operations.length ; i++){
		if (operations[i].name == "srtn")
			shortestRemainTimeNext();
		else if (operations[i].name == "rr")
			roundRobin();
		else if (operations[i].name == "fcfs"){

			firstComeFirstServed();
			
		}
		else if (operations[i].name == "sjf")
			shortestJobFirst();
	}
});