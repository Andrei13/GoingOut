

    function onLoad() {
        document.addEventListener("deviceready", onDeviceReady, false);
        $('#favButton').click(function()
          {
            window.location="Favourites.html";
          });
        
        $('#hisButton').click(function()
          {
            window.location="History.html";
          });

         $("#searchButton").click(function(e)
         {
            saveState();
            window.location = 'showPlaces.html';     
        });

}
    
    function saveState()
    {
      var state = {
          "distance": $( "#Distance" ).val(),
          "types":{
                   "food": $('#food').is(":checked"),
                   "drink": $('#drink').is(":checked"),
                   "dance": $('#drink').is(":checked"),
                 },
          "openNow": $('#openNowCheckbox').is(":checked")
        }   
        window.sessionStorage.setItem("state",JSON.stringify(state));
    }


    // device APIs are available
    //
    function onDeviceReady() {
		alert("device ready");
        
		document.addEventListener("resume", onResume, false);
		document.addEventListener("pause", onPause, false);
		document.addEventListener("backbutton", onBackKeyDown, false);
    }

    // Handle the pause event
    //
    function onPause() {
		alert("pause");		
		
    }
	
	function onResume() {
		alert("resume");
		
    }

    function onBackKeyDown() {
       navigator.app.exitApp();
}