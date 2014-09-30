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
                       alert(e.data.Distance);
                   }
               });
               kendo.bind(e.view.element, vm)

               function loadTodos() {
                   return new kendo.data.DataSource({ data: data.result });
               }

           };
       });
}(app.mySessions));