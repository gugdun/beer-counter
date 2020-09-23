let daysText = document.getElementById('days-text');

// Update days every second
timerHandler();
setInterval(timerHandler, 100);

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

    // Calculate days months and years from last date
    // Its tricky so left it as is for now
    let days   = Math.floor((millisNow - millisPast) / (1000 * 60 * 60 * 24));
    let months = Math.floor(days / 30);
    let years  = Math.floor(months / 12);
    days %= 30;
    months %= 12;

    // Build date string
    daysText.innerHTML = '';
    if (years > 0) daysText.innerHTML += years.toString() + ' ' + yearsString(years) + ' ';
    if (months > 0) daysText.innerHTML += months.toString() + ' ' + monthsString(months) + ' ';
    if ((years == 0 && months == 0) || days > 0) daysText.innerHTML += days.toString() + ' ' + daysString(days);
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

function monthsString(months) {
    // Returns appropriate string to concat with months count
    let digit = months % 10;
    switch (digit) {
        case 1:
            if (months < 10 || months > 19)
                return 'месяц';
        case 2: case 3: case 4:
            if (months < 10 || months > 19)
                return 'месяца';
        default:
            return 'месяцев';
    }
}

function daysString(days) {
    // Returns appropriate string to concat with days count
    let digit = days % 10;
    switch (digit) {
        case 1:
            if (days < 10 || days > 19)
                return 'день';
        case 2: case 3: case 4:
            if (days < 10 || days > 19)
                return 'дня';
        default:
            return 'дней';
    }
}

function onBrewClick() {
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