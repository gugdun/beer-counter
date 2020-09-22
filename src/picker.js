const fs = require('fs');

const logPath = 'beer-dates.log'

let dayPicker    = document.getElementById('day-picker');
let beerCounter  = document.getElementById('beer-counter');
let dateInput    = document.getElementById('date-input');

let pickBtn      = document.getElementById('pick-btn');
pickBtn.onclick  = onPickClick;

// Converts date to date picker format
Date.prototype.toDateInputValue = (function() {
    var local = new Date(this);
    local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
    return local.toJSON().slice(0,10);
});

// Set date to current
dateInput.value = new Date().toDateInputValue();

// Open date picker if log file doesnt exist
if (fs.existsSync(logPath)) {
    dayPicker.hidden   = true;
    beerCounter.hidden = false;
} else {
    dayPicker.hidden   = false;
    beerCounter.hidden = true;
}

function onPickClick() {
    // Save picked date to log file
    fs.appendFile(logPath, '\r\n' + dateInput.value, (err) => { if (err) throw err; });
    // And switch GUI
    dayPicker.hidden   = true;
    beerCounter.hidden = false;
}