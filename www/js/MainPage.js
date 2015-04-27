

    function onLoad() {
      restoreState();
        if(window.localStorage.getItem("firstuse")==null)
           {
            window.localStorage.setItem("firstuse","false");
           }
        document.addEventListener("deviceready", onDeviceReady, false);
        $('#favButton').click(function()
          {
            saveState();
            window.location="Favourites.html";
          });
        
        $('#hisButton').click(function()
          {
            saveState();
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
                   "restaurant": $('#restaurant').is(":checked"),
                   "bar": $('#bar').is(":checked"),
                   "night_club": $('#night_club').is(":checked"),
                 },
          "openNow": $('#openNowCheckbox').is(":checked")
        }   
        window.sessionStorage.setItem("state",JSON.stringify(state));
    }

    function restoreState()
    {
      var state= JSON.parse(window.sessionStorage.getItem("state"));
      if(state!=null)
      {

      $( "#Distance" ).html(state.distance);
      for(var key in state.types)
       {
          if(state.types[key])
        {
           $('#'+key).attr("checked");
        }
      }
}

    }

    // device APIs are available
    //
    function onDeviceReady() {   
    if(window.localStorage.getItem("firstuse")=="false")
    {
        alert("welcome");
        window.localStorage.setItem("firstuse","true");
    }	
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