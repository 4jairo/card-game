let btnjgar = document.getElementById('jugar')
let containerMenu = document.getElementById('container-menu')
let table = document.querySelector('table')

//let filas = document.getElementById('filas')
//let columnas = document.getElementById('columnas')
btnjgar.addEventListener('click', () => {
    generarLvl()
    hud()
    logica()
})
let filas = 20
let columnas = 20
let dificultad = (filas * columnas) / 100 * 25
let lvl = []
let lvl2= []
let coords = []
let count = 0


function generarLvl(){
    let filacount = 0
    let colcount = 0
    containerMenu.style.display = "none"
    //generar 1 y 0 (minas)
    for(let i = 0; i < dificultad; i++){
        lvl.push(1)
    }
    for(let i = 0; i < columnas * filas - dificultad; i++){
        lvl.push(0)
    }
    for(let i = 0; i < columnas * filas; i++){
        if(filacount == filas){
            colcount++
            filacount = 0
        }
        filacount++
        coords.push([filacount, colcount])

    }
    console.log(coords)
    lvl.sort(() => Math.random() - .5) // -> desordenarlas
    lvl.forEach(val => { // -> añadir coords
        lvl2.push([count, val])
        count++
    })
    lvl = []

    let content = ""
    let contador = 0
    lvl2.forEach(casilla => { // -> presentar lvl
        if(contador === 0){
            content += '<tr>'
        }
        if(contador === columnas){
            content += '</tr>'
            contador = 0
        }
        content += `<td class="${casilla[1]}" id="${casilla[0]}">${coords[casilla[0]]}</td>`
       /*if(casilla[1] == 1){

        }else {
            content += `<td class="${casilla[1]}" id="${casilla[0]}"></td>`
        }*/
        contador++
    })
    table.innerHTML = content
}

function hud(){  
}

function logica(){
    document.oncontextmenu = new Function('return false')


    let casillaElement = document.querySelectorAll('td')
    casillaElement.forEach(casilla => {
        casilla.addEventListener('contextmenu', () => { // right click a una casilla
             if(casilla.innerHTML === ""){
                 casilla.innerHTML = '<img src="bandera.jpg">'
            } else if(casilla.innerHTML === '<img src="bandera.jpg">'){
                casilla.innerHTML = ""
                console.log(casilla)
            }
        })
        casilla.addEventListener('click', () => { // -> click a una casilla
            if(casilla.innerHTML == coords[casilla.id]){
                console.log("hh")
            }



            if(casilla.classList.contains('mina1')){ // -> click a una mina (mostramos todas las minas)
                casillaElement.forEach(mina => {
                    if(mina.classList.contains('mina1')){
                        mina.innerHTML = '<img src="mina.jpg">'
                    }
                })
            } else { // click a no mina
                casilla.style.backgroundColor = "rgb(200, 200, 200)"
            }
        })
        if(casilla.classList.contains('mina1')){
            casilla.innerHTML = 1 
        }
    })
}
