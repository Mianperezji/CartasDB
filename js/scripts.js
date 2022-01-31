let cantidad = 20;

//Elementos HTML
let tablero;
let fondo;
let cartel;
let marcador;

//Array con las cartas
let cartas = new Array();
let numCarta = new Array();
//Array para situar las cartas aleatoriamente
let aleatorios = new Array();
//Array para controlar cada jugada
let arrayJugada = new Array(2);

//Ultimo
let ultimo;
//Ganada o perdida cada jugada y partida finalizada
let win = false;
//Numero de cartas en cada jugada
let cuentaCartas = 0;
//Numero de aciertos catidad/2 finaliza la partida
let aciertos = 0;

//Valor de la puntuacion de una jugada al maximo
let puntuacionMax = 1000;
//Marcador de la partida
let score = 0;

// True para facil, false para dificil
let modoFacil;

let cartaUno;
let cartaDos;
let haMostrado = false;

window.onload = function() {
    //Recuperamos los elementos HTML
    tablero = document.getElementById("tablero");
    marcador = document.getElementById("puntuacion");
    cartel = document.getElementById("cartel");
    fondo = document.getElementById("fondo");

    //Seleccionamos el modo de juego Facil o Dificil
    seleccionarModo();
}

function seleccionarModo() {
    let modo=  document.getElementById("cartel").querySelectorAll("button");


    for (let i=0;i<modo.length;i++){
        modo[i].addEventListener("click",generarCartas)
    }

}

function generarCartas() {
    const CARTAS_FACIL = 5;
    const CARTAS_DIFICIL = 10;
    let aleatorios = new Array();
    
    
    //Si el indice de la coleccion de los dos botones es 0, ha pulsado el modo facil.
    if (this.id=="facil"){
        modoFacil = true;
    }else{
        modoFacil = false;
    }
    //remuevo fondo;
    cartel.remove();
    fondo.remove();

    //Crea las tablas en el tablero dependiendo del modo
    if(modoFacil){
        cantidad=10;
        aleatorios=arrayAleatorios();
        rellenaCartas(cantidad,aleatorios)    
    }else{
        cantidad=20;
        aleatorios=arrayAleatorios();
        rellenaCartas(cantidad,aleatorios);     
    }
    

    for(let i = 0; i<cartas.length;i++){
        cartas[i].addEventListener("click", mostrarCarta)
    }
    
}

function mostrarCarta(){
    
    this.classList.add("mostrarCarta")
    this.style.opacity = "1";
    this.removeEventListener("click",mostrarCarta)

    if(!haMostrado){
        cartaUno=this;
        haMostrado=true;
    }else{
        cartaDos=this;
        haMostrado=false;
        console.log(cartaUno,cartaDos)
        setTimeout(function(){ comprobarCarta(cartaUno,cartaDos); }, 500);
    }

    
    

}


function comprobarCarta(element1,element2) {

    if (cartaUno.src==cartaDos.src){
        score+=puntuacionMax;
        marcador.innerText=score;
        aciertos+=2;
        

        cartaUno=null;
        cartaDos=null;

        if(aciertos==cantidad){
            mostrarFinal();
        }
        
    }else{
        cartaUno.style.opacity = "0";
        cartaDos.style.opacity = "0";
        cartaUno.addEventListener("click",mostrarCarta);
        cartaDos.addEventListener("click",mostrarCarta);
        cartaUno=null;
        cartaDos=null;
        if(puntuacionMax>100){
            puntuacionMax-=100;
        }
        

    }
    
}

function reiniciarJugada() {

}

function mostrarFinal() {
    let pagina = document.getElementById("main");
    fondo=document.createElement("div");
    cartel=document.createElement("div");
    let h2 = document.createElement("h2");
    let parraf = document.createElement("p")
    fondo.id="fondo";
    cartel.id="cartel";
    cartel.classList.add("cartel");
    fondo.classList.add("fondo");
    h2.innerText="Enhorabuena, tu puntuacion ha sido "+score;
    parraf.innerText="Pulsa en cualquier parte para volver a jugar";
    pagina.appendChild(fondo);
    fondo.appendChild(cartel);
    cartel=document.getElementById("cartel");
    fondo=document.getElementById("fondo");
    pagina.appendChild(fondo);
    fondo.appendChild(cartel);
    cartel.appendChild(h2);
    cartel.appendChild(parraf);

    fondo.addEventListener("click",reiniciar);

}

function reiniciar() {
    location.reload();
}

//Crea las cartas dependiendo de los parametros, reutilizando codigo
function rellenaCartas(cantidad,aleatorios){
    for (let i = 0; i < cantidad; i++){
        let contenedor=document.createElement("div");
        contenedor.classList.add("carta");
        contenedor.style.backgroundImage = "url('img/dorso.jpg')";
        contenedor.style.backgroundRepeat = "no-repeat";
        cartas[i]=new Image();
        cartas[i].src = `img/db${aleatorios[i]}.jpg`;
        cartas[i].style.opacity="0";
        tablero.appendChild(contenedor);
        
        contenedor.appendChild(cartas[i])
        numCarta.push(i);
    }
    
}




//Funcion que genera un array de numeros aleatorios. 2 por cada numero, hasta un total de la mitad de
//la variable cantidad.

function arrayAleatorios() {
    aleatorios = new Array();
    let numero = 0;
    let indice = 0;
    while(indice < cantidad) {
        numero = aleatorio();
        if(cuantosRepetidos(numero) < 2){
            aleatorios[indice] = numero;
            indice++;
        }
    }
    return aleatorios;
}

function cuantosRepetidos(num) {
    let repeticiones = 0;
    for(let i = 0; i < aleatorios.length; i++) {
        if(aleatorios[i] == num) repeticiones++;
    }
    return repeticiones;
}

function aleatorio() {
    return Math.floor(Math.random() * cantidad/2);
}