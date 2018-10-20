const canvas = document.querySelector('canvas')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

const c = canvas.getContext('2d')

// c.fillStyle = 'rgba(255, 0, 0, 0.5)'
// c.fillRect(100, 100, 100, 100)

// Line
// c.beginPath()
// c.moveTo(200, 200)
// c.lineTo(300, 300)
// c.lineTo(400, 400) 
// c.strokeStyle = '#fa34a3'
// c.stroke()

// Arc / Circle
// c.beginPath()
// c.arc(400, 400, 50, 0, Math.PI * 2, false)
// c.strokeStyle = 'blue'
// c.stroke()

// for (let i = 0; i < 100; i++) {
//     const x = Math.random() * window.innerWidth
//     const y = Math.random() * window.innerHeight
//     c.beginPath()
//     c.arc(x, y, 50, 0, Math.PI * 2, false)
//     c.strokeStyle = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 1)`
//     c.stroke()
// }

const maxRadius = 50

const mouse = {
    x: undefined,
    y: undefined
}

window.addEventListener('mousemove', (event) => {
    mouse.x = event.x
    mouse.y = event.y
})

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    init()
})

function Circle(x, y, dx, dy, radius) {
    this.x = x
    this.y = y
    this.dx = dx
    this.dy = dy
    this.radius = radius
    this.minRadius = radius
    this.color = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.9)`

    this.draw = function() {
        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        c.fillStyle = this.color
        c.fill()
    }

    this.update = function() {
        if(this.x + this.radius > innerWidth || this.x - this.radius < 0) {
            this.dx = -this.dx
        }
    
        if(this.y + this.radius > innerHeight || this.y - this.radius < 0) {
            this.dy = -this.dy
        }
    
        this.x += this.dx
        this.y += this.dy

        // Interactivity
        if ((mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50) && this.radius < maxRadius) {
            this.radius += 1
        } else if (this.radius > this.minRadius) {
            this.radius -= 1
        }

        this.draw()
    }
}

let circleArray = []

function init() {
    circleArray = []
    for (let i = 0; i < 300; i++) {
        const radius = Math.random() * 4 + 1
        let x = Math.random() * (window.innerWidth - radius * 2) + radius 
        let y = Math.random() * (window.innerHeight - radius * 2) + radius
        let dx = (Math.random() - 0.5)
        let dy = (Math.random() - 0.5)
    
        circleArray.push(new Circle(x, y, dx, dy, radius))
    }
}

function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, window.innerWidth, innerHeight)

    for (let circle of circleArray) {
        circle.update();
    }

}

init()
animate()
