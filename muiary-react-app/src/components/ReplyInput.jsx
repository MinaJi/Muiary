import { async } from "@firebase/util";
import { Divider, Grid } from "@mui/material";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import moment from "moment";
import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { UserAuth } from "../context/AuthContext";
import { db } from "../firebase-config";
import ReplyList from "./ReplyList";

const InputDiv = styled(Grid)`
  && {
    background-color: #ffffff77;
    border: none;
    border-radius: 20px;
    height: max-content;
    padding: 15px;
    .btn {
      font-size: 18px;
      width: max-content;
      height: max-content;
      padding: 5px;
      border: 1px solid silver;
      border-radius: 20px;
      background-color: transparent;
      margin-left: 5px;
      cursor: pointer;
      :hover {
        background-color: #f73859;
      }
    }
    .input-wrapper {
      border: 1px solid silver;
      border-radius: 20px;
      height: 50px;
      outline: none;
      background-color: #ffffff;
      input {
        width: 800px;
        border: none;
        background-color: transparent;
        outline: none;
        border-radius: 20px;
        height: 45px;
      }
      button {
        border: none;
        background-color: transparent;
        /* color: ${(props) => props.theme.textColor}; */
        color: silver;
        font-size: 15px;
        font-weight: 600;
        cursor: pointer;
        :hover {
          color: #f73859;
        }
      }
    }
  }
`;

const StyledDivder = styled(Divider)`
  && {
    margin-top: 10px;
    margin-bottom: 10px;
  }
`;

function ReplyInput() {
  const { user } = UserAuth();
  const [content, setContent] = useState("");
  const { itemId } = useParams();
  const date = moment().format("YYYY-MM-DD");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (content === "") {
      alert("댓글을 작성해주세욘");
      return;
    }
    try {
      await addDoc(collection(db, "replyItems"), {
        userId: user.uid,
        content: content,
        boardItem: itemId,
        date: date,
        timestamp: serverTimestamp(),
      }).then(e.target.reset());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Grid container>
      <InputDiv>
        <form onSubmit={handleSubmit}>
          <div>
            <span>What do you think of this song?</span>
            <button className="btn">👍</button>
            {/* Good song. */}
            <button className="btn">🔥</button>
            {/* It's LIT! */}
            <button className="btn">❤️</button>
            {/* Love it. */}
            <button className="btn">💯</button>
            {/* 100% AGREE. */}
            <button className="btn">🕺</button>
            {/* Make me dance! */}
          </div>
          <StyledDivder />
          <div className="input-wrapper">
            <input onChange={(e) => setContent(e.target.value)} />
            <button>Upload</button>
          </div>
        </form>
        <div>
          <ReplyList />
        </div>
      </InputDiv>
    </Grid>
  );
}

export default ReplyInput;
