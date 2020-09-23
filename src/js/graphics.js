const { remote } = require('electron');

const speed = 3000;
const resolution = 100;

let canvas  = document.createElement('canvas');
let context = canvas.getContext('2d');

canvas.width = canvas.height = resolution;

let t = 0;
let lastRender = Date.now();

function render() {
    let x = Math.cos(t) * resolution;
    let y = Math.sin(t) * resolution;

    let grad = context.createLinearGradient(x, y, -x, -y);

    grad.addColorStop(0.0, '#ee7752');
    grad.addColorStop(0.5, '#e73c7e');
    grad.addColorStop(1.0, '#8356b5');
    
    context.fillStyle = grad;
    context.fillRect(0, 0, resolution, resolution);

    document.body.style.background = 'url(' + canvas.toDataURL() + ')';
    document.body.style.backgroundSize = '100vmax';

    t += (Date.now() - lastRender) / speed;
    lastRender = Date.now();

    requestAnimationFrame(render);
};

render();