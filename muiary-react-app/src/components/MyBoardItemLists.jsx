import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import React, { useEffect } from "react";
import { useState } from "react";
import { db } from "../firebase-config";
import { Grid } from "@mui/material";
import { useParams } from "react-router-dom";
import BoardItemCard from "./BoardItemCard";
import Skeleton from "react-loading-skeleton";

function MyBoardItemLists() {
  const { username } = useParams();
  const [boardItem, setBoardItem] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
    setIsLoading(true);
  }, []);

  return (
    <>
      {boardItem ? (
        <Grid container>
          {Object.keys(boardItem).map((item, i) => (
            <BoardItemCard
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
