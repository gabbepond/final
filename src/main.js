const moviesUL = document.querySelector('#results'); // Matches the #results container in index.html
const newMovieTextBox = document.querySelector('#searchInput'); // Reusing the search input
const newMovieBtn = document.querySelector('#theButton'); // Reuse the button for adding movies

// Function to display movies in the list
function displayMovies(movies) {
  moviesUL.innerHTML = ''; // Clear the current list
  movies.forEach((movie) => {
    const movieLI = document.createElement('li');
    movieLI.className = 'p-4 border border-gray-300 rounded shadow-md flex flex-col items-center';

    // Use innerHTML to include movie details
    movieLI.innerHTML = `
      <h3 class="text-lg font-bold">${movie.title}</h3>
      <p>Year: ${movie.year}</p>
      <p>Rating: ${movie.rating || 'N/A'}</p>
      <p>Genre: ${movie.genre || 'N/A'}</p>
      <p>${movie.favorite ? '❤️ Favorite' : ''}</p>
    `;

    moviesUL.appendChild(movieLI);
  });
}

// Fetch movies and display them
fetch('/api/getMovies')
  .then((res) => res.json())
  .then((data) => {
    displayMovies(data);
  })
  .catch((error) => {
    console.error('Error fetching movies:', error);
    moviesUL.innerHTML = `<p class='text-red-500'>Error fetching movies. Please try again later.</p>`;
  });

// Add a new movie (e.g., to the database)
newMovieBtn.addEventListener('click', () => {
  const movieTitle = newMovieTextBox.value;

  // Validate input
  if (!movieTitle.trim()) {
    alert('Please enter a valid movie title.');
    return;
  }

  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');

  const requestBody = {
    title: movieTitle,
    imdbId: `tt${Math.floor(Math.random() * 1000000)}`, // Randomly generate a dummy IMDb ID
    year: '2024',
    description: 'Description goes here.',
    genre: 'Action',
    rating: 5, // Default rating
    favorite: false,
    userName: 'guest', // Default username
  };

  // Send POST request to add movie
  fetch('/api/addMovie', {
    method: 'POST',
    body: JSON.stringify(requestBody),
    headers: myHeaders,
  })
    .then((res) => res.json())
    .then((newMovie) => {
      // Append the new movie to the list
      fetch('/api/getMovies')
        .then((res) => res.json())
        .then((data) => {
          displayMovies(data);
        });
    })
    .catch((error) => {
      console.error('Error adding movie:', error);
    });
});