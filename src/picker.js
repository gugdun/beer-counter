const fs = require('fs');

const logPath = 'beer-dates.log'

let beerCounter = document.getElementById('beer-counter');
let confirmBox  = document.getElementById('confirm-box');
let dayPicker = document.getElementById('day-picker');
let dateInput = document.getElementById('date-input');

// Converts date to date picker format
Date.prototype.toDateInputValue = (function() {
    var local = new Date(this);
    local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
    return local.toJSON().slice(0,10);
});

// Set date to current
dateInput.value = new Date().toDateInputValue();

// Open date picker if log file doesnt exist
if (fs.existsSync(logPath))
    switchTo('beer-counter');
else switchTo('day-picker');

function switchTo(id) {
    // Switches to div with specified id
    beerCounter.hidden = !(beerCounter.id == id);
    confirmBox.hidden  = !(confirmBox.id  == id);
    dayPicker.hidden   = !(dayPicker.id   == id);
}

function onPickClick() {
    // Save picked date to log file
    fs.appendFile(logPath, '\r\n' + dateInput.value, (err) => { if (err) throw err; });
    switchTo('beer-counter');
}