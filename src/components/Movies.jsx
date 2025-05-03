import React from 'react'
import PropTypes from 'prop-types';


function ListOfMovies ({ movies }) {
    return (
      <ul className='movies' >
        {
          movies.map(movie => (
            <li className='movie' key={movie.id}>
              <h3>{movie.title}</h3>
              <h6>{`Product: ${movie.type}`}</h6>
              <p>{movie.year}</p>
              <img src={movie.poster} alt={`Poster of ${movie.type}: ${movie.title}`}/>
            </li>
          ))
        }
      </ul>
    )
    
  }

  ListOfMovies.propTypes = {
    movies: PropTypes.array.isRequired,
};

  function NoMoviesResults () {
    return (
      <p>No se encontraron películas para esta búsqueda</p>
    )
  }
  
export function Movies ({ movies }) {
    const hasMovies = movies?.length > 0
    
    return (
      hasMovies
        ? <ListOfMovies movies={movies} />
        : <NoMoviesResults />
    )
  }

Movies.propTypes = {
    movies: PropTypes.array.isRequired,
};

export default Movies;