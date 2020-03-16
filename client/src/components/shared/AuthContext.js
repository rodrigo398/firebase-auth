import React, { createContext, useEffect, useState } from "react";

import Loader from "#root/components/shared/Loader";
import firebaseApp from "#root/firebase";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null); // the user object from firebase
  const [idToken, setIdToken] = useState(null); // the id token (used in firebase-admin on the server)
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = firebaseApp.auth().onAuthStateChanged(user => {
      if (user) {
        firebaseApp
          .auth()
          .currentUser.getIdToken()
          .then(idToken => {
            setIdToken(idToken);
          });
      }
      setCurrentUser(user);
      setIsLoading(false);
    });

    return () => unsubscribe(); // prevents state updates after unmount
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <AuthContext.Provider value={{ currentUser, idToken }}>
      {children}
    </AuthContext.Provider>
  );
};
