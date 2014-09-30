
/* global kendo, window */

var app = app || {};
app.new = app.new || {};

(function (scope) {
    'use strict';
    var currentPosition, oldPosition;
    var totalDistance = 0;
    var result;


    scope.newSession = kendo.observable({

        startSession: function () {

            var distanceHolder = document.getElementById('distance-holder');
            var timeHolder = document.getElementById('stopwatch');
            var buttonStart = document.getElementById('start-button');
            var buttonStop = document.getElementById('end-button');
            var speed = document.getElementById('speed');
            buttonStart.style.display = 'none';
            buttonStop.style.display = 'inline';
            var id = stopwatch.start(timeHolder);
            manageDistance(distanceHolder, speed);

        },
        endSession: function () {
            var distanceHolder = document.getElementById('distance-holder');
            console.log(distanceHolder);
            var timeHolder = document.getElementById('stopwatch');
            var buttonStart = document.getElementById('start-button');
            var buttonStop = document.getElementById('end-button');
            var speed = document.getElementById('speed');
            var time = stopwatch.stop();
            navigator.geolocation.clearWatch(result);
            var timeInHours = utils.getTimeInHours(time);
            var avgSpeed = totalDistance / timeInHours;
            var date = new Date();
            var str = date.toUTCString();
            navigator.notification.alert("Session is saved!", reset(speed, distanceHolder, timeHolder), "Session ended", "Ok");
            buttonStart.style.display = 'inline';
            buttonStop.style.display = 'none';

            var sessionDataSource = new kendo.data.DataSource({
                type: 'everlive',
                transport: {
                    typeName: 'Session'
                },
                schema: {
                    model: { id: Everlive.idField }
                }
            });

            var sessionItemToAdd = {
                'Time': timeInHours,
                'Speed': avgSpeed,
                'Date': str,
                'Distance': totalDistance,
                'TimeToShow': time
            };

            //sessionDataSource.add(sessionItemToAdd);
            //sessionDataSource.sync();
        }
    });

    function reset(speedHolder, distanceHolder, timeHolder) {
        distanceHolder.innerText = "0.000";
        timeHolder.innerText = "00:00:00";
        speedHolder.innerText = "0.000";
    }

    function manageDistance(distanceHolder, speedHolder) {
        navigator.geolocation.getCurrentPosition(
                function (success) {
                    oldPosition = new PositionCreator.Position(success.coords.latitude, success.coords.longitude);
                    currentPosition = oldPosition;
                     result = navigator.geolocation.watchPosition(
            function (success) {
                oldPosition = currentPosition;
                currentPosition = new PositionCreator.Position(success.coords.latitude, success.coords.longitude);
                var distance = distanceCalculator.calculateDistance(oldPosition, currentPosition);
                speedHolder.innerText = (distance / (1 / 3600)).toFixed(3);
                totalDistance = totalDistance + distance;
                distanceHolder.innerText = parseFloat(totalDistance).toFixed(3);
            },
            function (error) { console.log(error); },
            { enableHighAccuracy: true, timeout: 5000 });
                },
                function (error) { console.log(error); },
            { enableHighAccuracy: true });
    }
}(app.new));