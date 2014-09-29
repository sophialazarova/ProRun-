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
            var time = stopwatch.stop();
            navigator.geolocation.clearWatch(result);
            var timeInHours = utils.getTimeInHours(time);
            var avgSpeed = totalDistance / timeInHours;
            var date = new Date();

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
                'Time': time,
                'Speed': avgSpeed,
                'Date': date,
                'Distance': totalDistance
            };

           // sessionDataSource.add(sessionItemToAdd);
           // sessionDataSource.sync();
        }
    });

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
            { enableHighAccuracy: true, timeout: 1000 });
                },
                function (error) { console.log(error); },
            { enableHighAccuracy: true });
    }
}(app.new));