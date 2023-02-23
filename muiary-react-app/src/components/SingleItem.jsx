import { Divider, Grid, ListItemIcon, Menu, MenuItem } from "@mui/material";
import React, { useState } from "react";
import styled from "styled-components";
import ReplyInput from "./ReplyInput";
import { DotIcon } from "../assets/svgs/index";
import parser from "html-react-parser";
import "../css/quill.snow.css";
import { FastAverageColor } from "fast-average-color";
import BoardProfile from "./BoardProfile";
import { UserAuth } from "../context/AuthContext";
import { youtubeSearch } from "../apis/youtube";
import MenuIcon from "@mui/icons-material/Menu";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { RiHeart2Line, RiHeart2Fill, RiBookmarkLine } from "react-icons/ri";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import LinkIcon from "@mui/icons-material/Link";
import DeleteModal from "./DeleteModal";

const GridContainer = styled(Grid)`
  && {
    strong {
      font-weight: bold;
    }
    em {
      font-style: italic;
    }
    padding-top: 65px;
    justify-content: center;
    .grid-wrapper {
      padding: 40px;
      border: none;
      border-radius: 25px;
      width: 1000px;
      height: max-content;
      overflow: hidden;
      -webkit-backface-visibility: hidden;
      -webkit-transform: translate3d(0, 0, 0);
    }
    .header {
      height: 1px;
      img {
        filter: blur(8rem);
        -webkit-backdrop-filter: blur(8rem);
        width: 1000px;
        z-index: -1;
        background: no-repeat;
      }
    }
    .title-wrapper {
      line-height: 28px;
      .title {
        font-size: 28px;
        font-weight: 600;
      }
    }
    .body-wrapper {
      padding-top: 20px;
      line-height: 32px;
      position: relative;
      @media screen and (max-width: 576px) {
        flex-direction: column;
      }
      img {
        width: 250px;
        height: 250px;
        box-shadow: rgba(0, 0, 0, 0.145) 0px 0px 15px;
        border-radius: 7px;
      }
      .img-wrapper {
        .overlay {
          position: absolute;
          margin-top: 20px;
          top: 0;
          bottom: 0;
          height: 250px;
          width: 250px;
          opacity: 0;
          transition: 0.3s ease;
          background-color: #ffffff66;
          border-radius: 7px;
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
      .img-wrapper:hover .overlay {
        opacity: 1;
      }
    }
    .body {
      padding: 20px;
      background-color: #ffffff50;
      border-radius: 20px;
      height: max-content;
      max-height: 260px;
      @media screen and (max-width: 576px) {
        background: red;
      }
    }
    .trackname {
      /* font-size: 35px; */
      font-size: 2.1875rem;
      /* font-size: clamp(2.1875rem, 80vw, 0.8rem); */
      font-weight: 700;
    }
    .artist {
      font-size: 25px;
      color: #f73859;
      font-weight: 600;
    }
    .album {
      font-size: 16px;
      color: inherit;
    }
    .contents-wrapper {
      background-color: #ffffff70;
      border-radius: 20px;
      max-height: 500px;
      margin-bottom: 20px;
      overflow: hidden;
    }
    .ql-editor {
      overflow-y: scroll;
      max-height: 500px;
      ::-webkit-scrollbar {
        background-color: transparent;
        width: 16px;
      }
      ::-webkit-scrollbar-track {
        background-color: transparent;
      }
      ::-webkit-scrollbar-thumb {
        background-color: #c1c1c187;
        border: 4px solid transparent;
        border-radius: 20px;
        background-clip: padding-box;
      }
    }
    .divider {
      padding: 7px;
    }
    .side-nav {
      .menu-items {
        position: fixed;
      }
      button {
        background-color: transparent;
        border: none;
        font-size: 30px;
        padding-bottom: 6px;
        :hover {
          color: #f73859;
        }
      }
    }
  }
`;

const Btn = styled.button`
  border: none;
  background: transparent;
  font-size: 35px;
  padding: 0;
  :hover {
    color: #ff0000;
  }
`;

const SyledMenu = styled(Menu)`
  && {
    z-index: 0;
    .MuiPaper-elevation8 {
      width: 145px;
    }
    .copied {
      color: #f73859;
      font-weight: 500;
    }
  }
`;

function SingleItem({
  docId,
  title,
  contents,
  date,
  userId,
  username,
  musicItem,
}) {
  const { user } = UserAuth();
  const [indexNum, setIndexNum] = useState(0);
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [isCopied, setIsCopied] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const goToPrev = () => {
    const isFirstIndex = indexNum === 0;
    const newIndex = isFirstIndex ? musicItem.length - 1 : indexNum - 1;
    setIndexNum(newIndex);
  };
  const goToNext = () => {
    const isLastIndex = indexNum === musicItem.length - 1;
    const newIndex = isLastIndex ? 0 : indexNum + 1;
    setIndexNum(newIndex);
  };

  const fac = new FastAverageColor();
  fac
    .getColorAsync(musicItem[indexNum].artworkUrl100)
    .then((color) => {
      if (color.value[0] >= 230) {
        document.getElementById("artwork-bg").style.filter =
          "blur(8rem) brightness(75%)";
      }
    })
    .catch((e) => {
      console.log(e);
    });

  const urlOpenHandler = () => {
    youtubeSearch(
      musicItem[indexNum].trackName + musicItem[indexNum].artistName
    ).then((res) =>
      window.open("https://www.youtube.com/watch?v=" + res.items[0].id.videoId)
    );
  };

  const handleOpenNavMenu = (e) => {
    setAnchorElNav(e.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const copyToClipboard = async () => {
    const url = window.location.href;
    await navigator.clipboard.writeText(url);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1500);
  };

  return (
    <>
      <GridContainer container>
        <Grid item xs={1.5} id="background">
          <BoardProfile username={username} />
        </Grid>
        <Grid item xs={9} className="grid-wrapper">
          <Grid container className="header">
            <img
              src={musicItem[indexNum].artworkUrl100}
              alt="artwork"
              id="artwork-bg"
            />
          </Grid>
          <Grid item className="title-wrapper">
            <Grid item>
              <p className="title">{title}</p>
            </Grid>
            <Grid item>
              <p className="date">{date}</p>
            </Grid>
          </Grid>
          <Divider className="divider" />
          <Grid container className="body-wrapper">
            <Grid container spacing={10}>
              <Grid item className="img-wrapper" xs={3}>
                <img
                  src={musicItem[indexNum].artworkUrl100}
                  alt="artwork"
                  className="artwork-img"
                />
                {musicItem.length > 1 && (
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
              </Grid>
              <Grid item xs={9}>
                <Grid container className="body" direction="column" id="body">
                  <Grid item className="trackname">
                    {musicItem[indexNum].trackName}
                  </Grid>
                  <Grid item className="artist">
                    {musicItem[indexNum].artistName}
                  </Grid>
                  <Grid item className="album">
                    {musicItem[indexNum].collectionName}
                    <DotIcon />
                    {musicItem[indexNum].releaseDate}
                  </Grid>
                  <Divider />
                  <Grid container>
                    <Grid item>
                      <Btn onClick={urlOpenHandler}>
                        <YouTubeIcon fontSize="inherit" />
                      </Btn>
                    </Grid>
                    <Grid item>
                      <span>Play on YouTube.</span>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid container className="contents-wrapper">
              <Grid item className="contents" xs={12}>
                <div className="ql-editor">{parser(`${contents}`)}</div>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <ReplyInput />
          </Grid>
        </Grid>
        <Grid item xs={1.5} className="side-nav">
          <Grid container direction="column">
            <Grid item className="menu-items">
              {user.uid === userId && (
                <Grid item>
                  <button onClick={handleOpenNavMenu}>
                    <MenuIcon fontSize="inherit" />
                  </button>
                </Grid>
              )}
              <Grid item>
                <button>
                  <RiHeart2Line />
                </button>
                <SyledMenu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                >
                  <MenuItem
                    onClick={() => {
                      setDeleteModal(true);
                    }}
                  >
                    <ListItemIcon>
                      <DeleteIcon />
                    </ListItemIcon>
                    <p>Delete</p>
                  </MenuItem>
                  <MenuItem>
                    <ListItemIcon>
                      <EditIcon />
                    </ListItemIcon>
                    <p>Edit</p>
                  </MenuItem>
                  <MenuItem onClick={copyToClipboard}>
                    <ListItemIcon>
                      <LinkIcon />
                    </ListItemIcon>
                    {isCopied ? (
                      <p className="copied">Copied!</p>
                    ) : (
                      <p>Copy link</p>
                    )}
                  </MenuItem>
                </SyledMenu>
              </Grid>
              <Grid item>
                <button>
                  <RiBookmarkLine className="icon" />
                </button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </GridContainer>
      {deleteModal && (
        <DeleteModal setDeleteModal={setDeleteModal} docId={docId} />
      )}
    </>
  );
}

export default SingleItem;
