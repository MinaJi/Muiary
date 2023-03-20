import { Grid } from "@mui/material";
import {
  collection,
  documentId,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase-config";
import styled from "styled-components";

const GridContainer = styled(Grid)`
  && {
    padding: 3px;
    .wrapper {
      border: 1px solid #eeeeee;
      background-color: transparent;
      padding: 5px;
      border-radius: 10px;
    }
    .artwork img {
      width: 150px;
      cursor: pointer;
      border-radius: 8px;
    }
    .title {
      padding: 3px;
      font-size: 13px;
      width: 150px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
`;

function LikedItem({ likedItem }) {
  const navi = useNavigate();
  const [data, setData] = useState([]);

  async function getAllDocs() {
    const boardDocs = {};
    const q = query(
      collection(db, "boardItems"),
      where(documentId(), "==", `${likedItem}`)
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
        setData(getBoardDocs);
      } catch (error) {
        console.log(error);
      }
    };
    getBoardDocs();
  }, []);

  return (
    <>
      {Object.keys(data).map((item, i) => (
        <GridContainer container key={i} direction="column">
          <Grid item className="wrapper">
            <Grid item className="artwork">
              <img
                src={data[item].musicItem[0].artworkUrl100}
                alt="artwork"
                onClick={() => navi(`/muiary/pages/${likedItem}`)}
              />
            </Grid>
            <Grid item className="title">
              <span>{data[item].title}</span>
            </Grid>
          </Grid>
        </GridContainer>
      ))}
    </>
  );
}

export default LikedItem;
