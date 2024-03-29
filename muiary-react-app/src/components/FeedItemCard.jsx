import { Divider, Grid } from "@mui/material";
import React from "react";
import styled from "styled-components";
import { BiMusic } from "react-icons/bi";
import CardProfile from "./CardProfile";
import { Link } from "react-router-dom";

const Card = styled(Grid)`
  && {
    width: max-content;
    background-color: ${(props) => props.theme.cardBg};
    /* display: grid; */
    border-radius: 20px;
    border: ${(props) => props.theme.cardBorder};
    padding: 25px;
    margin: 15px;
    .divider {
      margin: 10px;
    }
    .artwork-img {
      width: 250px;
      height: 250px;
      border-radius: 14px;
    }
    .icon {
      color: #f1d18a;
    }
    :hover {
      box-shadow: rgba(201, 201, 201, 0.305) 0px 0px 15px;
    }
    p {
      width: 250px;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
  }
`;

function FeedItemCard({ data }) {
  return (
    <Grid container justifyContent="center">
      {data.map((item, i) => (
        <Card container key={i} direction="column">
          <CardProfile nickname={item.username} />
          <Divider className="divider" />
          <Grid item>
            <Link to={`/muiary/pages/${item.id}`}>
              {!item.coverImage ? (
                <img
                  src={item.musicItem[0].artworkUrl100}
                  alt="artwork"
                  className="artwork-img"
                />
              ) : (
                <img
                  src={item.coverImage}
                  alt="coverpic"
                  className="artwork-img"
                />
              )}
            </Link>
          </Grid>
          <Grid item>
            <p>
              <BiMusic className="icon" />
              {item.musicItem[0].trackName}
            </p>
          </Grid>
          <Grid item>
            <p>{item.title}</p>
          </Grid>
        </Card>
      ))}
    </Grid>
  );
}

export default FeedItemCard;
