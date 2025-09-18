"use client";

import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { store, useAppDispatch } from './index';
import { auth, db } from '@/config/config';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { setUser, setUserRole, setLoading, SerializableUser } from './slices/authSlice';

// Auth listener component to handle Firebase auth state changes
const AuthStateListener = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    const fetchUserRole = async (uid: string) => {
      try {
        const userDoc = await getDoc(doc(db, "users", uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          dispatch(setUserRole(userData.role || "student"));
        }
      } catch (error) {
        console.error("Error fetching user role:", error);
      }
    };

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      // Handle the Firebase user object - only store what we need
      if (firebaseUser) {
        // Extract only the serializable properties we need
        const serializableUser: SerializableUser = {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
          photoURL: firebaseUser.photoURL,
          emailVerified: firebaseUser.emailVerified,
          phoneNumber: firebaseUser.phoneNumber,
        };
        
        dispatch(setUser(serializableUser));
        await fetchUserRole(firebaseUser.uid);
      } else {
        dispatch(setUser(null));
        dispatch(setUserRole(null));
      }
      
      dispatch(setLoading(false));
    });
    
    return () => unsubscribe();
  }, [dispatch]);

  return <>{children}</>;
};

// Main Redux provider component
export const ReduxProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <AuthStateListener>
        {children}
      </AuthStateListener>
    </Provider>
  );
};

export default ReduxProvider; 