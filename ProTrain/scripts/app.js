
(function () {

    // store a reference to the application object that will be created
    // later on so that we can use it if need be
    var app;

    var everlive = new Everlive("tLFppRYFPl70CjCP");
    // create an object to store the models for each view

    document.addEventListener('deviceready', function () {  
        navigator.splashscreen.hide();
        app = new kendo.mobile.Application(document.body, {
        
            // you can change the default transition (slide, zoom or fade)
            transition: 'slide',
            initial: 'views/new-session.html'
        });
        }, false);
    
    //  var currentPosition, oldPosition;
    //  var result = navigator.geolocation.watchPosition(
    //  function (success) { oldPosition = currentPosition; currentPosition = new PositionCreator.Position(success.coords.latitude, success.coords.Longitude); },
    //  function (error) { console.log(error); },
    //  { enableHighAccuracy: true });
    //}, false);
}());