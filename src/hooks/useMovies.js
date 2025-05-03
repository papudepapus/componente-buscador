import { useRef, useState, useMemo, useCallback } from 'react'
import { searchMovies } from '../services/movies';

export function useMovies ({search, sort}) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const previousSearch = useRef(search)

    const getMovies = useCallback(async ({ search }) => {
      if (search === previousSearch.current) return 
      try {
        setLoading(true)
        setError(null)
        previousSearch.current = search
        const newMovies =  await searchMovies({search})
        setMovies(newMovies || []);
      } catch(e) {
        setError(e.message)
      } finally {
        setLoading(false)
      }

    }, [])

    const sortedMovies = useMemo(() => { 
      return sort
        ? [...movies].sort((a, b) => parseInt(a.year) - parseInt(b.year))
        : movies
      }, [sort, movies])

    return { movies: sortedMovies, getMovies, loading, error };
  }