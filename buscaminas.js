let btnjgar = document.getElementById('jugar')
let containerMenu = document.getElementById('container-menu')
let table = document.querySelector('table')

//let filas = document.getElementById('filas').value
//let columnas = document.getElementById('columnas').value

btnjgar.addEventListener('click', () => {
    generarLvl()
})
let filas = 20
let columnas = 20
let dificultad = (filas * columnas) / 100 * 20
let lvl = []

function generarLvl(){
    containerMenu.style.display = "none"

    for(let i = 0; i < columnas * filas - dificultad; i++){
        lvl.push(0)
    }

    for(let i = 0; i < dificultad; i++){
        lvl.push(1)
    }
    lvl.sort(() => Math.random() - .5)

    let filaCambio = 0
    let content = ""
    lvl.forEach(casilla => {

        if(filaCambio == 0){
            content += `<tr>`
        }
        if(filaCambio !== filas){
            content += `<td>${casilla}</td>`
            filaCambio++
        } else {
            content += `<tr>`
            filaCambio = 0
        }
    })
    table.innerHTML += content
}
