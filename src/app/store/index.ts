import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import authReducer from './slices/authSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    // Add other reducers here as needed
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: [
          'auth/login/fulfilled', 
          'auth/signup/fulfilled', 
          'auth/signInWithGoogle/fulfilled',
          'auth/setUser'
        ],
        // Ignore these field paths in all actions
        ignoredActionPaths: [
          'payload.user', 
          'meta.arg.user',
          'payload'
        ],
        // Ignore these paths in the state
        ignoredPaths: ['auth.user'],
      },
    }),
});

// Export types for TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Use throughout your app instead of plain useDispatch and useSelector
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector; 