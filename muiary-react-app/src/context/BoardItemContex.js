// import { async } from "@firebase/util";
// import { onAuthStateChanged } from "firebase/auth";
// import { collection, doc, getDoc, getDocs } from "firebase/firestore";
// import { createContext, useContext, useEffect, useState } from "react";
// import { auth, db } from "../firebase-config";

// const BoardItemContext = createContext();

// export const BoardItemContextProvider = ({ children }) => {
//   const [boardItem, setBoardItem] = useState([]);

//   async function getAllDocs() {
//     const boardDocs = {};
//     onAuthStateChanged(auth, async (currentUser) => {
//       const qSnapshot = await getDocs(
//         collection(db, `users/${currentUser?.uid}/boardItems`)
//       );
//       qSnapshot.forEach((doc) => {
//         boardDocs[doc.id] = doc.data();
//       });
//       return boardDocs;
//     });
//   }

//   useEffect(() => {
//     const getBoardDocs = async () => {
//       try {
//         const getBoardDocs = await getAllDocs();
//         setBoardItem(getBoardDocs);
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     getBoardDocs();
//   }, []);

//   console.log(boardItem);

//   return (
//     <BoardItemContext.Provider value={{ boardItem }}>
//       {children}
//     </BoardItemContext.Provider>
//   );
// };

// export const BoardItemData = () => {
//   return useContext(BoardItemContext);
// };
