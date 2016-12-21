$( document ).ready(function() {

  var celebArr = ["David Hasselhoff","Chuck Norris","Nic Cage","Jack Black","Tituss Burgess","Mr Bean","Christian Bale","Jim Carrey", "Steve Carrell"]

  function createButtons(){
    //creating new buttons
          
          $("#gifButtons").empty();
          // emptying the div will prevent button repeats
          for (var i = 0; i < celebArr.length; i++) {

            var a = $("<button>");
            // Adding a class
            a.addClass("funButton");
            // Adding the data attribute with the celebrity's name
            a.attr("data-celeb", celebArr[i]);
            // Providing the button's text with a value of the celeb at index i
            a.text(celebArr[i]);
            // append to the buttons div
            $("#gifButtons").append(a);
          }
        }
        //add a button using the search form & button
    $(document).on("click", "#add-celeb", function(event) {
        // event.preventDefault() prevents the form from trying to submit itself.
        event.preventDefault();
        celebArr.push($("#celeb-input").val().trim());
        console.log(celebArr);
        createButtons();
      });

  createButtons();

  $(document).on("click", ".funButton", function() {
  	
  	var topic = $(this).data('celeb');
      
      var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
          topic + "&api_key=dc6zaTOxFJmzC&limit=6";

      $.ajax({
            url: queryURL,
            method: "GET"
          }).done(function(response) {
            
            console.log(queryURL);
            console.log(response);
            
            var results = response.data;

            for (var i = 0; i < results.length; i++) {
            	var celebDiv = $('<div>');
              celebDiv.addClass('col-md-2');
              var gifLink = $("<a>").attr("href", results[i].url).attr("target","_blank").text("Rated: " + results[i].rating);
            	var p = $("<button>");
              p.addClass("ratings");
              p.html(gifLink);


              // generating images with tags
            	var celebImage = $("<img>");
            	celebImage.attr("src", results[i].images.fixed_height.url);
              celebImage.attr("alt",topic);
              celebImage.data("celeb",topic);
              celebImage.addClass("gif");
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