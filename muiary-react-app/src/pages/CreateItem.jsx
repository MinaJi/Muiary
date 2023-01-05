import { Divider, Grid } from "@mui/material";
import React from "react";
import styled from "styled-components";
import { IoIosAddCircleOutline } from "react-icons/io";
import SearchModal from "../components/SearchModal";
import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase-config";
import { UserAuth } from "../context/AuthContext";
import MainHeader from "../components/MainHeader";
import { DotIcon } from "../assets/svgs/index";
import { useNavigate } from "react-router-dom";
import Editor from "../components/Editor";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import parser from "html-react-parser";

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
      width: 1000px;
      padding: 2rem;
      /* border-radius: 20px; */
      /* border: 1px solid silver; */
    }
    .songdata-wrapper {
      padding: 10px;
    }
    .artwork {
      img {
        width: 230px;
        height: 230px;
        border-radius: 10px;
        box-shadow: rgba(97, 97, 97, 0.434) 0px 5px 15px;
      }
    }
    .add {
      width: 230px;
      height: 230px;
      border: 1px solid #eaeaea;
      border-radius: 10px;
      box-shadow: rgba(97, 97, 97, 0.158) 0px 0px 20px;
    }
    .icon-btn {
      width: 50px;
      height: 50px;
      background-color: transparent;
      border: none;
      cursor: pointer;
      display: block;
      margin: 0 auto;
      padding-top: 100px;
      font-size: 40px;
      color: silver;
      :hover {
        color: #f73859;
      }
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

const SongDataGrid = styled(Grid)`
  && {
    padding: 10px 10px 10px 20px;
    line-height: 32px;
    font-size: 18px;
    .trackname {
      font-size: 32px;
      font-weight: 600;
    }
    .artistname {
      font-size: 25px;
      color: #f73859;
      font-weight: 500;
    }
    .collectionname {
      font-size: 16px;
      color: #a9a9a9;
    }
  }
`;

function CreateItem() {
  const navi = useNavigate();
  const { user } = UserAuth();
  const [openModal, setOpenModal] = useState(false);
  const [songData, setSongData] = useState("");
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, "users", `${user.uid}`, "boardItems"), {
      userId: user.uid,
      title: title,
      contents: contents,
      musicItem: songData,
      like: false,
      saved: false,
    });
    console.log("글작성완료~");
    navi(-1);
  };

  const [addData, setVal] = useState("");
  const [addedData, showData] = useState(0);

  return (
    <>
      <MainHeader />
      <StyledContainer container direction="column" alignItems="center">
        <Grid item className="form-wrapper">
          <form onSubmit={handleSubmit}>
            <Grid container className="songdata-wrapper">
              <Grid item>
                {songData ? (
                  <div className="artwork">
                    <img src={songData.artworkUrl100} alt="albumArtwork" />
                  </div>
                ) : (
                  <div className="add">
                    <button
                      className="icon-btn"
                      onClick={(e) => {
                        e.preventDefault();
                        setOpenModal(true);
                      }}
                    >
                      <IoIosAddCircleOutline />
                    </button>
                  </div>
                )}
              </Grid>
              <Grid item>
                {songData ? (
                  <SongDataGrid container direction="column">
                    <Grid item className="trackname">
                      {songData.trackName}
                    </Grid>
                    <Grid item className="artistname">
                      {songData.artistName}
                    </Grid>
                    <Grid item className="collectionname">
                      {songData.collectionName}
                      <DotIcon />
                      {songData.releaseDate}
                    </Grid>
                    <Grid item>
                      <Divider />
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          setOpenModal(true);
                          setSongData("");
                        }}
                      >
                        다시검색?
                      </button>
                    </Grid>
                  </SongDataGrid>
                ) : (
                  <div
                    style={{
                      padding: "10px",
                      paddingLeft: "20px",
                      fontSize: "23px",
                      color: "silver",
                    }}
                  >
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
              {/* <textarea
                className="contents"
                onChange={(e) => setContents(e.target.value)}
              /> */}
              <Editor />
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
