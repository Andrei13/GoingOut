
  function initialize()
  {
  	navigator.geolocation.getCurrentPosition(search, failPosition,{timeout:10000});
  	
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
    	placeId : window.sessionStorage.getItem("selectedPlace")
    };

    service.getDetails(request, function (place,status){
    	if (status == google.maps.places.PlacesServiceStatus.OK) {
           var marker = new google.maps.Marker({
              map: map,
              position: place.geometry.location
         });
       }
         else  if (status== google.maps.places.PlacesServiceStatus.OVER_QUERY_LIMIT)
           {

        //recall the function with a delay of 200 miliseconds in case we have the OVER_QUERY_LIMIT
        //solution provided by Paulo Rodriguez :  http://stackoverflow.com/questions/12721287/settimeout-to-avoid-over-query-limit
           setTimeout(function(){
             search(position);
           },100);
      }
    });

  }

  //called if the position is not obtained correctly
function failPosition(error) {
  alert("Your position is not available, please check your settings");
  
}

google.maps.event.addDomListener(window, 'load', initialize);