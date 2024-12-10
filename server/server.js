const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();



// Secure the password and URI
const password = encodeURIComponent('Mjamjam7');
//const uri = `<your URI here to connect>`;
const uri = "mongodb+srv://gabbepond:<password>@cluster0.cvuv9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const app = express();
const port = 3000;

// Parse JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define the Movie model
const Movie = mongoose.model('Movie', {
  title: String,
  imdbId: String,
  year: String,
  description: String,
  genre: String,
  rating: String,
  favorite: Boolean,
  userName: String,
});

// Serve static files from the public folder
app.use(express.static('public'));

// Get the list of movies from the API
app.get('/api/getMovies', async (req, res) => {
  try {
    // Fetch all movies from the database
    const movies = await Movie.find();
    res.send(movies);
  } catch (error) {
    console.error('Error fetching movies:', error);
    res.status(500).send({ error: 'Failed to fetch movies' });
  }
});

// Add a movie to the watchlist
app.post('/api/addMovie', async (req, res) => {
  try {
    const { title, imdbId, year, description, genre, rating, favorite, userName } = req.body;

    // Create a new movie entry
    const newMovie = new Movie({
      title,
      imdbId,
      year,
      description,
      genre,
      rating,
      favorite,
      userName,
    });

    const savedMovie = await newMovie.save();
    res.send(savedMovie);
  } catch (error) {
    console.error('Error adding movie:', error);
    res.status(500).send({ error: 'Failed to add movie' });
  }
});

// Update the favorite status of a movie
app.patch('/api/updateFavorite/:id', async (req, res) => {
  try {
    const movieId = req.params.id;
    const { favorite } = req.body;

    // Update the favorite field
    const updatedMovie = await Movie.findByIdAndUpdate(
      movieId,
      { favorite },
      { new: true } // Return the updated document
    );

    if (updatedMovie) {
      res.send({ message: 'Favorite status updated successfully', movie: updatedMovie });
    } else {
      res.status(404).send({ error: 'Movie not found' });
    }
  } catch (error) {
    console.error('Error updating favorite status:', error);
    res.status(500).send({ error: 'Failed to update favorite status' });
  }
});


// Delete a movie from the watchlist by imdbId
app.delete('/api/deleteMovie/:imdbId', async (req, res) => {
    try {
      const imdbId = req.params.imdbId;
  
      // Remove the movie by imdbId
      const deletedMovie = await Movie.findOneAndDelete({ imdbId });
      if (deletedMovie) {
        res.send({ message: 'Movie deleted successfully', movie: deletedMovie });
      } else {
        res.status(404).send({ error: 'Movie not found' });
      }
    } catch (error) {
      console.error('Error deleting movie:', error);
      res.status(500).send({ error: 'Failed to delete movie' });
    }
  });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();



// Secure the password and URI
const password = encodeURIComponent('Mjamjam7');
//const uri = `<your URI here to connect>`;
const uri = "mongodb+srv://gabbepond:<password>@cluster0.cvuv9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const app = express();
const port = 3000;

// Parse JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define the Movie model
const Movie = mongoose.model('Movie', {
  title: String,
  imdbId: String,
  year: String,
  description: String,
  genre: String,
  rating: Number,
  favorite: Boolean,
  userName: String,
});

// Serve static files from the public folder
app.use(express.static('public'));

// Get the list of movies from the API
app.get('/api/getMovies', async (req, res) => {
  try {
    // Fetch all movies from the database
    const movies = await Movie.find();
    res.send(movies);
  } catch (error) {
    console.error('Error fetching movies:', error);
    res.status(500).send({ error: 'Failed to fetch movies' });
  }
});

// Add a movie to the watchlist
app.post('/api/addMovie', async (req, res) => {
  try {
    const { title, imdbId, year, description, genre, rating, favorite, userName } = req.body;

    // Create a new movie entry
    const newMovie = new Movie({
      title,
      imdbId,
      year,
      description,
      genre,
      rating,
      favorite,
      userName,
    });

    const savedMovie = await newMovie.save();
    res.send(savedMovie);
  } catch (error) {
    console.error('Error adding movie:', error);
    res.status(500).send({ error: 'Failed to add movie' });
  }
});

// Update the favorite status of a movie
app.patch('/api/updateFavorite/:id', async (req, res) => {
  try {
    const movieId = req.params.id;
    const { favorite } = req.body;

    // Update the favorite field
    const updatedMovie = await Movie.findByIdAndUpdate(
      movieId,
      { favorite },
      { new: true } // Return the updated document
    );

    if (updatedMovie) {
      res.send({ message: 'Favorite status updated successfully', movie: updatedMovie });
    } else {
      res.status(404).send({ error: 'Movie not found' });
    }
  } catch (error) {
    console.error('Error updating favorite status:', error);
    res.status(500).send({ error: 'Failed to update favorite status' });
  }
});


// Delete a movie from the watchlist by imdbId
app.delete('/api/deleteMovie/:imdbId', async (req, res) => {
    try {
      const imdbId = req.params.imdbId;
  
      // Remove the movie by imdbId
      const deletedMovie = await Movie.findOneAndDelete({ imdbId });
      if (deletedMovie) {
        res.send({ message: 'Movie deleted successfully', movie: deletedMovie });
      } else {
        res.status(404).send({ error: 'Movie not found' });
      }
    } catch (error) {
      console.error('Error deleting movie:', error);
      res.status(500).send({ error: 'Failed to delete movie' });
    }
  });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});