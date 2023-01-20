import { async } from "@firebase/util";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import moment from "moment";
import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { UserAuth } from "../context/AuthContext";
import { db } from "../firebase-config";
import ReplyList from "./ReplyList";

const InputDiv = styled.div`
  background-color: #ffffff77;
  border: none;
  border-radius: 20px;
  height: max-content;
  padding: 15px;
  button {
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
  input {
    border: 1px solid silver;
    border-radius: 20px;
    width: 800px;
    height: 50px;
    outline: none;
    background-color: #ffffff;
  }
`;

function ReplyInput() {
  const { user } = UserAuth();
  const [content, setContent] = useState("");
  const { itemId } = useParams();
  const date = moment().format("YYYY-MM-DD, LTS");

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
    <div>
      <InputDiv>
        <form onSubmit={handleSubmit}>
          <div>
            <span>What do you think of this song?</span>
            <button>👍</button>
            {/* Good song. */}
            <button>🔥</button>
            {/* It's LIT! */}
            <button>❤️</button>
            {/* Love it. */}
            <button>💯</button>
            {/* 100% AGREE. */}
            <button>🕺</button>
            {/* Make me dance! */}
          </div>
          <hr />
          <div>
            <input onChange={(e) => setContent(e.target.value)} />
            <button>upload</button>
          </div>
        </form>
      </InputDiv>
      <div>
        <ReplyList />
      </div>
    </div>
  );
}

export default ReplyInput;
