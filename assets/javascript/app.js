$(document).ready(function () {
    main = {
        giphy: {
            endPoint: "https://api.giphy.com/v1/gifs/search?",
            apiKey: "api_key=UDbW5pMSEMGrWLs5VtOojxU0gy7XVEi4",
            // query: "&q=",
            limit: "10",
            rating: "PG-13",
            offset: 0,
            queryURL: function (q) {
                url = this.endPoint + this.apiKey + "&q=" + q + "&offset=" + String(this.offset) + "&limit=" + this.limit + "&rating=" + this.rating + "&lang=en";
                return url;
            },
            animals: ["dog", "cat", "skunk", "frog", "elephant", "tiger", "penguin", "possum", "squid"],
        },
        // ombd : {
        //     endPoint: "http://www.omdbapi.com/?",
        //     apiKey: "apikey=1fd69c48",
        //     title: null,
        //     date: null,
        //     actors: null,
        // },
        // weather: {
        //     endPoint: "api.openweathermap.org/data/2.5/?",
        //     apiKey: "&APPID=dd5025ef1194ce2c2d44bb1093f81102",
        //     queryURL: function (q) {
        //         url = this.endPoint+"q=" + q + this.apiKey;
        //         return url;
        //     },

        // },
        // empty array used for creating buttons
        topics: [],
        setTopic: function (array) {
            console.log(array);
            main.topics = array;
        },
        createButtons: function () {
            $("#buttonArea").empty();
            for (let i = 0; i < main.topics.length; i++) {
                //  create new button
                var newButton = $("<button>");
                // animal name
                var newTopic = main.topics[i].toUpperCase();
                //  topicButton class
                newButton.addClass("topicButton button");
                //  data is set to the animal name
                newButton.attr("data-name", newTopic);
                //  text set to animal name
                newButton.text(newTopic);
                //  button appended to button area
                $("#buttonArea").append(newButton);
            }
        },
        clearGifs: function () {
            $("#left").empty();
        }
    };

    // set topic array
    main.setTopic(main.giphy.animals);
    // adds the first buttons
    main.createButtons();

    // event for adding new buttons from input bar
    $("body").on("click", "#addButton", function (event) {
        event.preventDefault();

        // set variable to search value
        let inputVal = $("#gif-search").val().trim();
        // checks for blank searches
        if (inputVal.length === 0) {
            console.log("blank search");
        }
        // check if input is already in array
        else if (main.topics.indexOf(inputVal) != -1) {
            console.log("button already exists");
        }
        else {
            console.log(inputVal);
            // add search val to topic array
            main.topics.push(inputVal);
            // create buttons
            main.createButtons();
        }
        // clear search bar
        $("#gif-search").val(null);
    });
    // for clearing buttons
    $("body").on("click", "#clearButton", function (event) {
        // prevents submit from submitting
        event.preventDefault();
        main.clearGifs();
    });
    // event for adding gifs
    $("body").on("click", ".topicButton", function () {
        console.log("clicked");
        // get "data-name" of button (matches text on button)
        let name = $(this).data("name");
        // ajax request
        $.ajax({
            url: main.giphy.queryURL(name),
            method: "GET"
        }).then(function (response) {
            console.log(response);
            // increase offset so that a repeat button press will add new gifs
            main.giphy.offset = main.giphy.offset + 10;

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
                newP.text("Rating: " + (response.data[i].rating).toUpperCase());
                // prepend images
                newDiv.append(newImg);
                newImg.before(newP);
                $("#left").prepend(newDiv);
            }
        });
    });
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