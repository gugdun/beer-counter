let closeBtn = document.getElementById('close-btn');
closeBtn.onclick = window.close;

let pickBtn = document.getElementById('pick-btn');
pickBtn.onclick = onPickClick;

let brewBtn = document.getElementById('brew-btn');
brewBtn.onclick = onBrewClick;

let confirmBtn = document.getElementById('confirm-btn');
confirmBtn.onclick = onConfirmClick;

let declineBtn = document.getElementById('decline-btn');
declineBtn.onclick = onDeclineClick;