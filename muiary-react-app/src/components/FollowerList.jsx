import { async } from "@firebase/util";
import {
  collection,
  doc,
  documentId,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { db } from "../firebase-config";

function FollowerList({ follower }) {
  const [userData, setUserData] = useState([]);

  console.log("??", follower);

  useEffect(() => {
    const q = query(
      collection(db, "users"),
      where(documentId(), "==", `${follower}`)
    );
    const unsub = onSnapshot(q, (querySnapshot) => {
      let list = [];
      querySnapshot.forEach((doc) => {
        list.push({ ...doc.data(), id: doc.id });
      });
      setUserData(list);
    });
    return () => unsub();
  }, []);

  return (
    <>
      {userData.map((item, i) => (
        <div key={i}>
          <p>{item.nickname}</p>
        </div>
      ))}
    </>
  );
}

export default FollowerList;
