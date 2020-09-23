// Titlebar buttons
let minBtn   = document.getElementById('min-btn');
let maxBtn   = document.getElementById('max-btn');
let closeBtn = document.getElementById('close-btn');
closeBtn.onclick = () => remote.getCurrentWindow().close();
minBtn.onclick   = () => remote.getCurrentWindow().minimize();
maxBtn.onclick   = () => {
    if (remote.getCurrentWindow().isMaximized())
        remote.getCurrentWindow().unmaximize();
    else remote.getCurrentWindow().maximize();
};

// Date picker buttons
let pickBtn = document.getElementById('pick-btn');
pickBtn.onclick = onPickClick;

// Beer counter buttons
let brewBtn = document.getElementById('brew-btn');
brewBtn.onclick = onBrewClick;

// Confirm window buttons
let confirmBtn = document.getElementById('confirm-btn');
let declineBtn = document.getElementById('decline-btn');
confirmBtn.onclick = onConfirmClick;
declineBtn.onclick = onDeclineClick;