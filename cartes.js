let container = document.getElementById('container')
let btnjugar = document.getElementById('jugar')
let resultado = document.getElementById('resultado')
let fallosdisplay = document.getElementById('errores')
let puntosdisplay = document.getElementById('puntos')

let c = console.log
//localStorage.clear()

let tiempo = document.getElementById('tiempo')

let table = document.querySelector('table')
let tablebtn = document.getElementById('tablebtn')
let ModalTableContainer = document.getElementById('modal-container')
let ModalTableClose = document.getElementById('closeModalTable')

let countPar = 0
let countInd = 0
let numparejas = 1
let order = []


function presentar(val){
    if(val === 'reset'){
        numparejas = 1
        container.innerHTML = ""
        resultado.innerHTML = ""
        fallosdisplay.innerHTML = ""
        puntosdisplay.innerHTML = ""
    }

    for(let i = 0; i < numparejas; i++){
        for(let i = 0; i < 2; i++){
            order.push(countPar)
            order.sort(() => Math.random() - 0.5)
        }
        countPar++
        btnjugar.style.top = "-50px"
    }
    order.forEach(numero => {
        container.innerHTML +=
        `<div class="flip_card">
            <div class="flip_card_inner ${numero}" id=carta${countInd}>
                <div class="flip_card_front">
                    <div class="img_contanier">
                        <img src="https://img.freepik.com/vector-premium/signo-interrogacion-rojo-grande_122818-781.jpg?w=2000">
                    </div>
                </div>
                <div class="flip_card_back">
                    <div class="img_contanier">
                        <img src="https://avatars.dicebear.com/v2/avataaars/${numero}.jpg">
                    </div>
                </div>
            </div>
        </div>`;
        countInd++
    });
    order = []
    countPar = 0
    countInd = 0
}

//al apretar el boton jugar (presentacion)
btnjugar.addEventListener('click', () => {

    if(btnjugar.innerHTML === 'jugar'){ //empezar
        presentar()
        setTimeout(logica, 1500)
        reloj()

    } else if(btnjugar.innerHTML === 'volver a empezar'){ //pierdes
        presentar('reset')
        reloj()
        setTimeout(logica, 1500)

    } else { //siguiente nivel
        resultado.innerHTML = ""
        container.innerHTML = ""
        presentar()
        setTimeout(logica, 1500)
    }
})



let intento = []
let intentoAll = []
let intentoNum = 0
let puntos = 0

function logica(){
    let cartas = document.querySelectorAll('.flip_card_inner')
    let firstcard
    let secondcard
    let contadorcarta = 0
    let aciertos = 0
    let fallos = 0

    cartas.forEach(flip_card_inner => {
        flip_card_inner.addEventListener('click', () => {
        //cuando hacemos click en una carta
            // guardar valor de la carta
            if(contadorcarta === 0){
                flip_card_inner.style.transform = 'rotateY(180deg)'
                firstcard = flip_card_inner
                contadorcarta++
            } else if(contadorcarta === 1.5){
                flip_card_inner.style.transform = 'rotateY(180deg)'
                firstcard = flip_card_inner
                contadorcarta = 2
            } else if(contadorcarta === 1){
                flip_card_inner.style.transform = 'rotateY(180deg)'
                secondcard = flip_card_inner
                contadorcarta++
            }

            // contador de fallos-aciertos y cartas giradas
            if(contadorcarta === 2){
                if(firstcard.classList.contains('acierto')){
                    contadorcarta = 1.5
                } else if(secondcard.classList.contains('acierto')){
                    contadorcarta = 1
                } else {
                    if(firstcard.classList.value == secondcard.classList.value && firstcard.id !== secondcard.id){
                        aciertos++
                        puntos++
                        firstcard.classList.add('acierto')
                        secondcard.classList.add('acierto')
                        firstcard.childNodes[3].childNodes[1].childNodes[1].style.border = 'solid 1px green'
                        secondcard.childNodes[3].childNodes[1].childNodes[1].style.border = 'solid 1px green'
                        contadorcarta = 0
                    } else if(firstcard.id === secondcard.id){
                        contadorcarta = 1
                    } else {
                        fallos++
                        contadorcarta = 3
                        setTimeout(timeout, 500)
                    }
                } 

                //pierdes (volver a empezar)
                if(fallos === Math.round(numparejas * 1.5)){
                    resultado.innerHTML = "pierdes"
                    btnjugar.style.top = "10px"
                    btnjugar.innerHTML = "volver a empezar"
                    contadorcarta = 3
                    intentoNum++
                    reloj('reset')
                    timeout()
                    LStable()
                }
                //ganas (siguiente nivel)
                if(aciertos === numparejas){
                    resultado.innerHTML = "ganas"
                    btnjugar.style.top = "10px"
                    btnjugar.innerHTML = "siguiente nivel"
                    if(numparejas < 16){
                        numparejas = numparejas * 2
                    } else {
                        numparejas = numparejas * 1.5
                    }
                }
                puntosdisplay.innerHTML = `Puntos: ${puntos}`
                fallosdisplay.innerHTML = `Fallos: ${fallos} (disponibles: ${Math.round(numparejas * 1.5)})`
            }
            function LStable(){
                intento.push(intentoNum)
                intento.push(puntos)
                intento.push(fallos)
                intento.push(pause)
                intentoAll.push(intento)
                puntos = 0
            
                localStorage.setItem('intentos', JSON.stringify(intentoAll))
                intento = []
            
                let intentoLS = JSON.parse(localStorage.getItem('intentos'))
                table.innerHTML = 
                `
                <tr>
                    <td>Intento nº</td>
                    <td>Aciertos</td>
                    <td>Fallos</td>
                    <td>Tiempo</td>
                </tr>
                `
                intentoLS.forEach(intent => {
                    table.innerHTML +=
                    `
                    <tr>
                        <td>${intent[0]}</td>
                        <td>${intent[1]}</td>
                        <td>${intent[2]}</td>
                        <td>${intent[3]}</td>
                    </tr>
                    `
                })
            }
            function timeout(){
                if(fallos === Math.round(numparejas * 1.5)){
                    cartas.forEach(flip_card_inner => {flip_card_inner.style.transform = 'rotateY(180deg)'})
                } else {
                    firstcard.style.removeProperty('transform')
                    secondcard.style.removeProperty('transform')
                    contadorcarta = 0
                }
            }
        }) // <- final click carta
    })
}

let centesima = '00'
let secs = '00'
let mins = '00'
let relojcontrol
let pause
function reloj(val){
    if(val === 'reset'){
        clearInterval(relojcontrol)
        centesima = '00'
        secs = '00'
        mins = '00'

    } else {
        relojcontrol = setInterval(function(){
            if(centesima < 100 ){
                centesima++
                if(centesima/9 < 1){
                    centesima = "0" + centesima
                }
            }
            if(centesima === 100){
                centesima = 0
                secs++
                if(secs/9.5 < 1){
                    secs = "0" + secs
                }
            }
            if(secs === 60){
                secs = 0
                mins++
                if(mins/9 < 1){
                    mins = "0" + mins
                }
            }
            tiempo.innerHTML = `Tiempo -> ${mins}:${secs}.${centesima}`
            pause = `${mins}:${secs}.${centesima}`
        }, 10)
    }
}

tablebtn.addEventListener('click', () => {
    ModalTableContainer.style.display = 'block'
})

ModalTableClose.addEventListener('click', () => {
    ModalTableContainer.style.display = 'none'
})
window.addEventListener('click', (e) => {
    if(e.target == ModalTableContainer){
        ModalTableContainer.style.display = 'none'
    }
})