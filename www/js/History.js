
  function onLoad()
  {
  	document.addEventListener("backbutton", onBackKeyDown, false); 
  	var history = JSON.parse(window.localStorage.getItem("history"));
  	for(var i=0;i<history.places.length)
  	{
  		$('#historylist').append('<li id="'+history.place[i].id+'">'+history.places[i].text+'</h1>');
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