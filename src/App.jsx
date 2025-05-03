import './App.css'
import React, { useCallback, useEffect, useState } from 'react'
import { Movies } from './components/Movies.jsx'
import { useMovies } from './hooks/useMovies.js'
import { useRef } from 'react'
import debounce from 'just-debounce-it'

function useSearch () {
  const [search, updateSearch] = useState('')
  const [error, setError] = useState('')
  const isFirstInput = useRef(true)

  useEffect(()=>{
    if (isFirstInput.current){
      isFirstInput.current = search === ''
      return
    }

    if (search === '') {
      setError('ingresa el nombre de la pelicula')
      return
    }
    if (search.match(/^\d+$/)){
      setError('ingrese nombre de la pelicula')
      return
    }
    if (search.length < 3){
      setError('ingrese nombre completo de la pelicula')
      return
    }
      setError(null)
      
  }, [search])

  return {search, updateSearch, error}
}

function App() {
  const [sort, setSort] = useState(false)
  const {search, updateSearch, error} = useSearch()
  const { movies, getMovies, loading } = useMovies({search, sort})

  const debounceGetMovies = useCallback(
    debounce(search => {
    console.log('search', search)
    getMovies({search})
  }, 300)
  , [getMovies] 
  )


  const handleSubmit = (e) => {
    e.preventDefault()
    getMovies({ search })
  }

  const handleSort = () => {
    setSort(!sort)
  }

  const handleChange = (e) => {
    const newSearch = e.target.value
    updateSearch(newSearch)
    debounceGetMovies(newSearch)
  } 

  return (
    <div className='page'>

      <header>
        <h1>Search movie, serie, game</h1>
        <form className='form' onSubmit={handleSubmit} >
          <input onChange={handleChange} value={search} name='query' type="text" placeholder='Avengers, Matrix, Narnia' />
          <label htmlFor="sort">Year</label>
          <input type="checkbox" onChange={handleSort} checked={sort} name='sort' className='checkbox-container' />
          <button type='submit'>Press</button>
        </form>
        {error && <p style={{color:'red'}}>{error}</p>}
      </header>
    <main>
      {
        loading ? <p>Loading...</p> : <Movies movies={movies} />
      }
    </main>
    </div>
  )
}

export default App
