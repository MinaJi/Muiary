import { Grid } from "@mui/material";
import React from "react";
import { useOutletContext } from "react-router-dom";
import styled from "styled-components";
import FollowProfile from "./FollowProfile";

const GridContainer = styled(Grid)`
  && {
    padding: 30px;
    .header-title {
      font-size: 32px;
      font-weight: 700;
    }
    .divider {
      height: 1px;
      background-color: #ededed;
      border: none;
      /* margin-bottom: 4%; */
    }
    .body {
      width: 100%;
      columns: 2 auto;
    }
  }
`;

function FollowerList() {
  const { followerData } = useOutletContext();

  return (
    <GridContainer container direction="column">
      <Grid item className="header-title">
        <p>Followers</p>
      </Grid>
      <div>
        <hr className="divider" />
      </div>
      <Grid item className="body">
        {followerData.map((item, i) => (
          <div key={i}>
            <FollowProfile followerData={item.id} data={item.id} />
          </div>
        ))}
      </Grid>
    </GridContainer>
  );
}

export default FollowerList;
