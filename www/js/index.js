
//Open the main page after 2 seconds
function onLoad(){
	//cordova.exec(null, null, "SplashScreen", "show", []);
	setTimeout(function(){
       window.location='MainPage.html';             
    }, 2000);
	 }


