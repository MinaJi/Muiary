import { collection, onSnapshot, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { UserAuth } from "../context/AuthContext";
import { db } from "../firebase-config";
import styled from "styled-components";
import { Grid } from "@mui/material";
import SavedItem from "../components/SavedItem";

const GridContainer = styled(Grid)`
  && {
    padding: 20px;
    .title p {
      font-size: 30px;
      font-weight: 700;
    }
    .divider {
      height: 1px;
      background-color: #ededed;
      border: none;
      margin-bottom: 4%;
    }
  }
`;

function MypageSaved() {
  const { user } = UserAuth();
  const [docId, setDocId] = useState([]);

  useEffect(() => {
    const getLikes = () => {
      let list = [];
      const q = query(collection(db, "Saved"), where("userId", "==", user.uid));
      onSnapshot(q, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          list.push({ id: doc.data().boardItemId });
        });
        setDocId(list);
      });
    };
    getLikes();
  }, []);

  return (
    <GridContainer container direction="column">
      <Grid item className="title">
        <p>Saved</p>
        <hr className="divider" />
      </Grid>
      <Grid item>
        <Grid container>
          {docId.map((item, i) => (
            <div key={i}>
              <SavedItem savedItem={item.id} />
            </div>
          ))}
        </Grid>
      </Grid>
    </GridContainer>
  );
}

export default MypageSaved;
