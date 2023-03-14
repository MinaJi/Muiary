import { Divider, Grid } from "@mui/material";
import React, { useEffect } from "react";
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
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import SongDataList from "../components/SongDataList";
import AddIcon from "@mui/icons-material/Add";
import { BiMusic } from "react-icons/bi";
import { BsMusicNoteList } from "react-icons/bs";
import SongDataDetailsList from "../components/SongDataDetailsList";
import { AnimatePresence, motion } from "framer-motion";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";

const GridContainer = styled(Grid)`
  && {
    padding-top: 65px;
    .top-div {
      padding: 10px 0 0 25px;
      .back-icon {
        font-size: 35px;
        cursor: pointer;
        :hover {
          color: #f73859;
        }
      }
    }
    .form-wrapper {
      width: 1000px;
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
      .overlay {
        position: absolute;
        margin-top: 122.5px;
        top: 0;
        bottom: 0;
        height: 230px;
        width: 230px;
        opacity: 0;
        transition: 0.3s ease;
        background-color: #ffffff66;
        border-radius: 10px;
        .arrow-left {
          position: absolute;
          top: 45%;
          left: 2%;
          font-size: 30px;
          cursor: pointer;
          :hover {
            color: #f73859;
          }
        }
        .arrow-right {
          position: absolute;
          top: 45%;
          right: 2%;
          font-size: 30px;
          cursor: pointer;
          :hover {
            color: #f73859;
          }
        }
      }
    }
    .artwork:hover .overlay {
      opacity: 1;
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
      display: block;
      margin: 0 auto;
      padding-top: 100px;
      font-size: 40px;
      color: silver;
      :hover {
        color: #f73859;
      }
    }
    .btn-wrapper {
      padding-top: 10px;
      gap: 3px;
    }
    .icon-btn-2 {
      background-color: black;
      padding: 7px;
      border: none;
      border-radius: 10px;
      color: #fff;
      font-size: 16px;
      font-weight: 500;
      :hover {
        background-color: #f73859;
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
    .file-input-wrapper {
      padding: 10px;
      font-size: 25px;
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
      font-size: 16pxs;
      color: #a9a9a9;
    }
  }
`;

function CreateItem() {
  const navi = useNavigate();
  const { user } = UserAuth();
  const { users } = UserData();
  const [openModal, setOpenModal] = useState(false);
  const [openList, setOpenList] = useState(false);
  const [songData, setSongData] = useState("");
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const [indexNum, setIndexNum] = useState(0);
  const date = moment().format("YYYY-MM-DD, LTS");

  useEffect(() => {
    if (indexNum > 0 && !songData[indexNum]) {
      setIndexNum(indexNum - 1);
    }
  }, [songData, indexNum]);

  const goToPrev = () => {
    const isFirstIndex = indexNum === 0;
    const newIndex = isFirstIndex ? songData.length - 1 : indexNum - 1;
    setIndexNum(newIndex);
  };
  const goToNext = () => {
    const isLastIndex = indexNum === songData.length - 1;
    const newIndex = isLastIndex ? 0 : indexNum + 1;
    setIndexNum(newIndex);
  };

  const openListHandler = (e) => {
    e.preventDefault();
    setOpenList((prev) => !prev);
  };

  const fileHandler = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (!file) return;
    const fileRef = ref(storage, `cover_images/${v4()}`);
    uploadBytes(fileRef, file).then(() => {
      getDownloadURL(fileRef).then((url) => {
        setFileUrl(url);
      });
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, "boardItems"), {
      userId: user.uid,
      username: users.username,
      title: title,
      contents: contents,
      musicItem: songData,
      date: date,
      timestamp: new Date(),
      coverImage: fileUrl,
    });
    navi(-1);
  };

  return (
    <>
      <GridContainer container direction="column">
        <Grid item className="top-div">
          <ArrowBackIcon className="back-icon" onClick={() => navi(-1)} />
        </Grid>
        <Grid item>
          <Grid container justifyContent="center">
            <Grid item className="form-wrapper">
              <form onSubmit={handleSubmit}>
                <Grid container className="songdata-wrapper">
                  <Grid item xs={3}>
                    {songData.length >= 1 ? (
                      <div className="artwork">
                        <img
                          src={songData[indexNum]?.artworkUrl100}
                          alt="albumArtwork"
                        />
                        {songData.length > 1 && (
                          <>
                            <div className="overlay">
                              <ArrowBackIosNewRoundedIcon
                                className="arrow-left"
                                onClick={goToPrev}
                              />
                              <ArrowForwardIosRoundedIcon
                                className="arrow-right"
                                onClick={goToNext}
                              />
                            </div>
                          </>
                        )}
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
                    {songData.length >= 1 ? (
                      <SongDataGrid container direction="column">
                        <Grid item className="trackname">
                          {songData[indexNum]?.trackName}
                        </Grid>
                        <Grid item className="artistname">
                          {songData[indexNum]?.artistName}
                        </Grid>
                        <Grid item className="collectionname">
                          {songData[indexNum]?.collectionName}
                          <DotIcon />
                          {songData[indexNum]?.releaseDate}
                        </Grid>
                        <Grid item>
                          <Divider />
                          <Grid container className="btn-wrapper">
                            <Grid item>
                              <button
                                className="icon-btn-2"
                                onClick={(e) => {
                                  e.preventDefault();
                                  setSongData("");
                                  setOpenList(false);
                                }}
                              >
                                <p>Remove all</p>
                              </button>
                            </Grid>
                            <Grid item>
                              <button
                                className="icon-btn-2"
                                onClick={(e) => {
                                  e.preventDefault();
                                  setOpenModal(true);
                                }}
                              >
                                <AddIcon fontSize="inherit" />
                                <BiMusic />
                              </button>
                            </Grid>
                            <Grid item>
                              <button
                                className="icon-btn-2"
                                onClick={openListHandler}
                              >
                                <BsMusicNoteList />
                              </button>
                            </Grid>
                            <Grid item>
                              {songData.length > 1 && (
                                <SongDataList
                                  songData={songData}
                                  setSongData={setSongData}
                                  setIndexNum={setIndexNum}
                                />
                              )}
                            </Grid>
                          </Grid>
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
                <Grid item>
                  <AnimatePresence>
                    {openList && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <SongDataDetailsList
                          songData={songData}
                          setOpenList={setOpenList}
                          setSongData={setSongData}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Grid>
                <Grid item className="title-wrapper">
                  <label htmlFor="title">
                    <p>Title</p>
                  </label>
                  <input
                    onChange={(e) => setTitle(e.target.value)}
                    id="title"
                  />
                </Grid>
                <Grid item className="contents-wrapper">
                  <label>
                    <p>Contents</p>
                  </label>
                  <Editor setContents={setContents} id="contents" />
                </Grid>
                <Grid item className="file-input-wrapper">
                  <label htmlFor="file-input" className="file-input-label">
                    <p>Upload Cover</p>
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={fileHandler}
                    id="file-input"
                  />
                </Grid>
                <Grid item>
                  <Btn type="submit">Share</Btn>
                </Grid>
              </form>
            </Grid>
            {openModal && (
              <SearchModal
                closeModal={setOpenModal}
                setSongData={setSongData}
              />
            )}
          </Grid>
        </Grid>
      </GridContainer>
    </>
  );
}

export default CreateItem;
