import { useEffect } from "react";

class Particle {
    effect: Effect;
    x: number;
    y: number;
    originX: number;
    originY: number;
    color: string;
    size: number;
    vx: number;
    vy: number;
    ease: number;
    friction: number;
    dx: number;
    dy: number;
    distance: number;
    force: number;
    angle: number;

    constructor(effect, x, y, color) {
        this.effect = effect;
        this.x = Math.random() * this.effect.width;
        this.y = Math.random() * this.effect.height;
        this.originX = Math.floor(x);
        this.originY = Math.floor(y);
        this.color = color;
        this.size = this.effect.gap;
        this.vx = 0;
        this.vy = 0;
        this.ease = 0.25;
        this.friction = 0.8;
        this.dx = 0;
        this.dy = 0;
        this.distance = 0;
        this.force = 0;
    }
    draw(context) {
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, this.size, this.size);
    }
    update() {
        this.dx = this.effect.mouse.x - this.x - ((window.innerWidth - this.effect.width) / 2);
        this.dy = this.effect.mouse.y - this.y - ((window.innerHeight - this.effect.height - 150) / 2);
        this.distance = this.dx * this.dx + this.dy * this.dy;  
        this.force = -this.effect.mouse.radius / this.distance;

        if (this.distance < this.effect.mouse.radius) {
            this.angle = Math.atan2(this.dy, this.dx);
            this.vx += this.force * Math.cos(this.angle);
            this.vy += this.force * Math.sin(this.angle);
        }

        this.x += (this.vx *= this.friction) + (this.originX - this.x) * this.ease;
        this.y += (this.vy *= this.friction) + (this.originY - this.y) * this.ease;
    }
}

class Effect {
    width: number;
    height: number;
    particles: Particle[];
    image;
    centerX: number;
    centerY: number;
    x: number;
    y: number;
    gap: number;
    mouse: {
        radius: number;
        x: number;
        y: number;
    }

    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.particles = [];
        this.image = document.getElementById("image");
        this.centerX = this.width / 2;
        this.centerY = this.height / 2;
        this.x = (this.width - (this.image.width)) / 2;
        this.y = (this.height - (this.image.height)) / 2;
        this.gap = 2;
        this.mouse = {
            radius: 10000,
            x: undefined,
            y: undefined
        }
        window.addEventListener("mousemove", (event) => {

            this.mouse.x = event.x;
            this.mouse.y = event.y;
        });
    }
    init(context){
        context.drawImage(this.image, this.x, this.y, this.image.width, this.image.height);
        const data = context.getImageData(0, 0, this.width, this.height).data;
        for (let y = 0; y < this.height; y += this.gap) {
            for (let x = 0; x < this.width; x += this.gap) {
                const index = ((this.width * y) + x) * 4;
                const alpha = data[index + 3];
                if (alpha) {
                    const red = data[index];
                    const green = data[index + 1];
                    const blue = data[index + 2];
                    const color = `rgb(${red},${green},${blue})`;
                    this.particles.push(new Particle(this, x, y, color));
                }
            }
        }
    }
    draw(context){
        this.particles.forEach(particle => particle.draw(context));
    }
    update(){
        this.particles.forEach(particle => particle.update());
    }
}

const initParticles = () => {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    const width = canvas.width = 800;
    const height = canvas.height = 800;

    const effect = new Effect(width, height);
    effect.init(ctx);
    console.log(effect);

    function animate() {
        ctx.clearRect(0, 0, width, height);
        effect.draw(ctx);
        effect.update();
        requestAnimationFrame(animate);
    }
    animate();
}

export function ParticlePhysics(props) {

    useEffect(() => {
        window.addEventListener("load", initParticles, false);
    }, []);
        
    return (
        <div {...props}>
            <canvas id="canvas" width="800" height="800"></canvas>
            <img id="image" src="data:image/png;base64,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" alt="Logo" layout="fill" display="none"/>
        </div>
    )
}