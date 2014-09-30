(function () {

    // store a reference to the application object that will be created
    // later on so that we can use it if need be
    var app;
    window.everlive = window.everlive || {};
    window.everlive = new Everlive("tLFppRYFPl70CjCP");
    // create an object to store the models for each view

    document.addEventListener('deviceready', function () {  
        navigator.splashscreen.hide();
        var networkState = navigator.connection.type;
        if (networkState == "none") {
            navigator.notification.alert("Please, connect to Internet Network! Otherwise application won't be fully functional.",
                function () { }, "Notifier", "Ok");
        }

        document.addEventListener("offline", function () { navigator.notification.alert("Internet connection lost!", function () { }, "Notifier", "Ok") }, false);

        app = new kendo.mobile.Application(document.body, {
        
            // you can change the default transition (slide, zoom or fade)
            transition: 'slide',
            initial: 'views/new-session.html'
        });
        }, false);
}());