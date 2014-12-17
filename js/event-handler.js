
var btnQuantum = document.querySelector("#add-quantum");
var btnAddProcess = document.querySelector("#add-process");
var btnExecute = document.querySelector('#execute');
	quantum = 0;
	
	//Show Process properties on a table
	tableData = document.querySelector("#processData");

	//counter of process entries
	count = 0;

btnQuantum.addEventListener('click',function(){
	var checkQuantum = document.querySelector('#quantum-time').value;

	if (!isNaN(checkQuantum)){
		quantum	= parseInt(checkQuantum);
		alert("Quantum adicionado com sucesso!!");
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
		var process = new Process(++count,priority,burstTime);
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
	
	if (quantum==0){
		alert("defina um valor para o quantum");
		return;
	}else if(count<3){
		alert("Defina ao menos 3 elementos");
		return;
	}

	for (var i=0; i < operations.length ; i++){
		if (operations[i].name == "priorityScheduler")
			priorityScheduler();
		else if (operations[i].name == "rr")
			window.setInterval(roundRobin(),1000);
			
		else if (operations[i].name == "fcfs"){

			firstComeFirstServed();
			
		}
		else if (operations[i].name == "sjf")
			shortestJobFirst();
	}
});