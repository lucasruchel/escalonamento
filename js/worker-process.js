//Creating working objects
Process = function(insertedPosition,priority,burstTime){
	//Identify insertion position like an id
	this.insertedPosition = insertedPosition;
	//setted when is necessary an algorith ordered by priority
	this.priority = priority;
	//set the time used by the process to perform the operation required
	this.burstTime = burstTime;
	//total executed time
	this.executedTime = 0;

	this.lastExecutedTime = 0;
}

//This variable will storage the process 
//global instanced objects
//Use the defaults methods to push and pop elements like an generic List in JAVA
processList = [];

Array.prototype.clone = function(){
	var temp = [];

	for (var i=0; i < this.length; i++) {
		temp.push(new Process(this[i].insertedPosition,this[i].priority,this[i].burstTime));
	};
	return temp;
};
Array.prototype.haveAlive = function(){
	for (var i=0; i < this.length; i++) {
		if(this[i].burstTime>0)
			return true;
	};
	return false;
}

//Necessario executar o quantum de CPU utilizando uma fila FIFO
function roundRobin(){
	//Seleciona o elemento que irá armazenar as informações
	var tableProcessData = document.querySelector("#rrData");
	//Atribuicao da lista para implementar o rr, copia da lista principal
	var processList_rr = processList.clone();
	//Tempo de espera
	var averageWait = 0;
	//Contador de Execucoes
	var cont=0;
	//Atributo para verificar se existe algum objeto ativo na lista rr
	var processAlive;
	//limpa o campo que armazena as informações
	tableProcessData.innerHTML = "";
	//Inicio o loop sem testar condicao alguma
	var lastIndex = 0;
	var indexTemp = 0;
	do{
		//Atribui inicialmente falso aos processos ativos
		processAlive=false;
		//percorre a lista por todo seu comprimento
		for(var i=0; i<processList_rr.length; i++){
			//Caso a lista não esteja com a posicao i nula entra no if
			if(processList_rr[i].burstTime > 0){
				//seta o atributo de processo ativo até que o loop do-while tenha sido concluido
				processAlive=true;
				
				cont++;
				
				//Testa se o tempo de burst vai ser maior que o do quantum, para o valor da subtracao não seja negativa
				if(processList_rr[i].burstTime-quantum > 0){
					//Subtrai o valor do quantum do tempo de burst do processo
					processList_rr[i].burstTime -= quantum;
					//processList_rr[i].executedTime += quantum;

					//Adiciona na tabela os dados do processo
					addRow(tableProcessData,cont,processList_rr[i].insertedPosition,processList_rr[i].priority,processList_rr[i].burstTime,averageWait);

					
					
					if(lastIndex != processList_rr[i].insertedPosition){
						averageWait += quantum;
						lastIndex = processList_rr[i].insertedPosition
					}
				//Caso o tempo de burst restante do processo seja menor ou igual ao do quantum	
				}else{
					//Atribui 0 a tempo de burst do processo.
					var temp = processList_rr[i].burstTime;
					processList_rr[i].executedTime += processList_rr[i].burstTime;
					processList_rr[i].burstTime = 0;
					processList_rr[i].lastExecutedTime = averageWait
					//Adiciona na tabela os dados do processo
					addRow(tableProcessData,cont,processList_rr[i].insertedPosition,processList_rr[i].priority,processList_rr[i].burstTime,averageWait);
					//Se o tempo do quantum for maior do que é necessario para ser executado entao o tempo de espera é o mesmo que o de burst

					

					if(lastIndex == processList_rr[i].insertedPosition){
						
						
					}else{
						lastIndex = processList_rr[i].insertedPosition;
						averageWait += temp; 
					}
					
				}
			}
		}
	//Caso nenhum processo esteja ativo (processAlive==false) então saia do laço
	}while(processAlive);
}
//Necessario ordenar por prioridade
function priorityScheduler(){
	var tableProcessData = document.querySelector("#prioritySchedulerData");
	var processList_ps = processList.clone();
	var averageWait = 0;
	//Contador de Execucoes
	var cont=0;
	//Atributo para verificar se existe algum objeto ativo na lista rr
	var processAlive;
	//limpa o campo que armazena as informações
	tableProcessData.innerHTML = "";

	processList_ps.sort(sortByPriority);

	for(var i=0 ; i < processList_ps.length ; i++){
		addRow(tableProcessData,i,processList_ps[i].insertedPosition,processList_ps[i].priority,processList_ps[i].burstTime,averageWait);
		if ( i<processList_ps.length-1 ) {
			averageWait += processList_ps[i].burstTime;	
		};
	}
	showAverage(tableProcessData,averageWait,processList_ps.length);
}
function shortestJobFirst(){
	var tableProcessData = document.querySelector("#sjfData");
	var processList_sjf = processList.clone();
	var averageWait = 0;
	var lastIndex = false;
	var temp=0;
	//Contador de Execucoes
	var cont=0;
	//Atributo para verificar se existe algum objeto ativo na lista rr
	var processAlive;
	//limpa o campo que armazena as informações
	tableProcessData.innerHTML = "";

	processList_sjf.sort(sortByBurst);

	for(var i=0 ; i < processList_sjf.length ; i++){
		addRow(tableProcessData,i,processList_sjf[i].insertedPosition,processList_sjf[i].priority,processList_sjf[i].burstTime,averageWait);
		if ( i<processList_sjf.length-1 ) {
			averageWait += processList_sjf[i].burstTime;	
		};
	}
	showAverage(tableProcessData,averageWait,processList_sjf.length);
}
function firstComeFirstServed(){

	var tableProcessData = document.querySelector("#fcfsData");
	var averageWait=0;
	var processList_fcfs = processList.clone();
	//reset entry
	tableProcessData.innerHTML="";

	
	for(var i=0 ; i < processList_fcfs.length ; i++){
		addRow(tableProcessData,i,processList_fcfs[i].insertedPosition,processList_fcfs[i].priority,processList_fcfs[i].burstTime,averageWait);
		if ( i<processList_fcfs.length-1 ) {
			averageWait += processList_fcfs[i].burstTime;	
		};
		
	}
	showAverage(tableProcessData,averageWait,processList_fcfs.length);
}
//--------------- Output Functions -------------------------------------
function addRow(element,cont,id,priority,burstTime,averageWait){
		element.innerHTML += "<tr>"+"<td>" + cont +"</td>" +"<td>" + id +"</td>"+"<td>" + priority +"</td>"+"<td>" + burstTime +"</td>"+"<td>" + averageWait +"</td>"+ "</tr>";
}
function showAverage(element,maxTime,maxItens){
	element.innerHTML += "<tr><td colspan='"+element.parentNode.rows[0].cells.length+"'><h3>Tempo médio de Espera: "+maxTime/maxItens+"ms</h3></td></tr>";	
}
//----------------------------------------------------------------------
//--------------- Funções para ordenar elementos -----------------------

function sortByBurst(a,b){
	if(a.burstTime>b.burstTime)
	 	return (a.burstTime-b.burstTime);

	 return;
}
function sortByPriority(a,b){
	if(a.priority>b.priority)
		return (a.priority-b.priority);
	return;
}
//----------------------------------------------------------------------