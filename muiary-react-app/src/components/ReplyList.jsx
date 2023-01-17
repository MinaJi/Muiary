import {
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase-config";

function ReplyList() {
  const [data, setData] = useState([]);
  const { itemId } = useParams();

  useEffect(() => {
    let list = [];
    const getReplyDocs = async () => {
      try {
        const q = query(
          collection(db, "replyItems"),
          where("boardItem", "==", `${itemId}`),
          orderBy("timestamp", "desc")
        );
        const snapshot = await getDocs(q);
        snapshot.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setData(list);
      } catch (error) {
        console.log(error);
      }
    };
    getReplyDocs();
  }, []); //[data]??

  return (
    <div>
      {data.map((item, i) => (
        <div key={i}>{item.content}</div>
      ))}
    </div>
  );
}

export default ReplyList;
