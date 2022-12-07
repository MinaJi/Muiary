import { Grid } from "@mui/material";
import React from "react";
import styled from "styled-components";
import { RiAddCircleLine } from "react-icons/ri";
import SearchModal from "../components/SearchModal";
import { useState } from "react";

const StyledContainer = styled(Grid)`
  && {
    font-size: 30px;
    input {
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

function CreateItem() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <StyledContainer container direction="column" alignItems="center">
      <Grid item className="addInfo">
        <button
          className="iconBtn"
          onClick={() => {
            setOpenModal(true);
          }}
        >
          <RiAddCircleLine />
        </button>
      </Grid>
      <Grid item>
        <p>Title</p>
        <input className="title" />
      </Grid>
      <Grid item>
        <p>Contents</p>
        <input className="contents" />
      </Grid>
      <Grid item>
        <button>Submit</button>
      </Grid>
      {openModal && <SearchModal closeModal={setOpenModal} />}
    </StyledContainer>
  );
}

export default CreateItem;
