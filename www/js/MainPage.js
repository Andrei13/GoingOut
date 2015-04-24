
var windowWidth = screen.width;
var windowHeight = screen.height;
   

    function onLoad() {
        document.addEventListener("deviceready", onDeviceReady, false);
         $("#searchButton").click(function(e)
         {
            var key = "distance";
            var value = $( "#Distance" ).val();
            window.localStorage.setItem(key, value);

            key="types";
            value=null;
            if($('#food').is(":checked"))
            {
                value.push('restaurant');
            }
            if ($('#drink').is(":checked"))
              {
                value.push('bar');
              }
            if ($('#dance').is(":checked"))
                {
                    value.push('night_club');   
                }
            window.localStorage.setItem(key,value);
            window.location = 'showPlaces.html';

            
        });

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