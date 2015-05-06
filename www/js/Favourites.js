
  function onLoad()
  {
  	document.addEventListener("backbutton", onBackKeyDown, false);
  	var i=0;
  	while(window.localStorage.getItem("favourite"+i)!=null)
  	{
  		var item = window.localStorage.getItem("favourite"+i);
  		$('#placesList').append('<li id="favourite"'+i+'><h1>'+item.name+'</h1></li>').listview('refresh');
  		for(var j=0;j<7;j++)
         {
           $('#favourite'+i).append('<li><h1 style="font-size: 50%">'+
                     item.openinghours[j]+'</h1></li>').listview('refresh');
          } 
          i++;
  }
}

  function onBackKeyDown() {
       window.location='MainPage.html';
}