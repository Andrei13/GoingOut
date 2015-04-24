//Examples code : https://developers.google.com/maps/documentation/javascript/examples/

var map;

function initialize() {
    //get the current position of the device
    navigator.geolocation.getCurrentPosition(search, failPosition,{timeout:10000});
    document.addEventListener("backbutton", onBackKeyDown, false);   
}


//called if the position is not obtained correctly
function failPosition(error) {
  alert("Your position is not available, please check your settings");
  
}

function search(position) {
  var lat = position.coords.latitude;
  var lon = position.coords.longitude;
  var myPos= new google.maps.LatLng(lat, lon);
  var mapOptions = {
    zoom: 12,
    center: new google.maps.LatLng(lat, lon)
  };
  map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);

  var marker = new google.maps.Marker({
  position: myPos,
  map: map,
  title: 'your location'});

  var request = {
    location: myPos,
    radius: String(window.localStorage.getItem("distance")),
    types: window.localStorage.getItem("types")

  };

  var service = new google.maps.places.PlacesService(map);
  service.radarSearch(request, callback);
  $('li').click(function()
        {
          alert("clicked");
        })
}

function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      
      var place = results[i];
      marker = new google.maps.Marker({
      position: results[i].geometry.location,
      map: map,
      title: 'your location'});

     var request = {
      placeId: results[i].place_id
     };

     var service = new google.maps.places.PlacesService(map);
     service.getDetails(request,function(place,status){
   if (status== google.maps.places.PlacesServiceStatus.OK) {
        var name=place.name;
        $('#PlacesList').append('<li data="'+place.place_id+'"><h1>'+name+'</h1></li>').listview('refresh');
   }
  })

      }
}
}
    

function onBackKeyDown() {
       window.location='mainPage.html';
       alert("aa");
}

google.maps.event.addDomListener(window, 'load', initialize);
