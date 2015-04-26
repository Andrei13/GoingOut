
var windowWidth = screen.width;
var windowHeight = screen.height;
   

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
      var key = "distance";
            var value = $( "#Distance" ).val();
            window.localStorage.setItem(key, value);

            key="types";
            value="";
            if($('#food').is(":checked"))
            {
                value+='1';
            }
              else
              {
                value+='0';
              }
            if ($('#drink').is(":checked"))
              {
                value+='1';
            }
              else
              {
                value+='0';
              }
            if ($('#dance').is(":checked"))
                {
                value+='1';
            }
              else
              {
                value+='0';
              }
            window.localStorage.setItem(key,value);
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