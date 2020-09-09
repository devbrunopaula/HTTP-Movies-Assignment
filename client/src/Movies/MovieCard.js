import React from 'react'
import Button from 'react-bootstrap/Button'

import Card from 'react-bootstrap/Card'

const MovieCard = (props) => {
  const {id, title, director, metascore, stars, updatedOn} = props.movie

  return (
    <div className='card'>
      <Card>
        <Card.Body>
          <Card.Title>{title}</Card.Title>

          <blockquote className='blockquote mb-0'>
            Director: {director}
          </blockquote>
          <Card.Text>Score# {metascore}</Card.Text>
          <h3>Actors</h3>
          {stars.map((star) => (
            <div key={star} className='movie-star'>
              <Card.Text>{star}</Card.Text>
            </div>
          ))}
        </Card.Body>
        <Card.Footer>
          <div className='card--footer'>
            <div className='card-updated'>
              <small className='text-muted'>
                {updatedOn && <p>Last updated {updatedOn}</p>}
              </small>
            </div>
            <div>
              <Button>Details</Button>
            </div>
          </div>
        </Card.Footer>
      </Card>
    </div>
  )
}

export default MovieCard
