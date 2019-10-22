/*
	Altura e largura serão usadas na função ajustaTamanhpPalcoJogo()
	para armazer o tamanho atual da tela para então gerarmos os insetos
	randomicamente com base no tamanho da tela
*/
var altura = 0
var largura = 0
var vidas = 1
var tempo = 10

var criaMosquitoTempo = 1500

/*
	variável nivel recebe o link passado na url, após isso substitui o '?'
	que vem por padrão pelo valor vazio.
*/
var nivel = window.location.search
nivel = nivel.replace('?','')


/*
	dependendo do nível informado é ajustado a variável criaMosquitoTempo
	que é usada no app.html para setar a velocidade de execução da função
	setInterval.
*/
if(nivel === 'facil'){
	criaMosquitoTempo = 1500
}else if(nivel === 'medio'){
	criaMosquitoTempo = 1000
}else if(nivel ==='dificil'){
	criaMosquitoTempo = 750
}

function ajustaTamanhoPalcoJogo(){
	altura = window.innerHeight
	largura = window.innerWidth
	console.log(altura, largura)
}
//chamando a função para já calcular altura e largura
ajustaTamanhoPalcoJogo()

/*
	a variável cronometro possui uma função do tipo setInterval que executa
	a cada 1 segundo, decrementando o tempo e caso o tempo seja inferior
	a 0 automáticamente encerra o cronometro, encerra o processo de criar mosquitos
	e redireciona para a página de vitória
*/

var cronometro = setInterval(function(){
	tempo--
	if(tempo <0){
		clearInterval(cronometro)
		clearInterval(criaMosquito)
		window.location.href = 'vitoria.html'
	}else{
		//innerHTML coloca o valor na tag selecionada
	document.getElementById('cronometro').innerHTML = tempo
	}
},1000)


function criarMosquito(){ 

/*
	if abaixo remove o mosquito anterior caso ele exista,
	verificando também quantas vidas resta.
*/
if(document.getElementById('mosquito')){

	document.getElementById('mosquito').remove()

	if( vidas == 3){
		
		window.location.href = 'fimDeJogo.html'
		document.getElementById('v' + vidas).src = 'imagens/coracao_vazio.png'
	}else{
	//variando o id da imagem de acordo com o somador vidas++	
	document.getElementById('v' + vidas).src = 'imagens/coracao_vazio.png'
	}
	vidas++
}

/*
	posição X e Y recebem a altura e largura capturadas com
	a função ajustaTamanhoPalcoJogo, para tornar isso aleatório
	multiplico por um valor aleatório entre 0 e 1 usando a função
	Math.random(), após isso arredondo esse valor usando a função
	Math.floor(). após isso subtraimos 90px para evitar do mosquito
	estourar o limite máximo da tela
*/
var posicaoX = Math.floor(Math.random() *  largura ) - 90
var posicaoY = Math.floor(Math.random()* altura) - 90

/*
	Caso a posição seja menor que zero aplica-se zero para o elemento
	não sumir da tela, senão for menor que zero continua o mesmo valor
*/
posicaoX = posicaoX < 0 ? 0 : posicaoX
posicaoY = posicaoY < 0 ? 0 : posicaoY
console.log(posicaoX, posicaoY )

/*
	Abaixo adiciono um elemento htlm através de código, é criado
	um elemento do tipo img com o nome mosquito,  depois atribuido
	o src de onde está essa imagem. após ajusto os elementos css como
	position, left, top e className que possui o tamanho do mosquito
*/
var mosquito = document.createElement('img')
mosquito.src = 'imagens/mosquito.png'
//.className está recebendo várias classes CSS, sendo separadas por espaço
mosquito.className = tamanhoAleatorio() + ' '+ ladoAleatorio()
mosquito.style.left = posicaoX + 'px'
mosquito.style.top = posicaoY + 'px'
mosquito.style.position = 'absolute'
mosquito.id = 'mosquito'

//adicionando o elemento criado a arvore de elementos do documento html
document.body.appendChild(mosquito)


/*
	mosquito.onclick configura a ação de clicar na imagem do mosquito,
	quando clicado é removido a função criaMosquito() por isso usamos
	o this.remove() para referenciar a função ao qual o mosquito.onclick
	está encorporada.
*/
mosquito.onclick = function(){
	this.remove()
}


}


function tamanhoAleatorio(){
	/*
		a var classe recebe um valor gerado aleatóriamente
		entre 0 e 2. gerando um número aleatório e multiplicando
		por 3, após isso arredondo esse valor para baixo por isso
		fica variando entre 0, 1 e 2
	*/
	var classe = Math.floor(Math.random() * 3)
	switch(classe){
		case 0:
		 return 'mosquito1'
		case 1:
		 return 'mosquito2'
		case 2:
		 return 'mosquito3'
	}
	
}

function ladoAleatorio(){
	/*
		a var classe recebe um valor gerado aleatóriamente
		entre 0 e 1. gerando um número aleatório e multiplicando
		por 2, após isso arredondo esse valor para baixo por isso
		fica variando entre 0 e 1 
	*/
	var classe = Math.floor(Math.random() * 2)
	switch(classe){
		case 0:
		 return 'ladoA'
		case 1:
		 return 'ladoB'
	}
}

