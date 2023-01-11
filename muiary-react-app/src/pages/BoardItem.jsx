import { Grid } from "@mui/material";
import {
  collection,
  documentId,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import SingleItem from "../components/SingleItem";
import { db } from "../firebase-config";

function BoardItem() {
  const { itemId } = useParams();
  const [boardItem, setBoardItem] = useState([]);

  async function getAllDocs() {
    const boardDocs = {};
    const q = query(
      collection(db, "boardItems"),
      where(documentId(), "==", `${itemId}`)
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
      {Object.keys(boardItem).map((item, i) => (
        <SingleItem
          key={i}
          artwork={boardItem[item].musicItem.artworkUrl100}
          trackName={boardItem[item].musicItem.trackName}
          artistName={boardItem[item].musicItem.artistName}
          collectionName={boardItem[item].musicItem.collectionName}
          releaseDate={boardItem[item].musicItem.releaseDate}
          title={boardItem[item].title}
          contents={boardItem[item].contents}
          date={boardItem[item].date}
          username={boardItem[item].username}
          userId={boardItem[item].userId}
        />
      ))}
    </>
  );
}

export default BoardItem;
