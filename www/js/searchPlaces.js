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

   var Types=new Array();
   var ty = window.localStorage.getItem("types");
   if(ty[0]!='0')
   {
    Types.push('restaurant');
   }
   if(ty[1]!='0')
   {
    Types.push('bar');
   }
   if(ty[2]!=0)
   {
    Types.push('night_club');
   }
  var request = {
    location: myPos,
    radius: String(window.localStorage.getItem("distance")),
    types: Types

  };

  var service = new google.maps.places.PlacesService(map);
  service.radarSearch(request, callback);
  
}

function callback(results, status, pagination) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {

    getPlacesDetails(results); 

    if (pagination.hasNextPage) {
      sleep:2;
      pagination.nextPage();
    }
  else
  {
     $('li').click(function()
        {
          alert("clicked");
        })
  }
  
  
}
}

function getPlacesDetails(places)
{
  for (var i = 0, place; place = places[i];i++) {
    var request = {
      placeId: places[i].place_id
     };

     var service = new google.maps.places.PlacesService(map);
     service.getDetails(request,placesCallBack);

      marker = new google.maps.Marker({
      position: places[i].geometry.location,
      map: map,
      title: 'your location'});
      }
}
function placesCallBack(place,status){
   if (status== google.maps.places.PlacesServiceStatus.OK) {
        var name=place.name;
        $('#PlacesList').append('<li data="'+place.place_id+'"><h1>'+name+'</h1></li>').listview('refresh');
        console.log(place.place_id);
 }
  }
    

function onBackKeyDown() {
       window.location='MainPage.html';
}

google.maps.event.addDomListener(window, 'load', initialize);
