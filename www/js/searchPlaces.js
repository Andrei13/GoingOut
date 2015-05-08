// : https://developers.google.com/maps/documentation/javascript/examples/

//a map used for the searches (not displayed)
var map;

//the state of the app from the previous page
var state;

//the number of places found by the search (they don't have any information)
var nrPlaces;

//how many places have been handled(requesting details about them)
var currentNrPlaces;

//the places with the required details
var Places = new Array();

//the position of the device when the search has started
var myPos;

function initialize() {
    //get the current position of the device
    navigator.geolocation.getCurrentPosition(search, failPosition,{timeout:10000});

    //add event for the backbutton
    document.addEventListener("backbutton", onBackKeyDown, false); 

    //get the state of the app, saved in the previous page
    state =JSON.parse(window.sessionStorage.getItem("state"));

    //mask the contents of the page until the search is completed
    //Source: https://code.google.com/p/jquery-loadmask/downloads/detail?name=jquery-loadmask-0.4.zip
    $('.ui-content').mask("Searching");

    //add event listener for the Sortby dropmenu
    $('#Sortby').change(function(){
      switch($('#Sortby').val()){   

        //if the user wants to sort by name  
         case "Name":
          //sort the places
          sortByName();
          //remove the old display
          $('li').remove();
          //display in the new order
          showPlaces();
          break;

          //if the user wants to sort by name  
         case "Rating":
           sortByRating();
           $('li').remove();
          showPlaces();
           break;

           //if the user wants to sort by name  
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

//called when your position is obtained
//begin the search
function search(position) {
  
  //get the position in google maps format
  //we need to create a map even though we don't have to display it
  myPos= new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
  var mapOptions = {
    zoom: 12,
    center: myPos
  };
  map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);

  //get the types of places the user wants, from the state
   var Types=new Array();
   for(var key in state.types)
   {
    if(state.types[key])
    {
      Types.push(String(key));
    }
   }

   //get if the user wants all the places to be opened at the moment of the search
   var opened = state.openNow;

   //request for the search
  var request = {
    location: myPos,
    radius:state.distance,
    types: Types,
    openNow : opened
  };
  
  //start the search
  var service = new google.maps.places.PlacesService(map);
  service.radarSearch(request, callback);
  
}

//called when the search has finished 
function callback(results, status) {

  //if the search was successful
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    var service = new google.maps.places.PlacesService(map);

    //save the number of places found
    nrPlaces=results.length;

    currentNrPlaces=0;

    //loop through all the places found and get more details
    for (var i = 0, place; place = results[i];i++) {
         getPlaceDetails(place,service);
     }
   }
 }

//get the details about a place
function getPlaceDetails(thePlace,service)
{
  //the reference of the place, needed for getting the details
    var request = {
      reference: thePlace.reference
     };
      service.getDetails(request,function(place,status){
      
      //if the getting details call is successful
   if (status== google.maps.places.PlacesServiceStatus.OK) {

        //calculate the distance to that place
        var _distance = distance(place.geometry.location.A,place.geometry.location.F,myPos.A,myPos.F);

        //save the details we need about each place (reference,rating,types,name,distance)
        Places[currentNrPlaces] = {
        "place_id":place.reference,
        "rating":place.rating,
        "types":place.types,
        "name":place.name,
        "distance": (_distance*1000) | 0    //convert to meters
      }

        //increase the number of places processed
        currentNrPlaces++;

        //if all the places have been processed
        if(currentNrPlaces==nrPlaces)
        {
          //sort them by name
          sortByName();

          //show them
          showPlaces();

          //add an event listener for each of the displayed places
          $('li').click(onPlaceClicked);
        
          //unmask the elements
          $('.ui-content').unmask();
        
        }
      }
      //if the getting details call is not successful, check if the reason is the query limit
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

  //show the places
  function showPlaces()
    {
        for(var i=0;i<Places.length;i++)
        {
          //check if the distance is the one required by the user
          if(Places[i].distance>state.distance)
          {
            Places.splice(i,1);
            i--;
          }
        }
        
        //display the places
        for(var i=0;i<Places.length;i++)
        {
          displayPlace(Places[i]);
        }
    }

    //display a place
    function displayPlace(place)
     {
        //format the rating
        var rating;
        if(place.rating!=null)
        {
          rating = ' ('+place.rating+'/5)';
        }
        else
        {
          rating = ' (rating not available)';
        }

        //delete the last type, which is "establishment", we don't need it
        var myTypes=place.types;
        myTypes[myTypes.length-1]="";

        
        //display the place as a 'li'
        $('#PlacesList').append('<li id="'+place.place_id+'"><h1 style="font-size: 150%">'+
                                             place.name+'</h1><h2>'+rating +'</h2><h2>'+place.distance+' meters away</h2><p>'+
                                             myTypes+'</p></li>').listview('refresh');
      }

  
  //sort the places by their names
  function sortByName()
  {
    Places.sort(function(a,b)
      {
        return a.name.localeCompare(b.name)
      });
  }

  //sort the places by their rating
  function sortByRating()
  {
    Places.sort(function(a,b)
      {
        if(a.rating==null)
        {
          return 1;
        }
          else if (b.rating==null)
          {
            return -1;
          }
        return b.rating - a.rating;
      });
  }
  
  //sort the places by the distance to the user
  function sortByDistance()
  {
    Places.sort(function(a,b)
      {
        return a.distance-b.distance;
      });
  }
  
  //called when the user select a place
  function onPlaceClicked(e)
  {
    //save the reference of the selected place
    window.sessionStorage.setItem("selectedPlace",e.currentTarget.id);
    
    //add to history
    var his = JSON.parse(window.localStorage.getItem("history"));
    if(his==null)
    {
       his={
        "places":new Array()
       }
    }
    var selectedPlace = {
        "reference":e.currentTarget.id,
        "text":e.currentTarget.innerText.substr(0, addy.indexOf('\n'))
    }
    his.places.push(selectedPlace);
    window.localStorage.setItem("history",JSON.stringify(his));
     
    //open a new window where the user will see more details
    window.location="ViewPlace.html";
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
