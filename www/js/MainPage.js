

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
                   "restaurant": $('#food').is(":checked"),
                   "bar": $('#drink').is(":checked"),
                   "night_club": $('#dance').is(":checked"),
                 },
          "openNow": $('#openNowCheckbox').is(":checked")
        }   
        window.sessionStorage.setItem("state",JSON.stringify(state));
    }

    function restoreState()
    {
      var state= JSON.parse(window.sessionStorage.getItem("state"));
      $( "#Distance" ).val(state.distance);

    }


    // device APIs are available
    //
    function onDeviceReady() {   
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