var utils = (function () {

    function getTimeInHours(time) {
        var splitted = time.split(':')
        var hours;
        var minutesTohours;
        var secondsTohours;
        if (splitted[0][0] == 0) {
            hours = splitted[0][1];
        }
        else {
            hours = splitted[0];
        }

        if (splitted[1][0] == 0) {
            minutesTohours = splitted[1][1] / 60;
        }
        else {
            minutesTohours = splitted[1] / 60;
        }

        if (splitted[2][0] == 0) {
            secondsTohours = splitted[2][1] / 3600;
        }
        else {
            secondsTohours = splitted[2] / 3600;
        }

        hours = hours + minutesTohours + secondsTohours;
        console.log(parseFloat(hours).toFixed(4));
        return hours;
    }

    return {
        getTimeInHours: getTimeInHours
    };

}());