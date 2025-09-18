import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { 
  auth, 
  db, 
  googleProvider 
} from "@/config/config";
import { 
  User,
  signInWithEmailAndPassword, 
  signOut, 
  createUserWithEmailAndPassword, 
  signInWithPopup 
} from "firebase/auth";
import { 
  doc, 
  setDoc, 
  getDoc, 
  serverTimestamp 
} from "firebase/firestore";

// Define a serializable user type
export interface SerializableUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  emailVerified: boolean;
  phoneNumber: string | null;
  [key: string]: any; // Allow additional properties
}

interface AuthState {
  user: SerializableUser | null;
  userRole: number | string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  userRole: null,
  loading: true,
  error: null
};

// Fetch user role from Firestore
const fetchUserRole = async (uid: string) => {
  try {
    const userDoc = await getDoc(doc(db, "users", uid));
    if (userDoc.exists()) {
      const userData = userDoc.data();
      return userData.role || "student"; // Default to student if no role specified
    }
    return null;
  } catch (error) {
    console.error("Error fetching user role:", error);
    throw error;
  }
};

// Helper to convert Firebase User to SerializableUser
const toSerializableUser = (user: User): SerializableUser => {
  return {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    photoURL: user.photoURL,
    emailVerified: user.emailVerified,
    phoneNumber: user.phoneNumber,
  };
};

// Async thunks
export const signup = createAsyncThunk(
  'auth/signup',
  async ({ email, password, name, role = "student" }: { email: string, password: string, name: string, role?: string }, { rejectWithValue }) => {
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, "users", cred.user.uid), {
        name,
        email,
        role,
        createdAt: serverTimestamp(),
      });
      
      return { 
        user: toSerializableUser(cred.user),
        role 
      };
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }: { email: string, password: string }, { rejectWithValue }) => {
    try {
      const cred = await signInWithEmailAndPassword(auth, email, password);
      const role = await fetchUserRole(cred.user.uid);
      
      return { 
        user: toSerializableUser(cred.user),
        role 
      };
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await signOut(auth);
      return null;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const signInWithGoogle = createAsyncThunk(
  'auth/signInWithGoogle',
  async (_, { rejectWithValue }) => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const userDoc = await getDoc(doc(db, "users", result.user.uid));
      
      let role = "student";
      
      if (!userDoc.exists()) {
        // Default role for new Google sign-ins
        await setDoc(doc(db, "users", result.user.uid), {
          name: result.user.displayName,
          email: result.user.email,
          role,
          createdAt: serverTimestamp(),
        });
      } else {
        const userData = userDoc.data();
        role = userData.role || "student";
      }
      
      return { 
        user: toSerializableUser(result.user),
        role 
      };
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<SerializableUser | null>) => {
      state.user = action.payload;
    },
    setUserRole: (state, action: PayloadAction<string | null>) => {
      state.userRole = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    // Signup
    builder.addCase(signup.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(signup.fulfilled, (state, action: any) => {
      state.loading = false;
      state.user = action.payload.user;
      state.userRole = action.payload.role;
    });
    builder.addCase(signup.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    
    // Login
    builder.addCase(login.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(login.fulfilled, (state, action: any) => {
      state.loading = false;
      state.user = action.payload.user;
      state.userRole = action.payload.role;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    
    // Logout
    builder.addCase(logout.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.loading = false;
      state.user = null;
      state.userRole = null;
    });
    builder.addCase(logout.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    
    // Google Sign In
    builder.addCase(signInWithGoogle.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(signInWithGoogle.fulfilled, (state, action: any) => {
      state.loading = false;
      state.user = action.payload.user;
      state.userRole = action.payload.role;
    });
    builder.addCase(signInWithGoogle.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  }
});

export const { setUser, setUserRole, setLoading, clearError } = authSlice.actions;
export default authSlice.reducer; 