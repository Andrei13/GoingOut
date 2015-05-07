//This is the code that controls the main window of the application
//In here the user inputs all of his preferences for the search

  //This function is called after the page has loaded
    function onLoad() {

    //Restore the state of the main page
    //This is mainly used when the user goes back to the main page from another page 
    //so that the user inputs are preserved
      restoreState();

      //Create a key in the local storage to check if the user uses this app for the frist time
        if(window.localStorage.getItem("firstuse")==null)
           {
            window.localStorage.setItem("firstuse","false");
           }

       //Event listener for when the device is ready to be used
        document.addEventListener("deviceready", onDeviceReady, false);

      //Click event for the Favourite button
        $('#favButton').click(function()
          {
            //save the state of this page
            saveState();

            //change the window to the Favourites window
            window.location="Favourites.html";
          });
        
        //Click event for the History button
        $('#hisButton').click(function()
          {
            saveState();
            window.location="History.html";
          });

         //Click event for the Search button
         $("#searchButton").click(function(e)
         {
            saveState();
            window.location = 'showPlaces.html';     
        });

}
    
    //Save the state of this page
    function saveState()
    {
      //save the state as a JSON obj
      var state = {
          "distance": $( "#Distance" ).val(),
          "types":{
                   "restaurant": $('#restaurant').is(":checked"),
                   "bar": $('#bar').is(":checked"),
                   "night_club": $('#night_club').is(":checked"),
                 },
          "openNow": $('#openNowCheckbox').is(":checked")
        } 

        //store the state as a key
        window.sessionStorage.setItem("state",JSON.stringify(state));
    }

    //Restore the state of this page
    function restoreState()
    {
      //Transform the state to a JSON obj
      var state= JSON.parse(window.sessionStorage.getItem("state"));


      if(state!=null)
      {
         //set the distance
         $( "#Distance" ).val(String(state.distance));
         $("#Distance").selectmenu('refresh');

         //set the types
         for(var key in state.types)
           {
             if(state.types[key])
               {
                 $('#'+key).prop("checked",true).checkboxradio().checkboxradio('refresh');


               }
            }
       }

    }

    // device APIs are available
    //
    function onDeviceReady() {   

    //A message to appear only when the user uses the app for the first time
    if(window.localStorage.getItem("firstuse")=="false")
    {
        alert("Welcome to GoingOut. You can search for places around, just select the distance and the types you want."+
              " Also you can add places to favourites and you will be able to see their opening hours without an internet connection!");
        window.localStorage.setItem("firstuse","true");
    }	
    document.addEventListener("resume", onResume, false);
		document.addEventListener("pause", onPause, false);
		document.addEventListener("backbutton", onBackKeyDown, false);
    }

    // Handle the pause event
    //
    function onPause() {
	
    }
	  
    //Handler the resume event
	function onResume() {
		
    }
     
     //handler the backkey event
    function onBackKeyDown() {
       navigator.app.exitApp();
}