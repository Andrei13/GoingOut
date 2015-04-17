
var windowWidth = screen.width;
var windowHeight = screen.height;
   

    function onLoad() {
        document.addEventListener("deviceready", onDeviceReady, false);
<<<<<<< HEAD
}
		


    function onLoad() {
        document.addEventListener("deviceready", onDeviceReady, false);
		alert("device ready");

=======
		alert("device ready");
		alert(windowHeight);
		alert(windowWidth);
>>>>>>> parent of 62a4f8a... position
    }
	
	function updateDisplay() {
	
	}

<<<<<<< HEAD
=======

>>>>>>> parent of 62a4f8a... position
    // device APIs are available
    //
    function onDeviceReady() {
		alert("device ready");
        
		document.addEventListener("resume", onResume, false);
		document.addEventListener("pause", onPause, false);
		document.addEventListener("backbutton", onBackKeyDown, false);

		updateDisplay();
    }

    // Handle the pause event
    //
    function onPause() {
		alert("pause");		
		updateDisplay();
    }
	
	function onResume() {
		alert("resume");
		updateDisplay();
    }

    function onBackKeyDown() {
       navigator.app.exitApp();
}