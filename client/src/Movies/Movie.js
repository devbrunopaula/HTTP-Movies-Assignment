import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {useParams, useHistory} from 'react-router-dom'
import MovieCard from './MovieCard'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

import useDebounce from '../hooks/useDebounced'

function Movie({addToSavedList, setMovieList, handleAlert, deleteMovie}) {
  const initalUpadtedValue = {
    id: '',
    title: '',
    director: '',
    metascore: null,
    stars: [],
    updatedOn: '',
  }
  const [movie, setMovie] = useState(null)

  const [updatedMovie, setUpdatedMovie] = useState(initalUpadtedValue)
  const params = useParams()
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const history = useHistory()
  const debounced = useDebounce()

  const fetchMovie = (id) => {
    let [month, date, year] = new Date().toLocaleDateString().split('/')
    let [hour, minute, second] = new Date()
      .toLocaleTimeString()
      .slice(0, 7)
      .split(':')
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => {
        setMovie(res.data)

        setUpdatedMovie({
          id: res.data.id,
          title: res.data.title,
          director: res.data.director,
          metascore: res.data.metascore,
          stars: res.data.stars,
          updatedOn: `${month}/${date}/${year} - ${hour}:${minute}`,
        })
      })
      .catch((err) => console.log(err.response))
  }

  const saveMovie = () => {
    addToSavedList(movie)
  }

  const handleUpdatedChanges = (e) => {
    setUpdatedMovie({
      ...updatedMovie,
      [e.target.name]: e.target.value,
    })
  }

  const saveUpdateMovie = () => {
    axios
      .put(`http://localhost:5000/api/movies/${params.id}`, updatedMovie)
      .then((res) => {})
      .catch((err) => console.log(err.response))
    window.location.href = '/'
  }

  const deleteMovies = () => {
    deleteMovie(params.id)
    history.push('/')
  }

  useEffect(() => {
    fetchMovie(params.id)
  }, [params.id])

  if (!movie) {
    return <div>Loading movie information...</div>
  }

  return (
    <>
      <div className='save-wrapper'>
        <MovieCard movie={movie} setMovieList={setMovieList} />

        <div className='save-button' onClick={saveMovie}>
          Save
        </div>
        <div className='edit-button' onClick={handleShow}>
          Edit
        </div>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Movie Update</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId='formBasicEmail'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='text'
                name='title'
                placeholder='Update Movie Title'
                value={updatedMovie.title}
                onChange={handleUpdatedChanges}
              />
              <Form.Text className='text-muted'>error</Form.Text>
            </Form.Group>

            <Form.Group controlId='formBasicPassword'>
              <Form.Label>Director</Form.Label>
              <Form.Control
                type='text'
                placeholder='Update Movie Director'
                name='director'
                value={updatedMovie.director}
                onChange={handleUpdatedChanges}
                name='director'
              />
            </Form.Group>
            <Form.Group controlId='formBasicCheckbox'>
              <Form.Label>Movie Scores</Form.Label>
              <Form.Check
                type='number'
                label='New Score'
                onChange={handleUpdatedChanges}
                name='metascore'
                value={updatedMovie.metascore}
                max={100}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='danger' onClick={deleteMovies}>
            Delete
          </Button>
          <Button variant='primary' onClick={saveUpdateMovie}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Movie

//  const deleteMovie = (id) => {
//    axios
//      .delete(`http://localhost:5000/api/movies/${params.id}`, updatedMovie)
//      .then((res) => {
//        console.log(res.data)
//        console.log(res)
//        if (res.status === 202) {
//          history.push('/')
//        }
//      })
//      .catch((err) => console.log(err.response))
//    toggleAlertStatus()
//    // window.location.href = '/'
//    // history.push('/')
//  }
