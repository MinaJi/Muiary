import React from "react";
import styled from "styled-components";

const InputDiv = styled.div`
  background-color: #ffffff77;
  border: none;
  border-radius: 20px;
  height: max-content;
  padding: 15px;
  button {
    font-size: 25px;
    width: max-content;
    border: 1px solid silver;
    border-radius: 10px;
    background-color: transparent;
    margin-left: 5px;
    cursor: pointer;
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
  return (
    <div>
      <InputDiv>
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
        <input />
      </InputDiv>
    </div>
  );
}

export default ReplyInput;
