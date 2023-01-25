import { Grid } from "@mui/material";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { UserAuth } from "../context/AuthContext";
import { db } from "../firebase-config";
import ReplyUserProfile from "./ReplyUserProfile";
import { MdDeleteForever } from "react-icons/md";
import { async } from "@firebase/util";

const GridContainer = styled(Grid)`
  && {
    margin-top: 10px;
    /* padding: 15px; */
    .content {
      font-size: 15px;
    }
    .date {
      font-size: 15px;
      color: gray;
    }
    .delete-btn {
      button {
        border: none;
        background-color: transparent;
        cursor: pointer;
        :hover {
          color: #f73859;
        }
      }
    }
  }
`;

function ReplyList() {
  const [data, setData] = useState([]);
  const { itemId } = useParams();
  const { user } = UserAuth();

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

  const deleteHandler = async (itemId) => {
    try {
      await deleteDoc(doc(db, "replyItems", itemId));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <GridContainer container>
      {data.map((item) => (
        <Grid container key={item.id} className="reply-list">
          <Grid item xs={2} className="profile">
            <ReplyUserProfile userId={item.userId} />
          </Grid>
          <Grid item xs={7} className="content">
            {item.content}
          </Grid>
          <Grid item xs={2} className="date">
            {item.date}
          </Grid>
          {user.uid === item.userId && (
            <Grid item xs={1} className="delete-btn">
              <button onClick={deleteHandler.bind(item.id)}>
                <MdDeleteForever />
              </button>
            </Grid>
          )}
        </Grid>
      ))}
    </GridContainer>
  );
}

export default ReplyList;
