//Examples code : https://developers.google.com/maps/documentation/javascript/examples/

var map;
var state;

function initialize() {
    //get the current position of the device
    navigator.geolocation.getCurrentPosition(search, failPosition,{timeout:10000});
    document.addEventListener("backbutton", onBackKeyDown, false); 
    state =JSON.parse(window.sessionStorage.getItem("state"));
}


//called if the position is not obtained correctly
function failPosition(error) {
  alert("Your position is not available, please check your settings");
  
}

function search(position) {

  var myPos= new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
  var mapOptions = {
    zoom: 12,
    center: myPos
  };
  map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);

   var Types=new Array();
   for(var key in state.types)
   {
    if(state.types[key])
    {
      Types.push(String(key));
    }
   }
  var request = {
    location: myPos,
    radius:state.distance,
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
     nextPlace=places[i].place_id;
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
        var rating;
        if(place.rating!=null)
        {
          rating = ' ('+place.rating+'/5)';
        }
        else
        {
          rating = ' (rating not available)';
        }
        var myTypes=place.types;
        myTypes[myTypes.length-1]="";
        //var photos =PlacePhoto.getUrl("https://maps.googleapis.com/maps/api/place/photo?maxwidth=200&photoreference="+place.reference+"&key=AIzaSyDF1zioHATJVABiPqEK8mSB0fvhCj4hsV0");
        $('#PlacesList').append('<li data="'+place.place_id+'"><h1 style="font-size: 150%">'+
                                             place.name+rating+'</h1><p>'+
                                             myTypes+'</p><div><img src="img/star.png" style="width:20px;height:20px">Add the favourites</img></div></li>').listview('refresh');
        console.log(place.place_id);
      }
      
  }
    

function onBackKeyDown() {
       window.location='MainPage.html';
}

google.maps.event.addDomListener(window, 'load', initialize);
