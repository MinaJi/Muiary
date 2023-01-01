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

const Btn = styled.button`
  background-color: black;
  border: none;
  border-radius: 20px;
  padding: 10px;
  font-size: 20px;
  color: white;
  :hover {
    background-color: #f73859;
  }
`;

function CreateItem({ props }) {
  const { user } = UserAuth();
  const [openModal, setOpenModal] = useState(false);
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");

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
        <Grid item className="title-wrapper">
          <p>Title</p>
          <input className="title" onChange={(e) => setTitle(e.target.value)} />
        </Grid>
        <Grid item className="contents-wrapper">
          <p>Contents</p>
          <textarea
            className="contents"
            onChange={(e) => setContents(e.target.value)}
          />
        </Grid>
        <Grid item>
          <Btn type="submit">Submit</Btn>
        </Grid>
      </form>
      {openModal && <SearchModal closeModal={setOpenModal} />}
    </StyledContainer>
  );
}

export default CreateItem;
