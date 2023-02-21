import { Divider, Grid } from "@mui/material";
import React from "react";
import styled from "styled-components";
import { MdClose } from "react-icons/md";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase-config";
import { useNavigate } from "react-router-dom";

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
      :hover {
        color: #f73859;
      }
    }
    .body {
      padding: 25px;
      height: 200px;
      text-align: center;
      line-height: 20px;
      .title-text-wrapper {
        font-weight: 600;
        margin: 0 auto;
      }
    }
  }
`;

const BtnContainer = styled(Grid)`
  && {
    .divider {
      width: 100%;
    }
    .button-wrapper {
      padding: 23px;
      text-align: center;
      button {
        border: none;
        background-color: transparent;
        font-size: 18px;
      }
      .delete-btn {
        font-weight: 600;
        color: #e11d48;
      }
    }
  }
`;

function DeleteModal({ setDeleteModal, docId }) {
  const navi = useNavigate();

  const deleteHandler = async () => {
    const q = query(
      collection(db, "replyItems"),
      where("boardItem", "==", `${docId}`)
    );
    const snapshot = await getDocs(q);
    await deleteDoc(doc(db, "boardItems", `${docId}`)).then(
      snapshot.forEach((doc) => {
        deleteDoc(doc.ref);
      })
    );
    navi(-1);
  };

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
        <Grid container className="body" alignItems="center">
          <Grid item className="title-text-wrapper">
            <p>Delete post?</p>
          </Grid>
          <Grid item>
            <p>Deleting this post will also delete its comments, likes.</p>
            <p>Are you sure you want to delete?</p>
          </Grid>
        </Grid>
        <BtnContainer container direction="column">
          <Divider className="divider" />
          <Grid item className="button-wrapper">
            <button className="delete-btn" onClick={deleteHandler}>
              Delete
            </button>
          </Grid>
          <Divider className="divider" />
          <Grid item className="button-wrapper">
            <button onClick={() => setDeleteModal(false)}>Cancel</button>
          </Grid>
        </BtnContainer>
      </ModalContainer>
    </ModalBackground>
  );
}

export default DeleteModal;
