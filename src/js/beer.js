let daysText = document.getElementById('days-text');

// Update days every second
timerHandler();
setInterval(timerHandler, 100);

// Button handlers
let onBrewClick    = () => switchTo('confirm-box');
let onDeclineClick = () => switchTo('beer-counter');
let onConfirmClick = () => { switchTo('beer-counter'); saveDate(); };

function timerHandler() {
    fs.readFile(logPath, function (err, data) {
        if (err) {
            console.log(err);
            return;
        }
        // Get last entry in log file
        dataString = data.toString();
        dataString = dataString.substring(dataString.lastIndexOf('\r\n'));
        // Update counter according to last log entry
        calcDays(new Date(dataString), new Date());
    });
}

function calcDays(datePast, dateNow) {
    let millisPast = datePast.valueOf().toString();
    let millisNow  = dateNow.valueOf().toString();

    // Calculate days weeks and years from last date
    let days   = Math.floor((millisNow - millisPast) / (1000 * 60 * 60 * 24));
    let weeks  = Math.floor((days % 365) / 7);
    let years  = Math.floor(days / 365);
    days = (days % 365) % 7;

    // Build date string
    daysText.innerHTML = '';
    if (years > 0) daysText.innerHTML += years.toString() + ' ' + yearsString(years) + ' ';
    if (weeks > 0) daysText.innerHTML += weeks.toString() + ' ' + weeksString(weeks) + ' ';
    if ((years == 0 && weeks == 0) || days > 0) daysText.innerHTML += days.toString() + ' ' + daysString(days);
    daysText.innerHTML += ' без пыва';
}

function yearsString(years) {
    // Returns appropriate string to concat with years count
    let digit = years % 10;
    switch (digit) {
        case 1:
            if (years < 10 || years > 19)
                return 'год';
        case 2: case 3: case 4:
            if (years < 10 || years > 19)
                return 'года';
        default:
            return 'лет';
    }
}

function weeksString(weeks) {
    // Returns appropriate string to concat with months count
    let digit = weeks % 10;
    switch (digit) {
        case 1:
            if (weeks < 10 || weeks > 19)
                return 'неделя';
        case 2: case 3: case 4:
            if (weeks < 10 || weeks > 19)
                return 'недели';
        default:
            return 'недель';
    }
}

function daysString(days) {
    // Returns appropriate string to concat with days count
    let digit = days % 10;
    switch (digit) {
        case 1: if (days < 10 || days > 19)
                return 'день';
        case 2: case 3: case 4:
                if (days < 10 || days > 19)
                return 'дня';
        default: return 'дней';
    }
}

function saveDate() {
    if (daysText.innerHTML.substring(0, daysText.innerHTML.indexOf(' ')) > 0) {
        // Append current date to log file
        dateNow = new Date();
        fs.appendFile(logPath, '\r\n' + dateNow.toDateString(), function (err) {
            if (err) {
                console.log(err);
                return;
            }
            // And update counter
            calcDays(dateNow, dateNow);
        });
    }
}