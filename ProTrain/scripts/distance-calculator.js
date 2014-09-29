var distanceCalculator = (function () {

    function calculateDistance(starting, ending) {
        var EARTH_RATIO = 6371;
        try {
            var differenceLat = toRad(ending._latitude - starting._latitude);
            var differenceLon = toRad(ending._longitude - starting._longitude);
            var latStart = toRad(starting._latitude);
            var latEnd = toRad(ending._latitude);

            var a = Math.sin(differenceLat / 2) * Math.sin(differenceLat / 2) +
                    Math.sin(differenceLon / 2) * Math.sin(differenceLon / 2) * Math.cos(latStart) * Math.cos(latEnd);
            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            var d = EARTH_RATIO * c;
            return d;
        } catch (e) {
            return -1;
        }
    }

    function calculateByCos(starting, ending) {
        var radlat1 = starting._latitude;
        var radlat2 = ending._latitude;
        var radlon1 = starting._longitude;
        var radlon2 = ending._longitude;
        var theta = starting._longitude - ending._longitude;
        var radtheta = theta;
        var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        dist = Math.acos(dist)
        console.log(dist * 111);
        //dist = dist * 180 / Math.PI
        //dist = dist * 60 * 1.1515
        //console.log(dist * 1.609344 * 1000);

    }

    function toRad(value) {
         var RADIANT_CONSTANT = 0.01745329251 ;
         return value * RADIANT_CONSTANT;
    }

    return {
        calculateDistance: calculateDistance,
        calculateByCos: calculateByCos
    };

}());