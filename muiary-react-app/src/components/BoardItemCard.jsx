import { Grid } from "@mui/material";
import React, { useState } from "react";
import styled from "styled-components";
import "react-loading-skeleton/dist/skeleton.css";
import { useNavigate } from "react-router-dom";
import Vinyl from "./Vinyl";

const GridContainer = styled(Grid)`
  && {
    width: max-content;
    height: max-content;
    padding: 0px 10px 25px 20px;
    .img-div {
      width: 250px;
      height: 250px;
    }
    img {
      width: 250px;
      height: 250px;
      cursor: pointer;
      border-radius: 5px;
    }
    .content {
      margin-top: 6px;
      line-height: 23px;
    }
    .title {
      font-weight: 500;
      width: 250px;
      p {
        cursor: pointer;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }
    }
    .date {
      font-size: 15px;
      color: silver;
    }
  }
`;

function BoardItemCard({ artwork, coverImage, title, date, itemId }) {
  const navi = useNavigate();
  const [hoverEvent, setHoverEvent] = useState(false);
  const [delayHandler, setDelayHandler] = useState(null);

  const handleMouseEnter = (event) => {
    setDelayHandler(
      setTimeout(() => {
        setHoverEvent(true);
      }, 750)
    );
  };

  const handleMouseLeave = () => {
    clearTimeout(delayHandler);
    setHoverEvent(false);
  };

  return (
    <GridContainer container direction="column">
      <Grid item>
        <div
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="img-div"
        >
          {!coverImage ? (
            <>
              {hoverEvent ? (
                <Vinyl artwork={artwork} />
              ) : (
                <img
                  src={artwork}
                  alt="artwork"
                  onClick={() => {
                    navi(`/muiary/pages/${itemId}`);
                  }}
                />
              )}
            </>
          ) : (
            <img
              src={coverImage}
              alt="coverImage"
              onClick={() => {
                navi(`/muiary/pages/${itemId}`);
              }}
            />
          )}
        </div>
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
