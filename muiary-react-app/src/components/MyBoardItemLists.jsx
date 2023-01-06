import { onAuthStateChanged } from "firebase/auth";
import { collection, doc, getDocs } from "firebase/firestore";
import React, { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import { UserAuth } from "../context/AuthContext";
import { auth, db } from "../firebase-config";
import parser from "html-react-parser";
import { BoardItemData } from "../context/BoardItemContex";
import moment from "moment";
import { Grid } from "@mui/material";
import { async } from "@firebase/util";
import BoardItem from "./BoardItem";

function MyBoardItemLists() {
  const { user } = UserAuth();
  const [boardItem, setBoardItem] = useState([]);
  const ref = collection(db, `users/${user?.uid}/boardItems`);

  async function getAllDocs() {
    const boardDocs = {};
    const qSnapshot = await getDocs(ref);
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
    <Grid container>
      {Object.keys(boardItem).map((item, i) => (
        <BoardItem
          keys={i}
          artwork={boardItem[item].musicItem.artworkUrl100}
          title={boardItem[item].title}
          date={boardItem[item].date}
        />
        // <Grid item key={i}>
        //   <Grid item>
        //     <img
        //       src={boardItem[item].musicItem.artworkUrl100}
        //       alt="artwork"
        //       width="100px"
        //     />
        //   </Grid>
        //   <Grid item>
        //     <p>{boardItem[item].title}</p>
        //   </Grid>
        //   <Grid item>
        //     <p>{boardItem[item].date}</p>
        //   </Grid>
        //   {/* {parser(`${boardItem[item].contents}`)} */}
        // </Grid>
      ))}
    </Grid>
  );
}

export default MyBoardItemLists;
