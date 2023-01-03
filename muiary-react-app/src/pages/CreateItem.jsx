import { Grid } from "@mui/material";
import React from "react";
import styled from "styled-components";
import { RiAddCircleLine } from "react-icons/ri";
import SearchModal from "../components/SearchModal";
import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase-config";
import { UserAuth } from "../context/AuthContext";
import MainHeader from "../components/MainHeader";

const StyledContainer = styled(Grid)`
  && {
    padding-top: 65px;
    font-size: 30px;
    input,
    textarea {
      width: 500px;
      border: 1px solid gray;
      border-radius: 10px;
    }
    .form-wrapper {
      width: 700px;
      padding: 2rem;
      border-radius: 20px;
      border: 1px solid silver;
    }
    .add {
      width: 150px;
      height: 150px;
      border: 1px solid black;
      border-radius: 10px;
    }
    .icon-btn {
      width: 50px;
      height: 50px;
      background-color: inherit;
      border: none;
      cursor: pointer;
      display: block;
      margin: 0 auto;
      margin-top: 50px;
      font-size: 30px;
      :hover {
        color: #f73859;
      }
    }
    .songdata-wrapper {
      background-color: lightblue;
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

function CreateItem() {
  const { user } = UserAuth();
  const [openModal, setOpenModal] = useState(false);
  const [songData, setSongData] = useState("");
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, "boardItems"), {
      userId: user.uid,
      title: title,
      contents: contents,
      musicItem: songData,
    });
    console.log("글작성완료~");
  };

  return (
    <>
      <MainHeader />
      {/* <img src={songData.artworkUrl100} alt="none" width="500px" /> */}
      <StyledContainer container direction="column" alignItems="center">
        <Grid item className="form-wrapper">
          <form onSubmit={handleSubmit}>
            <Grid container className="songdata-wrapper">
              <Grid item xs={3}>
                <div className="add">
                  <button
                    className="icon-btn"
                    onClick={(e) => {
                      e.preventDefault();
                      setOpenModal(true);
                    }}
                  >
                    <RiAddCircleLine />
                  </button>
                </div>
              </Grid>
              <Grid item xs={9}>
                {songData ? (
                  <div>
                    <p>{songData.collectionName}</p>
                  </div>
                ) : (
                  <div>
                    <p>No songs selected...</p>
                  </div>
                )}
              </Grid>
            </Grid>
            <Grid item className="title-wrapper">
              <p>Title</p>
              <input
                className="title"
                onChange={(e) => setTitle(e.target.value)}
              />
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
        </Grid>
        {openModal && (
          <SearchModal closeModal={setOpenModal} setSongData={setSongData} />
        )}
      </StyledContainer>
    </>
  );
}

export default CreateItem;
