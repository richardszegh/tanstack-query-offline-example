import { MutationCache, QueryClient } from '@tanstack/react-query'
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister'
import toast from 'react-hot-toast'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 1000 * 60 * 60 * 24, // 24 hours
      staleTime: 2000,
      retry: 0,
    },
  },
  // configure global cache callbacks to show toast notifications
  mutationCache: new MutationCache({
    onSuccess: data => {
      toast.success(data.message)
    },
    onError: error => {
      toast.error(error.message)
    },
  }),
})

const persister = createSyncStoragePersister({
  storage: window.localStorage,
})

export { queryClient, persister }
