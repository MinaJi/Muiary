import { Grid } from "@mui/material";
import React from "react";
import styled from "styled-components";
import { RiAddCircleLine } from "react-icons/ri";
import SearchModal from "../components/SearchModal";
import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase-config";
import { UserAuth } from "../context/AuthContext";

const StyledContainer = styled(Grid)`
  && {
    font-size: 30px;
    input,
    textarea {
      width: 500px;
      border: 1px solid gray;
      border-radius: 10px;
    }
    .addInfo {
      width: 150px;
      height: 150px;
      border: 1px solid black;
      border-radius: 10px;
    }
    .iconBtn {
      background-color: inherit;
      border: none;
      cursor: pointer;
      display: block;
      margin: 0 auto;
      margin-top: 50px;
      font-size: 50px;
    }
    .title {
      height: 40px;
    }
    .contents {
      height: 300px;
    }
  }
`;

function CreateItem({ songData }) {
  const { user } = UserAuth();
  const [openModal, setOpenModal] = useState(false);
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");

  // console.log("? " + songData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, "boardItems"), {
      userId: user.uid,
      title: title,
      contents: contents,
      musicItem: "",
    });
    console.log("글작성완료~");
  };

  return (
    <StyledContainer container direction="column" alignItems="center">
      <form onSubmit={handleSubmit}>
        <Grid item className="addInfo">
          {/* 데이터가 넘어오면 버튼이 사라지게? / 아니면 삭제버튼?
          아니면 다시검색할수도 있으니 검색버튼 그래도 놔둬야하나? 
          / 그리드 영역 안에는 넘어온 데이터의 아트워크url이 보이게 */}
          <button
            className="iconBtn"
            onClick={(e) => {
              e.preventDefault();
              setOpenModal(true);
            }}
          >
            <RiAddCircleLine />
          </button>
        </Grid>
        <Grid item>
          <p>Title</p>
          <input className="title" onChange={(e) => setTitle(e.target.value)} />
        </Grid>
        <Grid item>
          <p>Contents</p>
          <textarea
            className="contents"
            onChange={(e) => setContents(e.target.value)}
          />
        </Grid>
        <Grid item>
          <button type="submit">Submit</button>
        </Grid>
      </form>
      {openModal && <SearchModal closeModal={setOpenModal} />}
    </StyledContainer>
  );
}

export default CreateItem;
