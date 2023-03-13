import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase-config";

const UserDataContext = createContext();

export const UserDataContextProvider = ({ children }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const snapshot = await getDoc(doc(db, "users", currentUser.uid));
        setUsers(snapshot.data());
      }
    });
  }, []);

  return (
    <UserDataContext.Provider value={{ users }}>
      {children}
    </UserDataContext.Provider>
  );
};

export const UserData = () => {
  return useContext(UserDataContext);
};
