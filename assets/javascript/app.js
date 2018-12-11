$(document).ready(function () {
    object = {

        animalArray: ["dog", "cat", "bird"],

        createButtons: function () {
            $("#buttonArea").empty();
            for (var i = 0; i < object.animalArray.length; i++) {
                //  create new button
                var newButton = $("<button>");
                // animal name
                var newAnimal = object.animalArray[i];
                //  animalButton class
                newButton.addClass("animalButton");
                //  data is set to the animal name
                newButton.attr("data-name", newAnimal);
                //  text set to animal name
                newButton.text(newAnimal);
                //  button appended to button area
                $("#buttonArea").append(newButton);
            }
        }
    };

    // adds the first three buttons
    object.createButtons();

    // event for adding new buttons
    $("body").on("click", "#addAnimal", function (event) {
        // prevents submit from submitting
        event.preventDefault();
        // log array
        console.log(object.animalArray);
        // set animal name to search value
        var animalName = $("#gif-search").val().trim();
        // checks for blank searches
        if (animalName.length === 0) {
            console.log("blank search")
        } else {
            console.log(animalName);
            // add search val to animal array
            object.animalArray.push(animalName);
            // create buttons
            object.createButtons();
        }

    });
    // event for adding gifs
    $("header").on("click", ".animalButton", function () {
        console.log(this, $(this).attr("data-name"));
        // get "data-name" of button (same as text on button)
        name = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=UDbW5pMSEMGrWLs5VtOojxU0gy7XVEi4&q="
            // search query
            + name
            // number of results returned
            + "&limit=10"
            + "&offset=0"
            // rating
            // + "&rating="
            // + rating
            // language
            + "&lang=en";
        // ajax request
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            for (var i = 0; i < response.data.length; i++) {
                console.log(response.data[i].images.fixed_height.url, response.data[i].rating);
                // new div
                newDiv = $("<div>");
                newDiv.addClass("gifDiv");
                // create img element for gif
                newImg = $("<img>");
                // set src to a still of gif
                newImg.attr("src", response.data[i].images.fixed_height_still.url);
                // set attributes for still and animated versions of gif
                newImg.attr("data-still", response.data[i].images.fixed_height_still.url);
                newImg.attr("data-animate", response.data[i].images.fixed_height.url);
                newImg.attr("state", "still");
                // add class for click event
                newImg.addClass("gif");
                // create p element for rating
                newP = $("<p>");
                // set text of p
                newP.text("Rating: "+(response.data[i].rating).toUpperCase());
                // prepend images
                newDiv.append(newImg).prepend(newP);
                $("#left").prepend(newDiv);
                // prepend rating
            }
        })
    })
    // event for playing/pausing gifs
    $("body").on("click", ".gif", function () {
        console.log("gif clicked");
        // if state is set to still src will be set to the animated url
        if ($(this).attr("state") === "still") {
            animate = $(this).attr("data-animate");
            $(this).attr("src", animate);
            $(this).attr("state", "animate");
        }
        // else src will be set to the still url
        else {
            still = $(this).attr("data-still");
            $(this).attr("src", still);
            $(this).attr("state", "still");
        }
    });

});