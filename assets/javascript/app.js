$( document ).ready(function() {

  var celebArr = ["David Hasselhoff","Chuck Norris","Nic Cage","Jack Black"]

  function createButtons(){
    // Deleting the movie buttons prior to adding new movie buttons
          // (this is necessary otherwise we will have repeat buttons)
          $("#gifButtons").empty();
          // Looping through the array of movies
          for (var i = 0; i < celebArr.length; i++) {
            // Then dynamicaly generating buttons for each movie in the array.
            // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
            var a = $("<button>");
            // Adding a class
            a.addClass("funButton");
            // Adding a data-attribute with a value of the movie at index i
            a.attr("data-celeb", celebArr[i]);
            // Providing the button's text with a value of the movie at index i
            a.text(celebArr[i]);
            // Adding the button to the HTML
            $("#gifButtons").append(a);
          }
        }
        // This function handles events where one button is clicked
    $("#add-celeb").on("click", function(event) {
        // event.preventDefault() prevents the form from trying to submit itself.
        // We're using a form so that the user can hit enter instead of clicking the button if they want
        event.preventDefault();
        debugger;
        // The movie from the textbox is then added to our array
        celebArr.push($("#celeb-input").val().trim());
        // calling renderButtons which handles the processing of our movie array
        createButtons();
      });
  createButtons();

  $('button').on('click', function() {
  	
  	var topic = $(this).data('celeb');
      
      var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
          topic + "&api_key=dc6zaTOxFJmzC&limit=3";

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
              celebImage.attr("alt",topic);
              celebImage.data("celeb",topic);
              celebImage.data("still",results[i].images.fixed_height_still.url);
              celebImage.data("animate",results[i].images.fixed_height.url);
            	celebDiv.append(p);
              celebDiv.append(celebImage);

              $("#gifSpace").prepend(celebDiv);

            }

            // pausing the gifs on click
              $("img").on("click", function() {
                  console.log(this);
                  var state = $(this).attr("data-state");
                  if (state === "still") {
                    $(this).attr("src", $(this).data("animate"));
                    $(this).attr("data-state", "animate");
                  } else {
                    
                    $(this).attr("src", $(this).data("still"));
                    $(this).attr("data-state", "still");
                  }
                });//close on-click event for images
            
        	});// close .done function response
  
  });// Close on click event for button


})// close document.ready