import * as React from 'react'
import {
  useIsRestoring,
  onlineManager,
  useQueryClient,
} from '@tanstack/react-query'
import { ReactLocation, Router, Outlet } from '@tanstack/react-location'
import { Toaster } from 'react-hot-toast'

import * as api from './mocks/api'

import { movieKeys } from './hooks/useMovie'

import Movies from './pages/Movies'
import Movie from './pages/Movie'
import MovieError from './components/MovieError'

const location = new ReactLocation()

function Routes() {
  const queryClient = useQueryClient()
  const isRestoring = useIsRestoring()

  return (
    <Router
      location={location}
      routes={[
        {
          path: '/',
          element: <Movies />,
        },
        {
          path: ':movieId',
          element: <Movie />,
          errorElement: <MovieError />,
          loader: ({ params: { movieId } }) =>
            queryClient.getQueryData(movieKeys.detail(movieId)) ??
            // do not load if we are offline or hydrating because it returns a promise that is pending until we go online again
            // we just let the Detail component handle it
            (onlineManager.isOnline() && !isRestoring
              ? queryClient.fetchQuery({
                  queryKey: movieKeys.detail(movieId),
                  queryFn: () => api.fetchMovie(movieId),
                })
              : undefined),
        },
      ]}
    >
      <Outlet />
      <Toaster />
    </Router>
  )
}

export default Routes
