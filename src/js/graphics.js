const { remote } = require('electron');

const PIXI = require('pixi.js');
const app = new PIXI.Application({ antialias: true });

// Add canvas to background
let canvas = document.getElementById('container').appendChild(app.view);
canvas.style.position = 'absolute';
canvas.style.left     = '0';
canvas.style.right    = '0';
canvas.style.zIndex   = '-1';

app.loader.add('img/gradient.png').load(() => {
    let gradient = new PIXI.Sprite(app.loader.resources['img/gradient.png'].texture);
    gradient.pivot.set(gradient.width / 2, gradient.height / 2);

    // Scale gradient on window resize
    let resize = () => {
        let bounds = remote.getCurrentWindow().getBounds();
        app.renderer.resize(bounds.width, bounds.height);
        let largest = Math.max(bounds.width, bounds.height);
        gradient.scale.set(largest / gradient.texture.width * 1.5, largest / gradient.texture.height * 1.5);
        gradient.position.set(app.screen.width / 2, app.screen.height / 2);
    }
    remote.getCurrentWindow().on('resize', resize);
    resize();

    const rotateSpeed = 0.02;
    let rotation = 0;

    // Renderer update event
    app.stage.addChild(gradient);
    app.ticker.add((deltaTime) => {
        gradient.transform.rotation = rotation;
        rotation += deltaTime * rotateSpeed;
        if (rotation >= Math.PI * 2) {
            rotation -= Math.PI * 2;
        }
    });
});