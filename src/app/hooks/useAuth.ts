import { useAppSelector, useAppDispatch } from "../store";
import { 
  login as loginAction, 
  logout as logoutAction, 
  signup as signupAction,
  signInWithGoogle as signInWithGoogleAction
} from "../store/slices/authSlice";

/**
 * Custom hook to access authentication state and methods from Redux
 * This provides a similar interface to the previous AuthContext for easier migration
 */
export const useAuth = () => {
  const dispatch = useAppDispatch();
  const { user, userRole, loading, error } = useAppSelector(state => state.auth);

  const login = async (email: string, password: string) => {
    return dispatch(loginAction({ email, password })).unwrap();
  };

  const logout = async () => {
    return dispatch(logoutAction()).unwrap();
  };

  const signup = async (email: string, password: string, name: string, role: string = "student") => {
    return dispatch(signupAction({ email, password, name, role })).unwrap();
  };

  const signInWithGoogle = async () => {
    return dispatch(signInWithGoogleAction()).unwrap();
  };

  return {
    user,
    userRole,
    loading,
    error,
    login,
    logout,
    signup,
    signInWithGoogle
  };
};

export default useAuth; 