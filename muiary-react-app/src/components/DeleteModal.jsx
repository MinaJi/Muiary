import { Divider, Grid } from "@mui/material";
import React from "react";
import styled from "styled-components";
import { MdClose } from "react-icons/md";

const ModalBackground = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.modalBg};
  top: 0;
  right: 0;
  left: 0;
  z-index: 300;
`;

const ModalContainer = styled(Grid)`
  && {
    background-color: ${(props) => props.theme.bgColor};
    width: 300px;
    height: max-content;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    box-shadow: ${(props) => props.theme.modalBoxShadow};
    .close-btn-div {
      display: flex;
      justify-content: flex-end;
      padding: 10px 10px 0px 0px;
    }
    .close-btn {
      background-color: transparent;
      border: none;
      font-size: 28px;
      cursor: pointer;
      :hover {
        color: #f73859;
      }
    }
    .body {
      padding: 25px;
      height: 200px;
    }
  }
`;

const BtnContainer = styled(Grid)`
  && {
    .divider {
      width: 100%;
    }
  }
`;

function DeleteModal({ setDeleteModal }) {
  return (
    <ModalBackground>
      <ModalContainer container direction="column">
        <Grid item className="close-btn-div">
          <button
            className="close-btn"
            onClick={() => {
              setDeleteModal(false);
            }}
          >
            <MdClose />
          </button>
        </Grid>
        <Grid item className="body">
          <p>정말삭제?</p>
        </Grid>
        <BtnContainer container direction="column">
          <Divider className="divider" />
          <Grid item>
            <button>YEs</button>
          </Grid>
          <Divider className="divider" />
          <Grid item>
            <button>No</button>
          </Grid>
        </BtnContainer>
      </ModalContainer>
    </ModalBackground>
  );
}

export default DeleteModal;
