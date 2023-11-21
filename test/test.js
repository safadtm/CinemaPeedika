document.addEventListener('DOMContentLoaded', function() {
    const movieTitle = document.getElementById('movieTitle');
    const showDetails = document.getElementById('showDetails');

    // Function to extract URL parameters
    function getParameterByName(name) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name);
    }

    // Retrieve parameters and update HTML elements
    const movie = getParameterByName('movie');
    const theatre = getParameterByName('theatre');
    const date = getParameterByName('date');
    const time = getParameterByName('time');
    const confirmationNumber = getParameterByName('confirmationNumber'); // Example parameter

    movieTitle.textContent = movie || 'Movie Name';
    showDetails.textContent = `${theatre || 'Theatre Name'} | ${date || 'Date'} | ${time || 'Time'}`;
    document.getElementById('confirmationNumber').textContent = confirmationNumber || 'ABC123';
});
