// @ts-nocheck

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
        this.dy = this.effect.mouse.y + this.effect.mouse.scrollPosition - 225 - this.y - ((window.innerHeight - this.effect.height) / 2);
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
        scrollPosition: number;
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
            y: undefined,
            scrollPosition: 0
        }
        window.addEventListener("mousemove", (event) => {
            this.mouse.x = event.x;
            this.mouse.y = event.y;
        });
        window.addEventListener("scroll", () => {
            this.mouse.scrollPosition = Math.round(window.scrollY);
        })
    }
    init(context){
        context.drawImage(this.image, this.x, this.y, this.image.width, this.image.height);
        const data = context.getImageData(0, 0, this.width, this.height).data;
        for (let y = 0; y < this.height; y += this.gap) {
            for (let x = 0; x < this.width; x += this.gap) {
                const index = ((this.width * y) + x) * 4;
                const alpha = data[index + 3];
                if (alpha) {
                    const red = 25//data[index];
                    const green = 25//data[index + 1];
                    const blue = 36//data[index + 2];
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
            <canvas id="canvas" width="800" height="800" background="#fff"></canvas>
            <img id="image" src="data:image/png;base64,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" alt="Logo" layout="fill" display="none"/>
        </div>
    )
}