import { createContext, useState } from "react";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    displayName: "Test User",
    email: "test@example.com",
    photoURL: "https://i.ibb.co/p3d9pYn/user.png",
  });

  const [loading, setLoading] = useState(false);

  const createUser = (email, password) => {
    return Promise.resolve();
  };
  const signIn = (email, password) => {
    return Promise.resolve();
  };
  const googleSignIn = () => {
    return Promise.resolve();
  };

  const logOut = () => {
    setUser(null);
    return Promise.resolve();
  };

  const updateUserProfile = (name, photo) => {
    return Promise.resolve();
  };

  const authInfo = {
    user,
    loading,
    createUser,
    signIn,
    googleSignIn,
    logOut,
    updateUserProfile,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
