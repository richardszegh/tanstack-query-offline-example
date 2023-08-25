import * as React from 'react'
import { useQuery } from '@tanstack/react-query'
import { Link } from '@tanstack/react-location'

import { movieKeys } from '../hooks/useMovie'
import * as api from '../mocks/api'

function Movies() {
  const moviesQuery = useQuery({
    queryKey: movieKeys.list(),
    queryFn: api.fetchMovies,
  })

  if (moviesQuery.isLoading && moviesQuery.isFetching) {
    return 'Loading...'
  }

  if (moviesQuery.data) {
    return (
      <div>
        <h1>Movies</h1>
        <p>
          Try to mock offline behaviour with the button in the devtools. You can
          navigate around as long as there is already data in the cache.
          You&apos;ll get a refetch as soon as you go online again.
        </p>
        <ul>
          {moviesQuery.data.movies.map(movie => (
            <li key={movie.id}>
              <Link to={`./${movie.id}`} preload>
                {movie.title}
              </Link>
            </li>
          ))}
        </ul>
        <div>
          Updated at: {new Date(moviesQuery.data.ts).toLocaleTimeString()}
        </div>
        <div>{moviesQuery.isFetching && 'fetching...'}</div>
      </div>
    )
  }

  // query will be in 'idle' fetchStatus while restoring from localStorage
  return null
}

export default Movies
