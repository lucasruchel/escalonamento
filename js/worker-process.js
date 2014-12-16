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

//Necessario executar o quantum de CPU utilizando uma fila FIFO
function roundRobin(){
	//Seleciona o elemento que irá armazenar as informações
	var tableProcessData = document.querySelector("#rrData");
	//Atribuicao da lista para implementar o rr, copia da lista principal
	var processList_rr = processList.slice(0);
	//Tempo de espera
	var averageWait = 0;
	//Contador de Execucoes
	var cont=0;
	//Atributo para verificar se existe algum objeto ativo na lista rr
	var processAlive;
	//limpa o campo que armazena as informações
	tableProcessData.innerHTML = "";
	//Inicio o loop sem testar condicao alguma
	do{
		//Atribui inicialmente falso aos processos ativos
		processAlive=false;
		//percorre a lista por todo seu comprimento
		for(var i=0; i<processList_rr.length; i++){
			//Caso a lista não esteja com a posicao i nula entra no if
			if(processList_rr[i] != null){
				//seta o atributo de processo ativo até que o loop do-while tenha sido concluido
				processAlive=true;
				//incrementa o contador para uma execucao
				cont++;
				//Testa se o tempo de burst vai ser maior que o do quantum, para o valor da subtracao não seja negativa
				if(processList_rr[i].burstTime-quantum > 0){
					//Testa se não é a primeira execucao
					if(cont>1)
						averageWait += quantum;
					//Subtrai o valor do quantum do tempo de burst do processo
					processList_rr[i].burstTime -= quantum;
					//Adiciona na tabela os dados do processo
					addRow(tableProcessData,cont,processList[i].insertedPosition,processList[i].priority,processList[i].burstTime,averageWait);
				//Caso o tempo de burst restante do processo seja menor ou igual ao do quantum	
				}else{
					//Testa se não é a primeira execucao
					if(cont>0)
						//Se o tempo do quantum for maior do que é necessario para ser executado entao o tempo de espera é o mesmo que o de burst
						averageWait += processList_rr[i].burstTime; 
					//Atribui 0 a tempo de burst do processo.
					processList_rr[i].burstTime = 0;
					//Adiciona na tabela os dados do processo
					addRow(tableProcessData,cont,processList[i].insertedPosition,processList[i].priority,processList[i].burstTime,averageWait);
					// "Remove elemento" adicionando na verdade um elemento nulo na posição do processo que foi concluido
					processList_rr[i] = null;
				}
			}
		}

	}while(processAlive);
}
//Necessario ordenar por prioridade
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
