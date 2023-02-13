
// nº de filas y columans a tiempo real
filasLB.innerHTML = `filas: ${filas.value}`
filas.addEventListener('input', () => {
    filasLB.innerHTML = `filas: ${filas.value}`
})

columnasLB.innerHTML = `columnas: ${columnas.value}`
columnas.addEventListener('input', () => {
    columnasLB.innerHTML = `columnas: ${columnas.value}`
})

dificultadLB.innerHTML = `dificultad: ${dificultad.value}%`
dificultad.addEventListener('input', () => {
    dificultadLB.innerHTML = `dificultad: ${dificultad.value}%`
})


jugar.addEventListener('click', () => { //btn jugar
    generarLvl()
    //despejar('', '', 'nums')
    puntuacion()
    hud()
})

let lvl2= []
function generarLvl(){
    filas = parseInt(filas.value)
    columnas = parseInt(columnas.value)
    let difficulty = Math.floor((filas * columnas)/100 * dificultad.value)
    let lvl = []
    let Id = 0

    container_menu.style.display = "none"
    //generar 1 y 0 (minas)
    for(let i = 0; i < difficulty; i++){
        lvl.push(1)
    }
    for(let i = 0; i < columnas * filas - difficulty; i++){
        lvl.push(0)
    }
    //lvl.sort(() => Math.random() - .5) // -> desordenarlas

    let filacount = 0
    let colcount = 0
    lvl.forEach(val => { // -> añadir coords
        if(colcount == columnas){
            filacount++
            colcount = 0
        }
        lvl2.push([Id, val, filacount, colcount])
        colcount++
        Id++
    })

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
            content += `<td class="mina${casilla[1]} coords${casilla[2]}-${casilla[3]}" id="${casilla[0]}">${casilla[2]}-${casilla[3]}</td>`
        }else {
            content += `<td class="mina${casilla[1]} coords${casilla[2]}-${casilla[3]}" id="${casilla[0]}">${casilla[2]}-${casilla[3]}</td>`
        }
        contador++
    })
    //${casilla[2]}-${casilla[3]}
    table.innerHTML = content
}

function hud(){  // status de la partida
}

let casillaElement
function puntuacion(){ //lógica
    casillaElement = document.querySelectorAll('td')
    let descubierta = 0
    document.oncontextmenu = new Function('return false')
    
    casillaElement.forEach(casilla => {
        casilla.addEventListener('contextmenu', () => { // right click a una casilla
            
            if(casilla.innerHTML !== '<img src="bandera.jpg">' &&  !casilla.classList.contains('descubierta')){
                casilla.innerHTML = '<img src="bandera.jpg">'
                casilla.classList.add('bandera')
            } else if(casilla.innerHTML === '<img src="bandera.jpg">'){
                casilla.innerHTML = ""
                casilla.classList.remove('bandera')
            }
        })
        casilla.addEventListener('click', () => { // -> click a una casilla

            if(casilla.classList.contains('mina1')){ // -> pierdes (click a una mina)
                pierdes()
            } else { // click a no mina
                despejar(lvl2[casilla.id][2], lvl2[casilla.id][3])
            }
            
            //si descubiertas = casillas con no mina
            casillaElement.forEach(casilla => {
                if(casilla.classList.contains('descubierta')){
                    descubierta++
                }
            })
            if(descubierta == (filas * columnas) - Math.floor((filas * columnas) / 100 * dificultad.value )){ 
                container_hud.innerHTML = '<h1>ganas</h1>'
            } else {
                descubierta = 0
            }
            
        })
    })
}

function despejar(fil,col, val){
    let noMina = 0
    let minas = 0
    for(let f = -1; f <= 1; f++){
        for(let c = -1; c <= 1; c++){
            if(col + c >= 0 && col + c <= columnas - 1 && fil + f >= 0 && fil + f <= filas - 1){
                let casillaId = casillaElement[find_id(fil + f,col + c)]
                if(casillaId.classList.contains('mina0')){
                    casillaId.style.backgroundColor = "rgb(200, 200, 200)"
                    casillaId.classList.add('descubierta')

                    // if(noMina === 9 && bool === true){
                    //     console.log("no minas en 3x3")
                    //     despejar(fil + f, col + c)
                    //     bool = false
                    // }
                    noMina = 0
                    
                } else {
                    minas++
                    minas = 0
                    //pierdes()
                }     
            }
        }
    }
    
}
function generarNums(){
    let numMinas = 0
    for(let i= 0; i < casillaElement.length; i++){
        if(casillaElement[i].classList.contains('mina0')){
            for(let f = -1; f <= 1; f++){
                for(let c = -1; c <= 1; c++){
                    if(casillaElement[i].classList.contains('mina1')){
                        numMinas++
                        console.log(numMinas)
                    }
                }
            }
        }
        //console.log(casillaElement[i].classList[0])
    }
}

function find_id(val2, val3){ //del valor 2 i 3 de de la array lvl2 devuelve valor 1
    for(let i = 0; i < lvl2.length; i++){
        if(lvl2[i][2] == val2 && lvl2[i][3] == val3){
            return i
        }
    }
} 

function pierdes(){ // todas las minas descubiertas
    casillaElement.forEach(mina => { 
        if(mina.classList.contains('mina1')){
            mina.innerHTML = '<img src="mina.jpg">'
        }
    })
}
