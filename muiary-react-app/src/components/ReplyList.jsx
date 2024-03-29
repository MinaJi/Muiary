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

const GridContainer = styled(Grid)`
  && {
    margin-top: 10px;
  }
`;

const Replies = styled(Grid)`
  && {
    margin-bottom: 5px;
    line-height: 23px;
    align-items: center;
    .content {
      font-size: 15px;
    }
    .date {
      text-align: right;
      font-size: 15px;
      color: #5c5c5c;
    }
    .delete-btn {
      button {
        border: none;
        background-color: transparent;
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
        <Replies container key={item.id} className="reply-list">
          <Grid item xs={2.5}>
            <ReplyUserProfile userId={item.userId} />
          </Grid>
          <Grid item className="content" xs={7.5}>
            {item.content}
          </Grid>
          <Grid item className="date" xs={1.5}>
            {item.date}
          </Grid>
          {user.uid === item.userId && (
            <Grid item className="delete-btn">
              <button onClick={deleteHandler.bind(this, item.id)}>
                <MdDeleteForever />
              </button>
            </Grid>
          )}
        </Replies>
      ))}
    </GridContainer>
  );
}

export default ReplyList;
