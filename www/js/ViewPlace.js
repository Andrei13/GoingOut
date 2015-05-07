
//a service used to display the directions
var directionsDisplay;
var directionsService = new google.maps.DirectionsService();

//the place the user has selected and its displayed in this page
var selectedPlace;

  function initialize()
  {
    //get the current position
  	navigator.geolocation.getCurrentPosition(search, failPosition,{timeout:10000});
  	document.addEventListener("backbutton", onBackKeyDown, false);
  }

  function search(position)
  {
    //create the map
  	var mapOptions = {
    zoom: 12,
    center: new google.maps.LatLng(position.coords.latitude, position.coords.longitude)
  };
    map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);
    var service = new google.maps.places.PlacesService(map);

    var request={
    	reference : window.sessionStorage.getItem("selectedPlace")
    };
     
     //request details about the select place
    service.getDetails(request, function (place,status){

      //if the call is sucessful
    	if (status == google.maps.places.PlacesServiceStatus.OK) {

        //put the name of the place as the title of the page
        $('#title').html(place.name);
            /*
            //center the map on the selected place
            var mapOptions = {
                zoom: 12,
                center: new google.maps.LatLng(place.geometry.location.A,place.geometry.location.F)
                  };
            map = new google.maps.Map(document.getElementById('map-canvas'),
                      mapOptions);
            */

          //create a marker of the place
           var marker = new google.maps.Marker({
              map: map,
              position: place.geometry.location
         });

           //save the place with all its details
          selectedPlace=place;

          //request for the direction service
          var request = {
                       origin: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
                       destination:new google.maps.LatLng(place.geometry.location.A,place.geometry.location.F),
                       travelMode: google.maps.TravelMode.WALKING    //route by walking
                        };
          //request the route
         directionsService.route(request, function(response, status) {

          //if the call is successful
          if (status == google.maps.DirectionsStatus.OK) {

             //display the route
             directionsDisplay = new google.maps.DirectionsRenderer();
             directionsDisplay.setMap(map);
             directionsDisplay.setDirections(response);

             //display the opening hours
             showOpeningHours(place)

             //add the "Add to favourites" element
             $('#addFav').append('<img src="img/star.png" style="width:40px;height:40px">Add to favourites</img>');
             
               }
            });

         
       }
       //if the call is unsuccessful
         else  if (status== google.maps.places.PlacesServiceStatus.OVER_QUERY_LIMIT)
           {

        //recall the function with a delay of 100 miliseconds in case we have the OVER_QUERY_LIMIT
        //solution provided by Paulo Rodriguez :  http://stackoverflow.com/questions/12721287/settimeout-to-avoid-over-query-limit
           setTimeout(function(){
             search(position);
           },100);
      }
    });

  }

//show the opening hours of a place
function showOpeningHours(place)
{
  try{
        //display the opening hours
       for(var i=0;i<7;i++)
       {
        $('#openinghours').append('<li><h1 style="font-size: 110%">'+
                     place.opening_hours.weekday_text[i]+'</h1></li>').listview('refresh');
       }
       //add the click event on the "Add to favourites" element
     $('#addFav').click(addFavourite);
  }
  //if the opening hours are not available
  catch(error)
  {
    //display
    $('#openinghours').html("No opening hours available");
  }
}

  //called if the position is not obtained correctly
function failPosition(error) {
  alert("Your position is not available, please check your settings");
  
}

function onBackKeyDown() {
       window.location='showPlaces.html';
}

//handler for the click event of the "add to favourites" element
function addFavourite()
{
  var ok=false;
  var i=0;
   //search until we fing an empty favourite key
   while(ok!=true)
   {
    if(window.localStorage.getItem("favourite"+i)==null)
    {
      //save the details
      var details={
        "name": selectedPlace.name,
        "openinghours": selectedPlace.opening_hours.weekday_text
      }
      //add the key
      window.localStorage.setItem("favourite"+i, JSON.stringify(details));
      ok=true;
      alert("Added to favourites");
      }
      else{
        //check if the selected place is already in the favourites list
        var s=JSON.parse(window.localStorage.getItem("favourite"+i));
        if(s.name==selectedPlace.name)
        {
          return 0;
        }
        i++;
      }
    }
   }


google.maps.event.addDomListener(window, 'load', initialize);