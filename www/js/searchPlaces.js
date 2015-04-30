// : https://developers.google.com/maps/documentation/javascript/examples/

var map;
var state;
var nrPlaces;
var currentNrPlacesDisplayed;

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

function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    var service = new google.maps.places.PlacesService(map);
    nrPlaces=results.length;
    currentNrPlacesDisplayed=0;
    for (var i = 0, place; place = results[i];i++) {
         getPlaceDetails(place,service);
     }
   }
 }

function getPlaceDetails(thePlace,service)
{
    var request = {
      placeId: thePlace.place_id
     };
      service.getDetails(request,function(place,status){
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
        $('#PlacesList').append('<li id="'+place.place_id+'"><h1 style="font-size: 150%">'+
                                             place.name+rating+'</h1><p>'+
                                             myTypes+'</p><div><img src="img/star.png" style="width:20px;height:20px">Add the favourites</img></div></li>').listview('refresh');
        currentNrPlacesDisplayed++;
        if(currentNrPlacesDisplayed==nrPlaces)
        {
          $('li').click(function()
          {
             alert("clicked");
          });
        }
      }
      else if (status== google.maps.places.PlacesServiceStatus.OVER_QUERY_LIMIT)
      {

        //recall the function with a delay of 200 miliseconds in case we have the OVER_QUERY_LIMIT
        //solution provided by Paulo Rodriguez :  http://stackoverflow.com/questions/12721287/settimeout-to-avoid-over-query-limit
        setTimeout(function(){
          getPlaceDetails(thePlace,service);
        },200);
      }
      
  });

      /*
      marker = new google.maps.Marker({
      position: places[i].geometry.location,
      map: map,
      title: 'your location'});
      */
      }



    

function onBackKeyDown() {
       window.location='MainPage.html';
}

google.maps.event.addDomListener(window, 'load', initialize);
