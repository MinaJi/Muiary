import { Avatar, Divider, Grid } from "@mui/material";
import React, { useRef, useState } from "react";
import { Cropper } from "react-cropper";
import styled from "styled-components";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const Header = styled(Grid)`
  && {
    padding: 20px 20px 10px 20px;
    .close-btn {
      background-color: transparent;
      border: none;
      height: max-content;
      padding: 0;
      .icon {
        font-size: 30px;
      }
      :hover {
        color: #f73859;
      }
    }
    .btn {
      border: none;
      background-color: black;
      color: white;
      border-radius: 20px;
      padding: 6px 20px 6px 20px;
      font-size: 16px;
      font-weight: 600;
      :hover {
        background-color: #f73859;
      }
    }
    .title {
      font-size: 23px;
      font-weight: 700;
      color: ${(props) => props.theme.textColor};
    }
  }
`;

const CropperDiv = styled(Grid)`
  && {
    margin-top: 12px;
    .avatar-div {
      background-color: ${(props) => props.theme.profileBgColor};
      padding: 15px;
    }
    .avatar {
      width: 180px;
      height: 180px;
      margin: 0 auto;
    }
  }
`;

function ImageEditor({ imgFile, setImgFile, setEditImg, setPreview }) {
  const cropperRef = useRef("");
  const [cropper, setCropper] = useState();
  const [croppedImg, setCroppedImg] = useState("");

  const onCropPreview = () => {
    const imageElement = cropperRef?.current;
    const cropper = imageElement?.cropper;
    setCroppedImg(cropper.getCroppedCanvas().toDataURL());
  };

  const handleUndo = () => {
    setImgFile("");
    setEditImg(false);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (typeof cropper !== "undefined") {
      let imageData = await cropper.getCroppedCanvas().toDataURL("image/png");
      setPreview(imageData);
      setEditImg(false);
    }
    return;
  };

  return (
    <Grid container direction="column">
      <Header container justifyContent="space-between">
        <Grid item>
          <button className="close-btn" onClick={handleUndo}>
            <ArrowBackIcon className="icon" />
          </button>
        </Grid>
        <Grid item xs={8}>
          <p className="title">Edit Photo</p>
        </Grid>
        <Grid item>
          <button className="btn" onClick={handleUpload}>
            Apply
          </button>
        </Grid>
      </Header>
      <Divider />
      <Grid item>
        <CropperDiv container direction="column" alignContent="center">
          <Grid item className="cropper">
            <Cropper
              style={{ width: "300px", height: "300px" }}
              src={imgFile}
              crop={onCropPreview}
              ref={cropperRef}
              initialAspectRatio={1 / 1}
              guides={true}
              onInitialized={(instance) => {
                setCropper(instance);
              }}
            />
          </Grid>
          <Grid item className="avatar-div">
            <Avatar src={croppedImg} alt="croppedimg" className="avatar" />
          </Grid>
        </CropperDiv>
      </Grid>
    </Grid>
  );
}

export default ImageEditor;
