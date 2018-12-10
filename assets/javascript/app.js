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
    

    // put the original buttons up
    object.createButtons();

    $("#addAnimal").on("click", function(event) {
        // prevents submit from submitting
        event.preventDefault();
        // log array
        console.log(object.animalArray);
        // set animal name to search value
        var animalName = $("#gif-search").val().trim();
        // checks for blank searches
        if(animalName.length === 0){
            console.log("blank search")
        } else {
        console.log(animalName);
        // add search val to animal array
        object.animalArray.push(animalName);
        // create buttons
        object.createButtons();
        }
    })
    $(".animalButton").on("click", function(){
        console.log(this, $(this).attr("data-name"));
        // get "data-name" of button (same as text on button)
        name = $(this).attr("data-name");
        var rating=null;
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=UDbW5pMSEMGrWLs5VtOojxU0gy7XVEi4&q="
        // search query
        +name
        // number of results returned
        +"&limit=10"
        +"&offset=0"
        // rating
        +"&rating=G"
        // language
        +"&lang=en";
        // ajax request
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            console.log(response);
            for (var i=0; i<response.data.length; i++){
            console.log(response.data[i].images.fixed_height.url);
            newImg =  $("<img>").attr("src", response.data[i].images.fixed_height_still.url);
            newImg.addClass("gif");
            $("#left").prepend(newImg);
            }
           
        })
        $(".gif").on("click", function(){
            console.log("gif clicked");
        })
    });


});