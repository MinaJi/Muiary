import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import React, { useEffect } from "react";
import { useState } from "react";
import { db } from "../firebase-config";
import { Grid } from "@mui/material";
import { useParams } from "react-router-dom";
import BoardItemCard from "./BoardItemCard";
import SkeletonCard from "./SkeletonCard";
import BoardHeader from "./BoardHeader";
import styled from "styled-components";

const GridContainer = styled(Grid)`
  && {
    width: 100%;
  }
`;

function MyBoardItemLists() {
  const { username } = useParams();
  const [boardItem, setBoardItem] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function getAllDocs() {
    const boardDocs = {};
    const q = query(
      collection(db, "boardItems"),
      where("username", "==", `${username}`),
      orderBy("timestamp", "desc")
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
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getBoardDocs();
  }, []);

  return (
    <GridContainer container>
      {isLoading && (
        <Grid container>
          <SkeletonCard cards={3} />
        </Grid>
      )}
      {!isLoading && (
        <Grid container>
          {Object.keys(boardItem).map((item, i) => (
            <BoardItemCard
              key={i}
              artwork={boardItem[item].musicItem[0].artworkUrl100}
              coverImage={boardItem[item].coverImage}
              title={boardItem[item].title}
              date={boardItem[item].date}
              username={boardItem[item].username}
              itemId={item}
            />
          ))}
        </Grid>
      )}
    </GridContainer>
  );
}

export default MyBoardItemLists;
