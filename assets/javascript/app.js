$('button').on('click', function() {
	
	var topic = $(this).data('celeb');
    
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
        topic + "&api_key=dc6zaTOxFJmzC&limit=1";

    $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {
          
          console.log(queryURL);
          console.log(response);
          
          var results = response.data;

          for (var i = 0; i < results.length; i++) {
          	var celebDiv = $('<div>');
          	var p = $("<p>").text("Rating: " + results[i].rating);


          	var celebImage = $("<img>");
          	celebImage.attr("src", results[i].images.fixed_height.url);

          	celebDiv.append(p);
            celebDiv.append(celebImage);

            $("#gifSpace").prepend(celebDiv);
          }

      	});
	
});
