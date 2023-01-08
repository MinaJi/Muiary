import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import React, { useEffect } from "react";
import { useState } from "react";
import { db } from "../firebase-config";
import { Grid } from "@mui/material";
import BoardItem from "./BoardItem";
import { useParams } from "react-router-dom";

function MyBoardItemLists() {
  const { username } = useParams();
  const [boardItem, setBoardItem] = useState([]);

  async function getAllDocs() {
    const boardDocs = {};
    const q = query(
      collection(db, "boardItems"),
      where("username", "==", `${username}`),
      orderBy("date", "desc")
    );
    const qSnapshot = await getDocs(q);
    qSnapshot.forEach((doc) => {
      boardDocs[doc.id] = doc.data();
    });
    return boardDocs;
  }

  useEffect(() => {
    const getBoardDocs = async () => {
      try {
        const getBoardDocs = await getAllDocs();
        setBoardItem(getBoardDocs);
      } catch (error) {
        console.log(error);
      }
    };
    getBoardDocs();
  }, []);

  return (
    <>
      {boardItem ? (
        <Grid container>
          {Object.keys(boardItem).map((item, i) => (
            <BoardItem
              key={i}
              artwork={boardItem[item].musicItem.artworkUrl100}
              title={boardItem[item].title}
              date={boardItem[item].date}
              username={boardItem[item].username}
            />
          ))}
        </Grid>
      ) : (
        <div style={{ backgroundColor: "red" }}>없음</div>
      )}
    </>
  );
}

export default MyBoardItemLists;
