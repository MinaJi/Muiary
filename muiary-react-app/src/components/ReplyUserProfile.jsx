import { doc, getDoc } from "firebase/firestore";
import React, { useEffect } from "react";
import { db } from "../firebase-config";

function ReplyUserProfile({ userId }) {
//   useEffect(() => {
//     let list = [];
//     const getUserData = async () => {
//       const snapshot = await getDoc(doc(db, "users", `${userId}`));
//       snapshot.forEach((doc) => {
//         list.push({ ...doc.data() });
//       });
//       console.log(snapshot);
//     };
//     getUserData();
//   }, []);

  return <div>ReplyUserProfile</div>;
}

export default ReplyUserProfile;
