//The favourites page


  function onLoad()
  {
  	document.addEventListener("backbutton", onBackKeyDown, false);

  	//Loop through all the favourites keys saved
  	var i=0;
  	while(window.localStorage.getItem("favourite"+i)!=null)
  	{
  		//get the key
  		var item = JSON.parse(window.localStorage.getItem("favourite"+i));

  		//display the information (name + schedule)
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