import { collection, getDocs, orderBy, Query, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase-config";

function ReplyList() {
  const [data, setData] = useState([]);

  useEffect(() => {
    let list = [];
    const getReplyDocs = async () => {
      try {
        const q = query(
          collection(db, "replyItems"),
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
  });

  return (
    <div>
      {data.map((item, i) => (
        <div key={i}>{item.content}</div>
      ))}
    </div>
  );
}

export default ReplyList;
