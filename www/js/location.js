boolean hasData=false;

//when the jQuery Mobile page is initialised
function onLoad() {
	
	//set up listener for button click
	$('#getLocationButton').on('click', getPosition);

	$('#ShowMap').on('click',showMap);
	
	//change time box to show message
	$('#time').val("Press the button to get location data");
	
}

//Call this function when you want to get the current position
function getPosition() {
	
	//change time box to show updated message
	$('#time').val("Getting data...");
	
	//instruct location service to get position with appropriate callbacks
	navigator.geolocation.getCurrentPosition(successPosition, failPosition,{timeout:20000});

}

function showMap()
{
    if(hasData==true) window.location="ShowMap.html";
}


//called when the position is successfully determined
function successPosition(position) {
	
	//You can find out more details about what the position obejct contains here:
	// http://www.w3schools.com/html/html5_geolocation.asp
	

	//lets get some stuff out of the position object
	var time = position.timestamp;
	var latitude = position.coords.latitude;
	window.localStorage.setItem("position",  JSON.stringify(position));
	hasData = true;
	//OK. Now we want to update the display with the correct values
	$('#time').val("Recieved data at " + time);
	$('#lattext').val(latitude);
	
}

//called if the position is not obtained correctly
function failPosition(error) {
	//change time box to show updated message
	$('#time').val("Error getting data: " + error);
	
}