import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {useParams, Link} from 'react-router-dom'

function UpadateMovies() {
  const [movie, setMovie] = useState(null)
  const params = useParams()

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response))
  }

  const saveMovie = () => {}

  useEffect(() => {
    fetchMovie(params.id)
  }, [params.id])

  if (!movie) {
    return <div>Loading movie information...</div>
  }

  return <div className='save-wrapper'></div>
}
export default UpadateMovies
