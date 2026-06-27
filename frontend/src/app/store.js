import { configureStore } from '@reduxjs/toolkit'
import { apiSlice } from './apiSlice'

export const store = configureStore({
  reducer: {
    // Add the generated reducer path as a key to the top-level reducer dictionary
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  // Add the middleware to enable caching, invalidation, polling, and other features of RTK Query
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
})
