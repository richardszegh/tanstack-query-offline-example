import { Link, useMatch } from '@tanstack/react-location'

function MovieError() {
  const { error } = useMatch()

  return (
    <div>
      <Link to="..">Back</Link>
      <h1>Couldn&apos;t load movie!</h1>
      <div>{error.message}</div>
    </div>
  )
}

export default MovieError
