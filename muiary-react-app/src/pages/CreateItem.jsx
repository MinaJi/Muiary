import { Divider, Grid } from "@mui/material";
import React from "react";
import styled from "styled-components";
import { IoIosAddCircleOutline } from "react-icons/io";
import SearchModal from "../components/SearchModal";
import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db, storage } from "../firebase-config";
import { UserAuth } from "../context/AuthContext";
import { DotIcon } from "../assets/svgs/index";
import { useNavigate } from "react-router-dom";
import Editor from "../components/Editor";
import moment from "moment";
import { UserData } from "../context/UserDataContext";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  uploadString,
} from "firebase/storage";
import { v4 } from "uuid";
import { useEffect } from "react";

const StyledContainer = styled(Grid)`
  && {
    padding-top: 65px;
    .form-wrapper {
      width: 1000px;
      padding: 2rem;
    }
    .songdata-wrapper {
      padding: 10px;
    }
    .artwork {
      img {
        width: 230px;
        height: 230px;
        border-radius: 10px;
        box-shadow: ${(props) => props.theme.addBoxShadow};
      }
    }
    .add {
      width: 230px;
      height: 230px;
      border: 1px solid ${(props) => props.theme.addBorder};
      border-radius: 10px;
      box-shadow: ${(props) => props.theme.addBoxShadow};
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
    .title-wrapper {
      padding: 10px;
      font-size: 25px;
      input {
        height: 40px;
        width: 100%;
        border: ${(props) => props.theme.inputBorder};
        background-color: ${(props) => props.theme.inputBg};
        border-radius: 15px;
      }
    }
    .contents-wrapper {
      font-size: 25px;
      padding: 10px;
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
  cursor: pointer;
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
  const { users } = UserData();
  const [openModal, setOpenModal] = useState(false);
  const [songData, setSongData] = useState("");
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState("");

  const date = moment().format("YYYY-MM-DD, LTS");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const imgRef = ref(storage, `cover_images/${file.name + v4()}`);
    uploadString(imgRef, file).then(() => {
      getDownloadURL(imgRef).then((url) => {
        setFileUrl(url);
      });
    });
    await addDoc(collection(db, "boardItems"), {
      userId: user.uid,
      username: users.username,
      title: title,
      contents: contents,
      musicItem: songData,
      date: date,
      timestamp: new Date(),
      coverImage: fileUrl,
      like: false,
      saved: false,
    });
    console.log("글작성완료~");
    navi(-1);
  };

  return (
    <>
      <StyledContainer container direction="column" alignItems="center">
        <Grid item className="form-wrapper">
          <form onSubmit={handleSubmit}>
            <Grid container className="songdata-wrapper">
              <Grid item xs={3}>
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
              <Grid item xs={9}>
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
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          setOpenModal(true);
                        }}
                      >
                        노래 추가하기
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
              <label htmlFor="title" className="title-label">
                <p>Title</p>
              </label>
              <input onChange={(e) => setTitle(e.target.value)} id="title" />
            </Grid>
            <Grid item className="contents-wrapper">
              <label htmlFor="contents">Contents</label>
              {/* 이건 안되나보네 */}
              <Editor setContents={setContents} id="contents" />
            </Grid>
            <Grid item>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setFile(e.target.value[0])}
                id="file-input"
              />
            </Grid>
            <Grid item>
              <Btn type="submit">Post</Btn>
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
