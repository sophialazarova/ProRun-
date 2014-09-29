var PositionCreator = (function () {

    function Position(latitude, longitude) {
        this._latitude = latitude;
        this._longitude = longitude;
    }

    return {
        Position: Position
    };
}());
