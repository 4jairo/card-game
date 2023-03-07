function Player(forward, backward, left, right,shoot, health, position){
    this.position = position
    this.health = health
    this.keybinds = {
        forward: forward,
        backward: backward, 
        left: left, 
        right: right,
        shoot: shoot
    }
}

let p1 = new Player('KeyW', 'KeyS', 'KeyA', 'KeyD','Space', 100, [0, 0])
let p2 = new Player('ArrowUp','ArrowDown','ArrowLeft','ArrowRight','KeyP', 100, [100, 100])



//movement
const playerSpeed = 1
const bulletSpeed = 3

document.addEventListener('keydown', (e) => {
    updateDirection(p1, e.code, 'down')
    updateDirection(p2, e.code, 'down')
})

document.addEventListener('keyup', (e) => {
    updateDirection(p1, e.code, 'up')
    updateDirection(p2, e.code, 'up')
})

let pressed = [] // detect pressed keys
function updateDirection(player, key, keystatus){
    Object.values(player.keybinds).forEach(val => {
        if(key === val){    
            if(keystatus == 'down'){
                if(!pressed.includes(val)) pressed.push(val)
                console.log(pressed)
            } else {
                pressed.splice(pressed.indexOf(val), 1)
                console.log(pressed)
            } 
        }
    })
}
function updatePos(player){
    pressed.forEach(key => {
        switch(key){
            case player.keybinds.forward: 
                if(player.position[0] - playerSpeed >= 0){
                    player.position[0] -= playerSpeed
                }
                break
            case player.keybinds.backward:
                if(player.position[0] + playerSpeed <= map.offsetHeight - player1.offsetHeight){ 
                    player.position[0] += playerSpeed
                }
                break
            case player.keybinds.left:
                if(player.position[1] - playerSpeed >= 0){ 
                    player.position[1] -= playerSpeed
                }
                break
            case player.keybinds.right:
                if(player.position[1] + playerSpeed <= map.offsetWidth - player1.offsetWidth){
                    player.position[1] += playerSpeed
                }
                break
            case player.keybinds.shoot:
                bulletDelay(player)
                break
        }
    })
}

function update(){
    updatePos(p1)
    updatePos(p2)
    requestAnimationFrame(update)
}