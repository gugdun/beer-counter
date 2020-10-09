const scaleSpeed = 25;
const rotSpeed = 0.1;
const fallSpeed = 5;
const maxSpeed = 5;
const confRad = 25;

class Confetti {
    constructor() {
        this.graphics = new PIXI.Graphics();

        // Random color, position above screen and initial rotation
        this.color = Math.random() * 0xffffff;
        this.graphics.transform.rotation = Math.random() * Math.PI * 2;
        this.graphics.position.set(app.screen.width / 4 + Math.random() * app.screen.width / 2,
            Math.random() * app.screen.height * 1.5 - app.screen.height * 1.5);

        app.stage.addChild(this.graphics);

        // Random parameters for update method
        this.direction = Math.random() * maxSpeed - maxSpeed / 2;
        this.rotation = Math.random() * 2 - 1;
        this.speed = Math.random();
    }

    update(delta) {
        let sin = Math.sin(this.graphics.position.y / app.screen.height * scaleSpeed);

        // Change color if confetti is showing its back side
        if (sin < 0) this.backSide = true;
        else this.backSide = false;

        // Redraw confetti
        this.graphics.clear();
        if (this.backSide) this.graphics.beginFill(0xffffff, Math.abs(sin) / 2 + 0.5);
        else this.graphics.beginFill(Math.round(this.color), Math.abs(sin) / 2 + 0.5);
        this.graphics.drawCircle(0, 0, confRad);
        this.graphics.endFill();

        // Scale speed and size of confetti according to screen resolution
        let scale = Math.max(app.screen.width, app.screen.height) / 800;

        // Scale rotate and move confetti according to delta time
        this.graphics.scale.set(sin * scale, scale);
        this.graphics.transform.rotation += delta * rotSpeed * this.rotation;
        this.graphics.position.y += delta * fallSpeed * scale;
        this.graphics.position.x += delta * this.direction + this.speed * scale;
    }
}