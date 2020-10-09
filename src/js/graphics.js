const { remote } = require('electron');

const PIXI = require('pixi.js');
const app = new PIXI.Application({ antialias: true });

const confettiCount = 30;
const gradSpeed = 0.02;
let gradRot = 0;

// Add canvas to background
let canvas = document.getElementById('container').appendChild(app.view);
canvas.style.position = 'absolute';
canvas.style.left   = '0';
canvas.style.right  = '0';
canvas.style.zIndex = '-1';

let confetti = [];
function emitConfetti() {
    for (i = 0; i < confettiCount; i++) confetti.push(new Confetti());
}

app.loader.add('img/gradient.png').load(() => {
    // Load gradient texture
    let gradient = new PIXI.Sprite(app.loader.resources['img/gradient.png'].texture);
    gradient.pivot.set(gradient.width / 2, gradient.height / 2);
    app.stage.addChild(gradient);

    let resize = () => {
        // Scale renderer
        let bounds = remote.getCurrentWindow().getBounds();
        app.renderer.resize(bounds.width, bounds.height);

        // Scale background
        let largest = Math.max(bounds.width, bounds.height);
        gradient.scale.set(largest / gradient.texture.width * 1.5, largest / gradient.texture.height * 1.5);
        gradient.position.set(app.screen.width / 2, app.screen.height / 2);
    }   // On window resize
    remote.getCurrentWindow().on('resize', resize);
    resize();

    // Renderer update event
    app.ticker.add((deltaTime) => {
        // Rotate gradient
        gradient.transform.rotation = gradRot;
        gradRot += deltaTime * gradSpeed;
        if (gradRot >= Math.PI * 2) {
            gradRot -= Math.PI * 2;
        }

        // Update confetti
        confetti.forEach(c => {
            c.update(deltaTime);
            if (c.graphics.position.y > app.screen.heights + confRad) {
                for (var i = 0; i < confetti.length; i++) {
                    // Delete confetti if it exceeds screen
                    if (confetti[i] === c) {
                        confetti.splice(i, 1);
                        confetti[i].graphics.clear();
                    }
                }
            }
        });
    });
});