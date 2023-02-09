let btnjgar = document.getElementById('jugar')
let containerMenu = document.getElementById('container-menu')
let table = document.querySelector('table')

//let filas = document.getElementById('filas')
//let columnas = document.getElementById('columnas')
btnjgar.addEventListener('click', () => {
    generarLvl()
    hud()
    puntuacion()
})
let filas = 20
let columnas = 20
let dificultad = (filas * columnas) / 100 * 25
let lvl = []
let lvl2= []
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
    lvl.sort(() => Math.random() - .5) // -> desordenarlas
    lvl.forEach(val => { // -> añadir coords
        if(filacount == filas){
            colcount++
            filacount = 0
        }
        filacount++
        lvl2.push([count, val, filacount, colcount])
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
        if(casilla[1] == 1){ 
            content += `<td class="mina${casilla[1]}" id="${casilla[0]}">1</td>`
        }else {
            content += `<td class="mina${casilla[1]}" id="${casilla[0]}"></td>`
        }
        contador++
    })
    table.innerHTML = content
}

function hud(){  
}

function puntuacion(){
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


            if(casilla.classList.contains('mina1')){ // -> click a una mina (mostramos todas las minas)
                casillaElement.forEach(mina => {
                    if(mina.classList.contains('mina1')){
                        mina.innerHTML = '<img src="mina.jpg">'
                    }
                })
            } else { // click a no mina
                casilla.style.backgroundColor = "rgb(200, 200, 200)"
                despejar(lvl2[casilla.id][2], lvl2[casilla.id][3])
            }
        })
        if(casilla.classList.contains('mina1')){
            casilla.innerHTML = 1 
        }
    })
}
function despejar(col,fil){
    //console.log(lvl2[find_id(col,fil)])
    //console.log("fila:")
    for(let f = -1; f <= 1; f++){
        //console.log(fil + f)'
        for(let c = -1; c <= 1; c++){
            console.log(lvl2[find_id(col,fil)][2])
            //console.log("columna")
            //console.log(col + c)
        }
    }
}
//c
function find_id(val2, val3){
    for(let i = 0; i < lvl2.length; i++){
        if(lvl2[i][2] == val2 && lvl2[i][3] == val3){
            return i
        }
    }
}