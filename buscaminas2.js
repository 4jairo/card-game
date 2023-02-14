jugar.addEventListener('click', () => {
    generarTablero()
    generarNums()
    puntuacion()
})

let columnas = 10
let filas = 10
let dificultad = Math.floor((filas * columnas)/100 * 25)
let table = []

function generarTablero(){
    let mina = []
    let tableContent = ""
    let colcount = 0

    for(let c = 0; c < columnas; c++){
        for(let f = 0; f < filas; f++){
            table.push([c,f])
            mina.push(0)
        }
    }
    for(let i = 0; i < dificultad; i++){
        mina[i] = 1
    }
    mina.sort(() => Math.random() - .5)

    for(let i = 0; i < filas * columnas; i++){
        table[i].push(mina[i])
        if(colcount === 0){
            tableContent += '<tr>'
        }
        if(colcount === columnas){
            tableContent += '</tr>'
            colcount = 0
        }
        tableContent += `<td id="${i}" class="m${table[i][2]} ${table[i][0]}-${table[i][1]}"></td>`
        colcount++
    }
    tablero.innerHTML = tableContent
}

let casillaElement
function generarNums(){
    casillaElement = document.querySelectorAll('td')
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
        }
        table[i].push(minasAround) 
        minasAround = 0
    }
}

function puntuacion(){
    document.oncontextmenu = new Function('return false') //eliminar menu click der 

    casillaElement.forEach(casilla => {
        if(casilla.classList.contains('m1')){
            casilla.innerHTML = "*"
        }

        casilla.addEventListener('click', () => {
            if(casilla.classList.contains('m0')){
                casilla.style.backgroundColor = "rgb(200, 200, 200)"
                casilla.classList.add('descubierta')
            } else {
                pierdes()
            }
        })

        casilla.addEventListener('contextmenu', () => {
            if(!casilla.classList.contains('descubierta') && casilla.innerHTML !== '<div class="img-container"><img src="bandera.jpg"></div>'){
                casilla.innerHTML = '<div class="img-container"><img src="bandera.jpg"></div>'
                casilla.classList.add('bandera')
            } else {
                casilla.innerHTML = ""
                casilla.classList.remove('bandera')
            }
        })

        casilla.addEventListener('dblclick', () => {
            despejar(casilla.id)
        })
    })
}
function despejar(id){
    let bandera = 0
    for(let c = -1; c <= 1; c++){
        for(let f = -1; f <= 1; f++){
            let currentFila = table[id][0] + f
            let currentCol = table[id][1] + c
            let currentId = (currentFila * filas) + currentCol
            
            if(currentFila >= 0 && currentFila < filas && currentCol >= 0 && currentCol < columnas){
                //console.log(currentFila, currentCol)
                
                if(casillaElement[currentId].classList.contains('bandera')){
                    bandera++
                }
                //no funciona
                if(bandera === table[id][3]){
                    if(!casillaElement[currentId].classList.contains('bandera')){
                        casillaElement[currentId].style.backgroundColor = 'rgb(200, 200, 200)'
                    }
                }

                // if(casillaElement[currentId].classList.contains('bandera') && casillaElement[currentId].classList.contains('m1')){
                //     console.log("igua")
                // }
            }
        }
    }
}

function pierdes(){
    console.log("pierdes")
    casillaElement.forEach(mina => {
        if(mina.classList.contains('m1')){
            mina.innerHTML = '<div class="img-container"><img src="mina.jpg"></div>'
        }
    })
}
