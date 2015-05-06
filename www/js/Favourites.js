
  function onLoad()
  {
  	document.addEventListener("backbutton", onBackKeyDown, false);
  	var i=0;
  	while(window.localStorage.getItem("favourite"+i)!=null)
  	{
  		var item = JSON.parse(window.localStorage.getItem("favourite"+i));
  		$('#placesList').append('<li id="favourite"'+i+'><h1>'+item.name+
  			                              '</h1><h1 style="font-size: 50%">'+
                     item.openinghours[0]+'</h1><h1 style="font-size: 50%">'+
                     item.openinghours[1]+'</h1><h1 style="font-size: 50%">'+
                     item.openinghours[2]+'</h1><h1 style="font-size: 50%">'+
                     item.openinghours[3]+'</h1><h1 style="font-size: 50%">'+
                     item.openinghours[4]+'</h1><h1 style="font-size: 50%">'+
                     item.openinghours[5]+'</h1><h1 style="font-size: 50%">'+
                     item.openinghours[6]+'</h1></li>').listview('refresh');
          i++;
  }
}

  function onBackKeyDown() {
       window.location='MainPage.html';
}