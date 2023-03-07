// nº de filas y columans a tiempo real
filasLB.innerHTML = `filas: ${fila.value}`
fila.addEventListener('input', () => {
    filasLB.innerHTML = `filas: ${fila.value}`
})

columnasLB.innerHTML = `columnas: ${columna.value}`
columna.addEventListener('input', () => {
    columnasLB.innerHTML = `columnas: ${columna.value}`
})

dificultadLB.innerHTML = `dificultad: ${dificultad.value}%`
dificultad.addEventListener('input', () => {
    dificultadLB.innerHTML = `dificultad: ${dificultad.value}%`
})

jugar.addEventListener('click', () => {
    generarTablero()
    generarNums()
    puntuacion()
})

let table = []
let filas
let columnas
let difficulty

function generarTablero(){
    container_menu.style.display = 'none'
    container_table.style.display = 'block'
    filas = parseInt(fila.value)
    columnas = parseInt(columna.value)
    difficulty = Math.floor((filas * columnas / 100) * parseInt(dificultad.value))

    //hud
    minas_restantes.innerHTML = `Minas restantes: ${difficulty}`

    let mina = []
    let tableContent = ""
    let colcount = 0

    for(let c = 0; c < columnas; c++){
        for(let f = 0; f < filas; f++){
            table.push([c,f])
            mina.push(0)
        }
    }
    for(let i = 0; i < difficulty; i++){
        mina[i] = 1
    }
    //mina.sort(() => Math.random() - .5)

    for(let i = 0; i < filas * columnas; i++){
        table[i].push(mina[i])
        if(colcount === 0){
            tableContent += '<tr>'
        }
        if(colcount === columnas){
            tableContent += '</tr>'
            colcount = 0
        }
        tableContent += `<td id="${i}" class="mina${table[i][2]} oculta"></td>`
        colcount++
    }
    tablero.innerHTML = tableContent
}

let casillaEl
function generarNums(){
    casillaEl = document.querySelectorAll('td')
    for(let i = 0; i < filas * columnas; i++){
        let minasAround = 0
        if(table[i][2] === 0){
            for(let c = -1; c <= 1; c++){
                for(let f = -1; f <= 1; f++){
                    let currentFila = table[i][0] + f
                    let currentCol = table[i][1] + c
                    let currentId = (currentFila * filas) + currentCol
                    if(currentFila >= 0 && currentFila < filas && currentCol >= 0 && currentCol < columnas){
                        if(table[currentId][2] === 1){
                            minasAround++
                        }
                    }
                }
            }
            // números minas
            if(minasAround !== 0){
                casillaEl[i].classList.add(`a${minasAround}`, 'a')
            }
        }
        table[i].push(minasAround)
    }
}

function puntuacion(){
    let banderas = 0
    document.oncontextmenu = new Function('return false') //eliminar menu click der 

    casillaEl.forEach(casilla => {
        if(casilla.classList.contains('mina1')){
            casilla.innerHTML = ""
        }

        casilla.addEventListener('click', () => {
            if(casilla.classList.contains('mina0')){
                if(casilla.innerHTML === ""){
                    casilla.classList.add('visible')
                    casilla.classList.remove('oculta')
                    ganas()
                }
            } else {
                pierdes()
            }
        })

        casilla.addEventListener('contextmenu', () => {   
            if(casilla.classList.contains('bandera')){
                casilla.innerHTML = ""
                casilla.classList.toggle('bandera')
                banderas--
            } else if(!casilla.classList.contains('visible')){
                casilla.innerHTML = '🚩'
                casilla.classList.toggle('bandera')
                banderas++
            }

            //hud
            minas_restantes.innerHTML = `Minas restantes: ${difficulty - banderas}`
        })

        casilla.addEventListener('dblclick', () => {
            despejar(parseInt(casilla.id))
        })
    })
}



function despejar(id){
    let around = []
    let bandera = 0
    let banderaYmina = 0
    for(let c = -1; c <= 1; c++){
        for(let f = -1; f <= 1; f++){
            let currentFila = table[id][0] + f
            let currentCol = table[id][1] + c
            let currentId = (currentFila * filas) + currentCol
            let casillaClass = casillaEl[currentId].classList
            if(currentFila >= 0 && currentFila < filas && currentCol >= 0 && currentCol < columnas){
                if(currentId !== id && !casillaClass.contains('bandera')){
                    around.push(currentId)
                }
                if(casillaClass.contains('bandera')){
                    bandera++
                    if(casillaClass.contains('mina1')){
                        banderaYmina++
                    }
                }

            }
        }
    }

    if(bandera === table[id][3] && bandera === banderaYmina){
        if(bandera === banderaYmina){
            around.forEach(idAround => {
                casillaEl[idAround].classList.add('visible')
                casillaEl[idAround].classList.remove('oculta')
            })
            ganas()


            //reiniciar valores
            around  = []
            bandera = 0
            banderaYmina = 0
        } else {
            pierdes()
        }
    } else {
        around = []
    }
}

function pierdes(){
    casillaEl.forEach(mina => {
        if(mina.classList.contains('mina1')){
            mina.innerHTML = '💣'
        }
    })
    jugar.innerHTML = "volver a jugar"
    container_menu.style.display = "block"
}

function ganas(){
    let visible = 0
    casillaEl.forEach(si => {
        if(si.classList.contains('visible')){
            visible++
        } else {
            visible = 0
        }
        if(visible === filas * columnas - difficulty){
            console.log("ganas")
        }
    })
}
