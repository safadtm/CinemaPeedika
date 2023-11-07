// script.js
// Fetch movie data from movies.json
fetch("movies.json")
    .then(response => response.json())
    .then(movieData => {
        // Call the function to populate movie details
        populateMovieDetails(movieData);
    })
    .catch(error => {
        console.error("Error fetching movie data:", error);
    });

// Function to populate movie details
function populateMovieDetails(movieData) {
    document.getElementById("movieTitle").textContent = movieData.title;
    document.getElementById("movieRating").textContent = movieData.rating;
    document.getElementById("moviePoster").src = movieData.posterURL;
    document.getElementById("movieTrailer").src = movieData.trailerURL;
    var genreButtons = document.getElementById("movieGenres");
    movieData.genre.forEach(function(genre) {
        var button = document.createElement("button");
        button.className = "transparent-button";
        button.textContent = genre;
        genreButtons.appendChild(button);
    });
    document.getElementById("movieDescription").textContent = movieData.description;
    document.getElementById("movieDirector").textContent = movieData.director;
    document.getElementById("movieWriters").textContent = movieData.writers.join(" • ");
    document.getElementById("movieActors").textContent = movieData.actors.join(" • ");
    var productionCompanyInfo = document.getElementById("productionCompanyInfo");
    productionCompanyInfo.href = movieData.details[0].productionCompanyInfo;
}

