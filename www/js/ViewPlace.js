var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var selectedPlace;

  function initialize()
  {
  	navigator.geolocation.getCurrentPosition(search, failPosition,{timeout:10000});
  	document.addEventListener("backbutton", onBackKeyDown, false);
  }

  function search(position)
  {
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

    service.getDetails(request, function (place,status){
    	if (status == google.maps.places.PlacesServiceStatus.OK) {
        $('#title').html(place.name);
            var mapOptions = {
                zoom: 12,
                center: new google.maps.LatLng(place.geometry.location.A,place.geometry.location.F)
                  };
            map = new google.maps.Map(document.getElementById('map-canvas'),
                      mapOptions);
            
           var marker = new google.maps.Marker({
              map: map,
              position: place.geometry.location
         });
          selectedPlace=place;
          var request = {
                       origin: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
                       destination:new google.maps.LatLng(place.geometry.location.A,place.geometry.location.F),
                       travelMode: google.maps.TravelMode.WALKING
                        };
         directionsService.route(request, function(response, status) {
          if (status == google.maps.DirectionsStatus.OK) {
             directionsDisplay = new google.maps.DirectionsRenderer();
             directionsDisplay.setMap(map);
             directionsDisplay.setDirections(response);
             showOpeningHours(place)
             $('#addFav').append('<img src="img/star.png" style="width:40px;height:40px">Add to favourites</img>');
             
               }
            });

         
       }
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

function showOpeningHours(place)
{
  try{
       for(var i=0;i<7;i++)
       {
        $('#openinghours').append('<li><h1 style="font-size: 150%">'+
                     place.opening_hours.weekday_text[i]+'</h1></li>').listview('refresh');
       }
     $('#addFav').click(addFavourite);
  }
  catch(error)
  {
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

function addFavourite()
{
  var ok=false;
  var i=0;
   while(ok!=true)
   {
    if(window.localStorage.getItem("favourite"+i)==null)
    {
      var details={
        "name": selectedPlace.name,
        "openinghours": new Array()
      }
      for(var i=0;i<7;i++)
      {
        details.openinghours[i]=selectedPlace.opening_hours.weekday_text[i];
      }
      window.localStorage.setItem("favourite"+i, JSON.Stringify(details));
      ok=true;
      }
      else{
        i++;
      }
    }
   }


google.maps.event.addDomListener(window, 'load', initialize);