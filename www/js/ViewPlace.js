var directionsDisplay;
var directionsService = new google.maps.DirectionsService();

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
            var mapOptions = {
                zoom: 12,
                center: new google.maps.LatLng(place.geometry.location.j,place.geometry.location.C)
                  };
            map = new google.maps.Map(document.getElementById('map-canvas'),
                      mapOptions);
            
           var marker = new google.maps.Marker({
              map: map,
              position: place.geometry.location
         });

          var request = {
                       origin: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
                       destination:new google.maps.LatLng(place.geometry.location.j,place.geometry.location.C),
                       travelMode: google.maps.TravelMode.WALKING
                        };
         directionsService.route(request, function(response, status) {
          if (status == google.maps.DirectionsStatus.OK) {
             directionsDisplay = new google.maps.DirectionsRenderer();
             directionsDisplay.setMap(map);
             directionsDisplay.setDirections(response);
             showOpeningHours(place)
             $('#schedule').append('<div><img src="img/star.png" style="width:40px;height:40px">Add the favourites</img></div>');
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
  if(place.opening_hours.weekday_text[0]!=null && place.opening_hours.weekday_text[0]!="")
  {
       for(var i=0;i<7;i++)
       {
        $('#openinghours').append('<li><h1 style="font-size: 150%>'+
                     place.opening_hours.weekday_text[i]+'</h1></li>').listview('refresh');
       }
  }
  else
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

google.maps.event.addDomListener(window, 'load', initialize);