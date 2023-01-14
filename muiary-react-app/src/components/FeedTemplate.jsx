import { collection, getDocs } from "firebase/firestore";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import FeedItemCard from "./FeedItemCard";
import { db } from "../firebase-config";
import { Grid } from "@mui/material";
import _ from "lodash";
import FeedCardsSkeleton from "./FeedCardsSkeleton";

function FeedTemplate() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      let list = [];
      let randomList = [];
      try {
        const snapshot = await getDocs(collection(db, "boardItems"));
        snapshot.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        randomList = _.sampleSize(list, 12);
        setData(randomList);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      {isLoading && (
        <Grid container>
          <FeedCardsSkeleton cards={6} />
        </Grid>
      )}
      {!isLoading && (
        <Grid container>
          <Grid item>
            <FeedItemCard data={data} />
          </Grid>
        </Grid>
      )}
    </>
  );
}

export default FeedTemplate;
