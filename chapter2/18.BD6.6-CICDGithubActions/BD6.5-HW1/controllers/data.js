let movies = [
    {
      'movieId': 1,
      'title': 'Inception',
      'genre': 'Sci-Fi',
      'director': 'Christopher Nolan'
    },
    {
      'movieId': 2,
      'title': 'The Shawshank Redemption',
      'genre': 'Drama',
      'director': 'Frank Darabont'
    },
    {
      'movieId': 3,
      'title': 'The Godfather',
      'genre': 'Crime',
      'director': 'Francis Ford Coppola'
    }
  ]

  let getAllMovies = () => {
    return movies
  }

  let getMoviesById = (id) => {
    return movies.find((e) => e.movieId === id)
  }


  module.exports = {
    getAllMovies,
    getMoviesById
  }