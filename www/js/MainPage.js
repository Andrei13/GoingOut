
    function onLoad() {
        document.addEventListener("deviceready", onDeviceReady, false);
		alert("device ready");
    }
	
	function updateDisplay() {
	
	}


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