import { Grid } from "@mui/material";
import React from "react";
import { BiGridAlt } from "react-icons/bi";
import styled from "styled-components";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useNavigate } from "react-router-dom";

const GridContainer = styled(Grid)`
  && {
    width: max-content;
    height: max-content;
    padding: 20px;
    img {
      width: 250px;
      cursor: pointer;
    }
    .content {
      margin-top: 6px;
      line-height: 23px;
    }
    .title {
      font-weight: 500;
      p {
        cursor: pointer;
      }
    }
    .date {
      font-size: 15px;
      color: silver;
    }
  }
`;

function BoardItemCard({ artwork, title, date, itemId }) {
  const navi = useNavigate();

  return (
    <GridContainer container direction="column">
      {/* <Bg style={{ backgroundImage: `url(${artwork})` }} /> */}
      <Grid item>
        <img
          src={artwork}
          alt="artwork"
          onClick={() => {
            navi(`/muiary/pages/${itemId}`);
          }}
        />
      </Grid>
      <Grid item className="content">
        <Grid item className="title">
          <p
            onClick={() => {
              navi(`/muiary/pages/${itemId}`);
            }}
          >
            {title}
          </p>
        </Grid>
        <Grid item className="date">
          <p>{date}</p>
        </Grid>
      </Grid>
    </GridContainer>
  );
}

export default BoardItemCard;
