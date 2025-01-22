const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');

var body = document.body;
var html = document.documentElement;

canvas.width = window.innerWidth;
canvas.height = body.scrollHeight;

let particlesArray = [];
let numberOfParticles;

// Array of colors
const colors = ['#88b9e4', '#9f9fd6', '#706a9c', '#494d7e', '#76fff4'];

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
        this.maxLife = 1000 + Math.random() * 500;
        this.life = this.maxLife;
    }
    update() {

        
        this.x += this.speedX;
        this.y += this.speedY;
        this.life -= 1; // Decrease life
        if (this.life < 0) {
            this.respawn(); // Respawn particle when it dies
        }
    }
    draw() {
        const color = this.getColor();
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, 2, 2); // Draw particle as a 2px square
    }
    getColor() {
        const lifeRatio = this.life / this.maxLife;
        const colorIndex = Math.floor((1 - lifeRatio) * colors.length);
        return colors[colorIndex < colors.length ? colorIndex : colors.length - 1];
    }
    respawn() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 1 - 0.6;
        this.speedY = Math.random() * 1 - 0.6;
        this.maxLife = 1000 + Math.random() * 500;
        this.life = this.maxLife;
    }
}

function init() {
    particlesArray = [];
    const screenArea = window.innerWidth * body.scrollHeight;
    numberOfParticles = Math.floor(screenArea / 20000); // Adjust this value as needed
    for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
    }
}

init();

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
    }
    requestAnimationFrame(animate);
}

animate();

window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = body.scrollHeight;
    init();
});
