
  function onLoad()
  {
  	document.addEventListener("backbutton", onBackKeyDown, false); 
  	var history = JSON.parse(window.localStorage.getItem("history"));
  	for(var i=0;i<history.places.length;i++)
  	{
  		$('#historylist').append('<li id="'+history.places[i].reference+'">'+history.places[i].text+'</li>').listview('refresh');
  	}
  	$('li').click(function(e)
  	{
        window.sessionStorage.setItem("selectedPlace",e.currentTarget.id);
        window.location="ViewPlace.html";
  	});

  }

  function onBackKeyDown() {
       window.location='MainPage.html';
}