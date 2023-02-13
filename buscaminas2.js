jugar.addEventListener('click', () => {
    generarTablero()
    puntuacion()
})


let columnas = 5
let filas = 5
let dificultad = Math.floor((filas * columnas)/100 * 25)
function generarTablero(){
    let table = []
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
        if(colcount === 0){
            tableContent += '<tr>'
        }
        if(colcount === columnas){
            tableContent += '</tr>'
            colcount = 0
        }
        tableContent += `<td id="${table[i]}" class="${mina[i]}"></td>`
        colcount++
    }
    tablero.innerHTML = tableContent
}

function puntuacion(){
    let casillaElement = document.querySelectorAll('td')

    casillaElement.forEach(casilla => {
        casilla.addEventListener('click', () => {
            casilla.style.backgroundColor = "rgb(200, 200, 200)"
        })
    })
}