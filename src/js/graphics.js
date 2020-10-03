const { remote } = require('electron');

const PIXI = require('pixi.js');

const app = new PIXI.Application({ antialias: true });

let canvas = document.getElementById('container').appendChild(app.view);
canvas.style.position = 'absolute';
canvas.style.left = '0';
canvas.style.right = '0';
canvas.style.zIndex = '-1';

const graphics = new PIXI.Graphics();
app.stage.addChild(graphics);

let win = remote.getCurrentWindow();
let resize = () => { app.renderer.resize(win.getBounds().width, win.getBounds().height); }
win.on('resize', resize);
resize();

let speed = 15;
let fallSpeed = 7;

app.ticker.add((deltaTime) => {
    let cos = Math.cos(graphics.y / app.screen.height * speed);

    graphics.clear();
    graphics.lineStyle(0);
    if (cos < 0) graphics.beginFill(0xffffff, Math.abs(cos) + 0.1);
    else graphics.beginFill(0xf0509f, cos + 0.1);
    graphics.drawCircle(0, 0, 50);
    graphics.endFill();

    graphics.x = app.screen.width / 2;
    graphics.y += fallSpeed * deltaTime;
    graphics.width = Math.abs(cos) * 100;
    graphics.rotation += speed * deltaTime;
    if (graphics.y > app.screen.height) { graphics.y = 0; }
});