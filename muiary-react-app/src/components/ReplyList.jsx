import { Avatar, Grid } from "@mui/material";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { list } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { db } from "../firebase-config";
import ReplyUserProfile from "./ReplyUserProfile";

const GridContainer = styled(Grid)`
  && {
    margin-top: 10px;
    background-color: #ffffff70;
    border-radius: 20px;
    padding: 15px;
  }
`;

function ReplyList() {
  const [data, setData] = useState([]);
  const { itemId } = useParams();
  const navi = useNavigate();
  const [userId, setUserId] = useState("");

  // useEffect(() => {
  //   let list = [];
  //   const getReplyDocs = async () => {
  //     try {
  //       const q = query(
  //         collection(db, "replyItems"),
  //         where("boardItem", "==", `${itemId}`),
  //         orderBy("timestamp", "desc")
  //       );
  //       const snapshot = await getDocs(q);
  //       snapshot.forEach((doc) => {
  //         list.push({ id: doc.id, ...doc.data() });
  //       });
  //       setData(list);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   getReplyDocs();
  // }, []);

  useEffect(() => {
    const q = query(
      collection(db, "replyItems"),
      where("boardItem", "==", `${itemId}`),
      orderBy("timestamp", "desc")
    );
    const unsub = onSnapshot(q, (querySnapshot) => {
      let list = [];
      querySnapshot.forEach((doc) => {
        list.push({ ...doc.data(), id: doc.id });
      });
      setData(list);
    });
    return () => unsub();
  }, []);
  
  return (
    <GridContainer container>
      {data.map((item) => (
        <Grid container key={item.id}>
          <Grid item>
            <ReplyUserProfile userId={item.userId} />
          </Grid>
          <Grid item>{item.content}</Grid>
        </Grid>
      ))}
    </GridContainer>
  );
}

export default ReplyList;
