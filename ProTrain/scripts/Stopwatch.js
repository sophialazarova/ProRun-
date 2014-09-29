var stopwatch = (function () {
    var sec = 0;
    var min = 0;
    var hour = 0;
    var secToShow,
    hourToShow,
    minToShow;

    var id, time;
    function begin(holder) {

        sec++; 
        if (sec == 60) {
            sec = 0;
            min = min + 1; 
        }
        else {
            min = min;
        } 

        if (min == 60) { 
            min = 0;
            hour += 1;
        } 

        minToShow = min;
        hourToShow = hour;
        secToShow = sec;

        if (sec<=9) {
            secToShow = "0" + sec; 
        }

        if(hour <= 9){
            hourToShow = "0" + hour;
        }

        if(min <= 9){
            minToShow = "0" + min;
        }

        time = hourToShow + ':' + minToShow + ':' + secToShow;
        holder.innerText = time;

    }

    function start(holder) {
        id = window.setInterval(function () { begin(holder) }, 1000);
    }

    function stop() {
        clearInterval(id);
        return time;
    }

    return {
        start: start,
        stop: stop
    };

}());