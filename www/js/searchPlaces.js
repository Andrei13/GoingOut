// : https://developers.google.com/maps/documentation/javascript/examples/

var map;
var state;
var nrPlaces;
var currentNrPlacesDisplayed;
var Places = new Array();
var myPos;

function initialize() {
    //get the current position of the device
    navigator.geolocation.getCurrentPosition(search, failPosition,{timeout:10000});
    document.addEventListener("backbutton", onBackKeyDown, false); 
    state =JSON.parse(window.sessionStorage.getItem("state"));
    $('.ui-content').mask("Searching");
    $('#Sortby').change(function(){
      switch($('#Sortby').val()){     
         case "Name":
          sortByName();
          $('li').remove();
          showPlaces();
          break;
         case "Rating":
           sortByRating();
           $('li').remove();
          showPlaces();
           break;
          case "Distance":
           sortByDistance();
           $('li').remove();
          showPlaces();
           break;
          default :
            alert("Wrong type");
    }
  });
}


//called if the position is not obtained correctly
function failPosition(error) {
  alert("Your position is not available, please check your settings");
  
}

function search(position) {

  myPos= new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
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
   var opened = state.openNow;
  var request = {
    location: myPos,
    radius:state.distance,
    types: Types,
    openNow : opened
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
      reference: thePlace.reference
     };
      service.getDetails(request,function(place,status){
      
   if (status== google.maps.places.PlacesServiceStatus.OK) {
    var _distance = distance(place.geometry.location.A,place.geometry.location.F,myPos.A,myPos.F);
        Places[currentNrPlacesDisplayed] = {
        "place_id":place.reference,
        "rating":place.rating,
        "types":place.types,
        "name":place.name,
        "distance": (_distance*1000) | 0
      }
        currentNrPlacesDisplayed++;
        if(currentNrPlacesDisplayed==nrPlaces)
        {
          sortByName();
          showPlaces();
          $('li').click(onPlaceClicked);
        
          $('.ui-content').unmask();
        
        }
      }
      else if (status== google.maps.places.PlacesServiceStatus.OVER_QUERY_LIMIT)
      {

        //recall the function with a delay of 200 miliseconds in case we have the OVER_QUERY_LIMIT
        //solution provided by Paulo Rodriguez :  http://stackoverflow.com/questions/12721287/settimeout-to-avoid-over-query-limit
        setTimeout(function(){
          getPlaceDetails(thePlace,service);
        },100);
      }
      
  });
      }

  function showPlaces()
    {
        for(var i=0;i<Places.length;i++)
        {
          if(Places[i].distance>state.distance)
          {
            Places.splice(i,1);
            i--;
          }
        }

        for(var i=0;i<Places.length;i++)
        {
          displayPlace(Places[i]);
        }
    }

  function sortByName()
  {
    Places.sort(function(a,b)
      {
        return a.name.localeCompare(b.name)
      });
  }

  function sortByRating()
  {
    Places.sort(function(a,b)
      {
        if(a.rating==null)
        {
          return -1;
        }
          else if (b.rating==null)
          {
            return 1;
          }
        return a.rating - b.rating;
      });
  }

  function sortByDistance()
  {
    Places.sort(function(a,b)
      {
        return a.distance-b.distance;
      });
  }

  function onPlaceClicked(e)
  {
    window.sessionStorage.setItem("selectedPlace",e.currentTarget.id);
    window.location="ViewPlace.html";
  }

  function displayPlace(place)
     {
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
                                             place.name+'</h1><h2>'+rating +'</h2><h2>'+place.distance+' meters away</h2><p>'+
                                             myTypes+'</p></li>').listview('refresh');
      }

  //method taken from : http://www.geodatasource.com/developers/javascript
  function distance(lat1, lon1, lat2, lon2) {
    var radlat1 = Math.PI * lat1/180;
    var radlat2 = Math.PI * lat2/180;
    var radlon1 = Math.PI * lon1/180;
    var radlon2 = Math.PI * lon2/180;
    var theta = lon1-lon2;
    var radtheta = Math.PI * theta/180;
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist);
    dist = dist * 180/Math.PI;
    dist = dist * 60 * 1.1515;
    dist = dist * 1.609344;

    return dist;
}

    

function onBackKeyDown() {
       window.location='MainPage.html';
}

google.maps.event.addDomListener(window, 'load', initialize);
