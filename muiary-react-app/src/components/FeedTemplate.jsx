import { collection, getDocs } from "firebase/firestore";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Card from "../components/Card";
import { db } from "../firebase-config";
import { Grid } from "@mui/material";
import _, { random } from "lodash";
import styled from "styled-components";

function FeedTemplate() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let list = [];
      let randomList = [];
      try {
        const snapshot = await getDocs(collection(db, "boardItems"));
        snapshot.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        randomList = _.sampleSize(list, 3);
        setData(randomList);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  console.log(data);

  return (
    <div>
      {data.length === 0 ? <p>loading...</p> : <>{data[0].title}</>}
      <Card data={data} />
    </div>
  );
}

export default FeedTemplate;
