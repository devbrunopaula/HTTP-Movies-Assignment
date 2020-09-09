import React from 'react'
import {Link} from 'react-router-dom'
import MovieCard from './MovieCard'
import Alert from 'react-bootstrap/Alert'
import Container from 'react-bootstrap/Container'

function MovieList({movies, deleteAlert}) {
  return (
    <Container>
      <div>
        {deleteAlert && (
          <Alert transition variant='danger'>
            Your Movie Has Been Deleted...
          </Alert>
        )}

        {movies.map((movie) => (
          <Link key={movie.id} to={`/movies/${movie.id}`}>
            <MovieCard movie={movie} />
          </Link>
        ))}
      </div>
    </Container>
  )
}

export default MovieList
