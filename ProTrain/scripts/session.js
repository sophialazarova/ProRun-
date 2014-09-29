var sessionCreator = (function () {

    function Session(distance, time, date) {
        this._distance = distance;
        this._speed = distance/time;
        this._time = time;
        this._date = date;
    }

    return {
        Session: Session
    };
}());