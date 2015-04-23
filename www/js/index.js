setTimeout(function(){
       window.location='MainPage.html';             
    }, 2000);

function onLoad(){
	cordova.exec(null, null, "SplashScreen", "show", []);
	 }


