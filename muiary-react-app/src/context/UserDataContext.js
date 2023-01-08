import { async } from "@firebase/util";
import { onAuthStateChanged } from "firebase/auth";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase-config";

const UserDataContext = createContext();

export const UserDataContextProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [userdata, setUserData] = useState([]);

  // const getAllUser = async () => {
  //   const userData = {};
  //   const q = await getDocs(collection(db, "users"));
  //   q.forEach((doc)=>{
  //     userData[doc.id] = doc.data();
  //   })
  //   return userData;
  // };

  useEffect(() => {
    onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const snapshot = await getDoc(doc(db, "users", currentUser.uid));
        setUsers(snapshot.data());
      }
    });
    
    // const getUserDocs = async () => {
    //   try {
    //     const getUserDocs = await getAllUser();
    //     setUserData(getUserDocs);
    //     // console.log(getUserDocs)
    //   } catch (e) {
    //     console.log(e);
    //   }
    // };
    // getUserDocs();
  }, []);

  return (
    <UserDataContext.Provider value={{ users, userdata }}>
      {children}
    </UserDataContext.Provider>
  );
};

export const UserData = () => {
  return useContext(UserDataContext);
};
