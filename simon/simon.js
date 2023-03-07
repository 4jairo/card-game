// desplegar menu
menuBtn.addEventListener('click', () => {
    if(menu.style.height == '100px'){
        menu.style.height = '0px'
        menuBtn.innerHTML = '&darr;desplegar&darr;'
    } else {
        menu.style.height = '100px'
        menuBtn.innerHTML = '&uarr;contraer&uarr;'
    }
})

// dentro del menu -> 
// rotar
dificultad.addEventListener('input', () => {
    let dif = dificultad.value
    difLabel.innerHTML = `rotar (segundos en hacer una vuelta) = ${dif}`
    container.style.animation = `rotar ${dif}s infinite linear`
})

// colores en letra y formato rgb
let posibilities = ['green','blue','red','yellow','orange','white','purple','pink', 'lightblue', 'black',]
let rgb = [
    ['rgba(0, 255, 0, 0.3)', 'rgb(0, 255, 0)'], //green
    ['rgba(0, 0, 160, 0.3)', 'rgb(0, 0, 160)' ], //blue
    ['rgba(255, 0, 0, 0.3)', 'rgb(255, 0, 0)'], // red
    ['rgba(255, 255, 0, 0.3)', 'rgb(255, 255, 0)'], //yellow
    ['rgba(255, 166, 0, 0.3)', 'rgb(255, 166, 0)'], //orange
    ['rgba(255, 255, 255, 0.3)', '#fff'], //white
    ['rgba(128, 0, 128, 0.3)', 'rgb(128, 0, 128)'], //purple
    ['rgba(255, 174, 187, 0.3)', 'rgb(255, 174, 187)'], //pink
    ['rgba(97, 179, 255, 0.3)', 'rgb(97, 179, 255)'], //lightblue
    ['rgba(0, 0, 0, 0.6)', 'rgb(0, 0, 0)'] //black
]

//nunero de colores
let numcolor = parseInt(addColor.value)
let isGameOn = false
for(let i = 0; i < numcolor; i++){
    container.innerHTML += `<div id="${posibilities[i]}" class="color"></div>`
}
let colorElement = document.querySelectorAll('.color')

//barra nº colores
addColor.addEventListener('input', () => {
    if(isGameOn === false){
        numcolor = parseInt(addColor.value)
        addColorLabel.innerHTML = `Nº de colores: ${numcolor}`
    
        container.innerHTML = ""
        for(let i = 0; i < numcolor; i++){
            container.innerHTML += `<div id="${posibilities[i]}" class="color"></div>`
        }
        colorElement = document.querySelectorAll('.color')
    }
})


//btn jugar
btnjugar.addEventListener('click', () => {
    isGameOn = true
    jugar()
    presentar()
    if(btnjugar.innerHTML == 'volver a jugar'){
        // eliminar eventListener y vovler a cerear
        compare('kill')
    } else {
        compare()
    }
})

function random(){
    let random = Math.floor(Math.random() * numcolor)
    return posibilities[random]
}

let lvlOrder = []
let lvl = 0
function jugar(){
    btn_container.style.display = 'none'
    
    if(lvl === 0){
        for(let i = 0; i < 4; i++){
            lvlOrder.push(random())
        }  
        lvl++
    } else {
        lvlOrder.push(random())
        lvl++
    }
}

let bool = false
function presentar(){
    let contador = 0
    animation(lvlOrder[contador], 700)
    contador++

    let interval = setInterval(() => {
        animation(lvlOrder[contador], 700)
        contador++
        if(contador == lvlOrder.length){
            clearInterval(interval)

            // -> compare() funciona
            bool = true
        }
    }, 850)
}
function animation(color, delay){
    let c = posibilities.indexOf(color)
    
    colorElement[c].style.backgroundColor = `${rgb[c][1]}`
    setTimeout(() => {colorElement[c].style.backgroundColor = `${rgb[c][0]}`}, delay)
}

function compare(kill){
    let count = 0
    colorElement.forEach(color => {
        if(kill == 'kill'){ color.removeEventListener('click', event) }

        color.addEventListener('click', event)

        function event(){
            if(bool && count !== 'si'){
                animation(color.id, 170)
                if(color.id == lvlOrder[count]){
                    count++
                    if(count == lvlOrder.length){
                        btnjugar.innerHTML = 'siguiente lvl'
                        btn_container.style.display = 'block'

                        //reiniciar variables
                        count = 'si' // -> compare() = no funciona
                    }
                } else {
                    btnjugar.innerHTML = 'volver a jugar'
                    btn_container.style.display = 'block'

                    //reiniciar variables
                    isGameOn = false
                    lvlOrder = []
                    lvl = 0
                    count = 'si' // -> compare() = no funciona
                }
            }
        }
    })
}
