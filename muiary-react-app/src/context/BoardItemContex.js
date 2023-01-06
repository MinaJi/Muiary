import { onAuthStateChanged } from "firebase/auth";
import { collection, doc, getDoc } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase-config";

const BoardItemContext = createContext();

export const BoardItemContextProvider = ({ children }) => {
  const [boardItem, setBoardItem] = useState([]);

  //   useEffect(() => {
  //     onAuthStateChanged(auth, async (currentUser) => {
  //       if (currentUser) {
  //         const itemData = await getDoc(
  //           collection(db, "users", currentUser.uid, "boardItems")
  //         );
  //         setBoardItem(itemData.data());
  //       }
  //     });
  //   }, []);

  useEffect(() => {
    db.collection("boardItems").onSnapshot((snapshot) => {
      const postData = [];
      snapshot.forEach((doc) => postData.push({ ...doc.data(), id: doc.id }));
      console.log(postData);
      setBoardItem(postData);
    });
  }, []);

  return (
    <BoardItemContext.Provider value={{ boardItem }}>
      {children}
    </BoardItemContext.Provider>
  );
};

export const BoardItemData = () => {
  return useContext(BoardItemContext);
};
