
function Player(forward, backward, left, right, shoot, position, health){
    this.forward = forward
    this.backward = backward
    this.left = left
    this.right = right
    this.shoot = shoot
    this.position = position
    this.health = health
}
let p1 = new Player('KeyW','KeyS','KeyA','KeyD','Space',[100, 100], 100)
let p2 = new Player('ArrowUp','ArrowDown','ArrowLeft','ArrowRight','KeyP',[50, 100], 100)
let gameStatus = false

//hud & settings
window.addEventListener('click', (e) => {
    if(e.target == modalContainer){
        modalContainer.style.display = 'none'
    }
})
settings.addEventListener('click', () => {
    modalContainer.style.display = 'block'
    
    function keyBinds(player, element){
        element.innerHTML = ""
        let i = 0

        Object.keys(player).forEach(val => {
            if(val !== 'position'){
                element.innerHTML +=
                `<div>
                    <p id="${element.id}${i}">${val} &rarr; </p>
                    <button onclick="changeKey('${val}','${p1.forward}')">change</button>
                </div>`
                i++
            }
        })
        i = 0
        Object.values(player).forEach(val => {
            if(val !== player.position){
                let e = document.getElementById(`${element.id}${i}`)

                i++
                e.innerHTML += `${val}`
            }
        })
    }
    
    keyBinds(p1, p1keybinds)
    keyBinds(p2, p2keybinds)
})

function changeKey(key, ref){
    console.log(1)
    newKey = true
    newKeyPlayer = p1.forward
}

// maps
let mapOptions = document.querySelectorAll('.maps')
mapOptions.forEach(mapOpt => {
    mapOpt.addEventListener('click', () => {
        if(mapOpt.id == 'map1'){
            //play btn
            play.style.display = 'block'

            // players
            player1.style.display = 'block'
            player2.style.display = 'block'
            p1.position = [map.offsetHeight - 100 , 100, 0]
            p2.position = [map.offsetHeight - 100, map.offsetWidth - 100, 0]
        }
    })
})

let seconds = 60
let minutes = 1
let time
let timeout = false // player with most health wins
play.addEventListener('click', () => {
    console.log("click")
    if(play.innerHTML === 'play again'){
        restartValues()
    }
    gameStatus = true
    //console.log("click")
    //restartValues()
    play.style.display = 'none'
    play.innerHTML = 'play again'
    time = setInterval(() => {
        seconds--
        if(seconds === -1){
            seconds = 59
            minutes--
        }
        timeDisplay.innerHTML = `time &rarr; ${minutes}:${seconds}`
        if(seconds == 0 && minutes == 0){
            timeout = true
            updateHealth(p1, "", timeout)
            clearInterval(time)
        }
    }, 100)
})

//movement

let newKey = false // for asign new keybinds
let newKeyValue
const damage = 10
const playerSpeed = 1
const bulletSpeed = 3
const bulletRatio = 200 // max time between bullets

document.addEventListener('keydown', (e) => {
    updateDirection(p1, e.code, 'down')
    updateDirection(p2, e.code, 'down')
    // if(newKey === true){
    //     newKeyValue = e.code
    //     console.log(newKeyValue)
    //     newKey = false
    //}
})
        
document.addEventListener('keyup', (e) => {
    updateDirection(p1, e.code, 'up')
    updateDirection(p2, e.code, 'up')
})
    
let pressed = [] /*-> for pressed keys*/
function updateDirection(player, key, keystatus){
    Object.values(player).forEach(val => {
        if(key === val){
            if(keystatus == 'down'){
                if(!pressed.includes(val)) pressed.push(val)
            } else {
                pressed.splice(pressed.indexOf(val), 1)
            } 
        }
    })
}

//delay & burst bullets p1 & p2 on bulletDelay() fn
let lastBulletp1 = 0
let bulletBurstp1 = 0
let lastBulletp2 = 0
let bulletBurstp2 = 0
function bulletDelay(player){
    let time = new Date().getTime()
    if(player.shoot == p1.shoot){
        if(time - lastBulletp1 >= bulletRatio){
            bulletBurstp1++
            shoot(player)

            if(bulletBurstp1 == 7){
                lastBulletp1 = time + 1500
                bulletBurstp1 = 0
            } else {
                lastBulletp1 = time
            }
        }
    } else {
        if(time - lastBulletp2 >= bulletRatio){
            bulletBurstp2++
            shoot(player)

            if(bulletBurstp2 == 7){
                lastBulletp2 = time + 1500
                bulletBurstp1 = 0
            } else {
                lastBulletp2 = time
            }
        }
    }
}

function updateKeys(player){
    pressed.forEach(keys => {
        switch(keys){
            case player.forward: 
            if(player.position[0] - playerSpeed >= 0){
                    player.position[0] -= playerSpeed
                }
                break
            case player.backward:
                if(player.position[0] + playerSpeed <= map.offsetHeight - player1.offsetHeight){ 
                    player.position[0] += playerSpeed
                }
                break
            case player.left:
                if(player.position[1] - playerSpeed >= 0){ 
                    player.position[1] -= playerSpeed
                }
                break
            case player.right:
                if(player.position[1] + playerSpeed <= map.offsetWidth - player1.offsetWidth){
                    player.position[1] += playerSpeed
                }
                break
            case player.shoot:
                bulletDelay(player)
                break
        }
    })
}

let bulletsOnboard = []
let bulletsHitted = []
let bulletCount = 0

function shoot(player){
    let shootPosition
    let direction
    if(player.forward == p1.forward){
        shootPosition = p1.position[1] + player1.offsetWidth - 20
        direction = 'left'
    } else {
        shootPosition = p2.position[1]
        direction = 'right'
    }
    let newBullet = `<div id="bullet${bulletCount}" class="bullet ${player.shoot}" top="${player.position[0]}" left="${shootPosition}" direction="${direction}" style="top:${player.position[0]}px; left=${shootPosition}px"></div>`

    bulletCount++
    map.innerHTML += newBullet
    
    bulletsOnboard = Array.from(document.querySelectorAll('.bullet'))
}

function updatePlayerPos(){
    player1.style.top = `${p1.position[0]}px`
    player1.style.left = `${p1.position[1]}px`

    player2.style.top = `${p2.position[0]}px`
    player2.style.left = `${p2.position[1]}px`
}

function bullets(){
    bulletsOnboard.forEach(b => {
        let pos = parseInt(b.getAttribute('left'))
        let direction = b.getAttribute('direction')
        let player
    
        if(direction == 'left'){
            b.setAttribute('left', pos + bulletSpeed)
            player = p1
        } else {
            b.setAttribute('left', pos - bulletSpeed)
            player = p2
        }

        b.style.left = `${b.getAttribute('left')}px`

        if(direction == 'left'){
            if(hitbox(p2, player2)){
                hit()
            }
            if(b.getAttribute('left') > map.offsetWidth){
                removeBullet()
            }
        } else {
            if(hitbox(p1, player1)){
                hit()
            }
            if(b.getAttribute('left') < 0){
                removeBullet()
            }
        }

        function hitbox(pl, plEl){
            return b.getAttribute('left') <= pl.position[1] + plEl.offsetWidth && 
            b.getAttribute('left') >= pl.position[1] &&
            b.getAttribute('top') <= pl.position[0] + plEl.offsetHeight && 
            b.getAttribute('top') >= pl.position[0]
        }
        function hit(){
            if(!bulletsHitted.includes(b)){
                bulletsHitted.push(b)
                console.log("hit")
                removeBullet()
                updateHealth(player, b)
            }
        }
        function removeBullet(){
            b.remove()
            bulletsOnboard = bulletsOnboard.filter(function(element){
                return element !== b
            })
        }
    })
    //console.log("fn finished")
}

function updateHealth(player, hit, timeout){
    let OtherPlHealth
    let OtherPl
    let OtherPlElement
    let playerName
    if(player.shoot == p1.shoot){
        OtherPlHealth = p2health
        OtherPl = p2
        OtherPlElement = player1Container
        playerName = 'Player 1'
    } else {
        OtherPlHealth = p1health
        OtherPl = p1
        OtherPlElement = player2Container
        playerName = 'Player 2'
    }
    if(timeout){
        if(player.health < OtherPl.health){
            alerts.innerHTML = `Time is out, ${playerName} won`
            play.style.display = 'block'
            return ""
        } else if(player.health == OtherPl.health){
            alerts.innerHTML = `Time is out, there's a empat`
            play.style.display = 'block'
            return ""
        } else {
            alerts.innerHTML = `Time is out, ${playerName} won`
            play.style.display = 'block'
            return ""
        }
    }
    if(player.shoot == hit.classList[1]){
        console.log(`damage to: ${OtherPlHealth.id}`)
        OtherPl.health -= damage
        if(OtherPl.health <= 0){
            OtherPlElement.style.backgroundColor = 'yellow'
            alerts.innerHTML = `${playerName} wins`
            play.style.display = 'block'

            gameStatus = false
        }
        OtherPlHealth.style.width = `${OtherPl.health}%`
        OtherPlHealth.innerHTML = `${OtherPl.health}%`
    }
}

function restartValues(){
    console.log("restart")

    p1.health = 100
    p2.health = 100
    
    alerts.innerHTML = ""

    console.log(bulletBurstp1, lastBulletp1, bulletBurstp2, lastBulletp2, bulletCount, minutes, seconds, timeDisplay.innerHTML, time)
    
    clearInterval(time)
    timeDisplay.innerHTML = 'time &rarr; 2:00'
    seconds = 60
    minutes = 1
    timeout = false

    bulletCount = 0

    lastBulletp1 = 0
    bulletBurstp1 = 0
    lastBulletp2 = 0
    bulletBurstp2 = 0
}

function update(){
    if(gameStatus === true){
        updateKeys(p1)
        updateKeys(p2)
        updatePlayerPos()
        bullets()
    }
    requestAnimationFrame(update)
} update()

/* 
per fer: 

keybinds

*/