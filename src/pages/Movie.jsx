import * as React from 'react'
import { Link, useMatch } from '@tanstack/react-location'

import { useMovie } from '../hooks/useMovie'

function Movie() {
  const {
    params: { movieId },
  } = useMatch()
  const { comment, setComment, updateMovie, movieQuery } = useMovie(movieId)

  if (movieQuery.isLoading && movieQuery.isFetching) {
    return 'Loading...'
  }

  const handleSubmit = event => {
    event.preventDefault()

    updateMovie.mutate({
      id: movieId,
      comment,
    })
  }

  if (movieQuery.data) {
    return (
      <form onSubmit={handleSubmit}>
        <Link to="..">Back</Link>
        <h1>Movie: {movieQuery.data.movie.title}</h1>
        <p>
          Try to mock offline behaviour with the button in the devtools, then
          update the comment. The optimistic update will succeed, but the actual
          mutation will be paused and resumed once you go online again.
        </p>
        <p>
          You can also reload the page, which will make the persisted mutation
          resume, as you will be online again when you &quot;come back&quot;.
        </p>
        <p>
          <label>
            Comment: <br />
            <textarea
              name="comment"
              value={comment}
              onChange={event => setComment(event.target.value)}
            />
          </label>
        </p>
        <button type="submit">Submit</button>
        <div>
          Updated at: {new Date(movieQuery.data.ts).toLocaleTimeString()}
        </div>
        <div>{movieQuery.isFetching && 'fetching...'}</div>
        <div>
          {updateMovie.isPaused
            ? 'mutation paused - offline'
            : updateMovie.isLoading && 'updating...'}
        </div>
      </form>
    )
  }

  if (movieQuery.isPaused) {
    return "We're offline and have no data to show :("
  }

  return null
}

export default Movie
