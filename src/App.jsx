import * as React from 'react'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'

import * as api from './mocks/api'

import { movieKeys } from './hooks/useMovie'
import { queryClient, persister } from './libs/react-query'

import Routes from './Routes'

// we need a default mutation function so that paused mutations can resume after a page reload
queryClient.setMutationDefaults(movieKeys.all(), {
  mutationFn: async ({ id, comment }) => {
    // to avoid clashes with our optimistic update when an offline mutation continues
    await queryClient.cancelQueries({ queryKey: movieKeys.detail(id) })
    return api.updateMovie(id, comment)
  },
})

function App() {
  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister }}
      onSuccess={() => {
        // resume mutations after initial restore from localStorage was successful
        queryClient.resumePausedMutations().then(() => {
          queryClient.invalidateQueries()
        })
      }}
    >
      <Routes />

      <ReactQueryDevtools initialIsOpen />
    </PersistQueryClientProvider>
  )
}

export default App
