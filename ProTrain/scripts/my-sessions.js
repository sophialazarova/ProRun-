var app = app || {};
app.mySessions = app.mySessions || {};

(function (scope) {
    'use strict';
    var everlive = new Everlive("tLFppRYFPl70CjCP");
    var element = document.getElementById("flat-listview");
   var data = everlive.data('Session');
   data.get()
       .then(function (data) {
           scope.sessions = function (e) {
               var vm = kendo.observable({
                   todos: loadTodos(),
                   alert: function (e) {
                      navigator.notification.alert("Distance: " + e.data.Distance + "\n"
                           + "Time: " + e.data.TimeToShow + "\n"
                           + "Average Speed: " + e.data.Speed, function () { }, e.data.Date, "Ok");
                   }
               });
               kendo.bind(e.view.element, vm)

               function loadTodos() {
                   return new kendo.data.DataSource({ data: data.result });
               }

           };
       });
}(app.mySessions));