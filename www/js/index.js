setTimeout(function(){
       window.location='mainPage.html';             
    }, 2000);

function onLoad(){
	cordova.exec(null, null, "SplashScreen", "show", []);
	 }


