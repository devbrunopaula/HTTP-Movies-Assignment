import React, {useState, useEffect} from 'react'
import {Route} from 'react-router-dom'
import SavedList from './Movies/SavedList'
import MovieList from './Movies/MovieList'
import Movie from './Movies/Movie'
import axios from 'axios'
import UpadateMovies from './Movies/UpadateMovies'

const App = () => {
  const initalUpadtedValue = {
    id: '',
    title: '',
    director: '',
    metascore: null,
    stars: [],
    updatedOn: '',
  }
  const [savedList, setSavedList] = useState([])
  const [movieList, setMovieList] = useState([])
  const [deleteAlert, setDeleteAlert] = React.useState(null)
  const [updatedMovie, setUpdatedMovie] = useState(initalUpadtedValue)

  const getMovieList = () => {
    axios
      .get('http://localhost:5000/api/movies')
      .then((res) => setMovieList(res.data))
      .catch((err) => console.log(err.response))
  }
  const deleteMovie = (id) => {
    axios
      .delete(`http://localhost:5000/api/movies/${id}`)
      .then((res) => {
        setMovieList(res.data)
        removeSavedMovie(id)

        handleAlert(true)
      })
      .catch((err) => console.log(err.response))
  }

  const addToSavedList = (movie) => {
    setSavedList([...savedList, movie])
  }

  const removeSavedMovie = (id) => {
    console.log(id)
    console.log('sl', savedList)
    const savedMovie = savedList.filter((movie) => {
      return movie.id !== parseInt(id)
    })

    setSavedList(savedMovie)
  }

  const handleAlert = (status) => {
    setDeleteAlert(status)
    setTimeout(() => setDeleteAlert(!status), 2000)
    console.log('return', status)
  }

  useEffect(() => {
    getMovieList()
  }, [movieList.length, savedList])

  return (
    <>
      <SavedList list={savedList} />

      <Route exact path='/'>
        <MovieList
          movies={movieList}
          setMovieList={setMovieList}
          deleteAlert={deleteAlert}
        />
      </Route>
      <Route path='/update-movie/:id'>
        <UpadateMovies />
      </Route>
      <Route path='/movies/:id'>
        <Movie
          addToSavedList={addToSavedList}
          handleAlert={handleAlert}
          deleteMovie={deleteMovie}
          setUpdatedMovie={setUpdatedMovie}
          updatedMovie={updatedMovie}
        />
      </Route>
    </>
  )
}

export default App
