import { Avatar, Grid } from "@mui/material";
import React from "react";
import styled from "styled-components";
import { useState } from "react";
import Cropper from "react-cropper";
import { useRef } from "react";
import "cropperjs/dist/cropper.css";
import { db, storage } from "../firebase-config";
import { UserAuth } from "../context/AuthContext";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { updateProfile } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { MdClose } from "react-icons/md";

const Background = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.modalBg};
  top: 0;
  left: 0;
  z-index: 300;
`;

const ModalContainer = styled(Grid)`
  && {
    background-color: ${(props) => props.theme.bgColor};
    width: 350px;
    height: max-content;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    padding: 25px;
    box-shadow: ${(props) => props.theme.modalBoxShadow};
    .item {
      margin: 0 auto;
    }
  }
`;

const StyledAvatar = styled(Avatar)`
  && {
    width: 200px;
    height: 200px;
    margin-top: 10px;
  }
`;

const Btn = styled.button`
  border: none;
  background-color: black;
  color: white;
  border-radius: 20px;
  width: max-content;
  padding: 10px;
  font-size: 15px;
  margin-top: 10px;
  :hover {
    background-color: #f73859;
  }
`;

const CloseBtn = styled(Grid)`
  && {
    display: flex;
    justify-content: flex-end;
    .btn {
      background-color: transparent;
      border: none;
      font-size: 30px;
      :hover {
        color: #f73859;
      }
    }
  }
`;

function ImgEditModal({ closeModal, image, imageName, setImageUrl, setImage }) {
  const { user } = UserAuth();
  const usersRef = doc(db, `users/${user.uid}`);

  const cropperRef = useRef("");
  const [cropper, setCropper] = useState();
  const [croppedImg, setCroppedImg] = useState("");

  const onCropPreview = () => {
    const imageElement = cropperRef?.current;
    const cropper = imageElement?.cropper;
    setCroppedImg(cropper.getCroppedCanvas().toDataURL());
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (typeof cropper !== "undefined") {
      let imageData = await cropper.getCroppedCanvas().toDataURL("image/png");
      const storageRef = ref(storage, `${user.uid}`);
      const imagesRef = ref(storageRef, imageName);
      await uploadString(imagesRef, imageData, "data_url").then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          setImageUrl(url);
          updateProfile(user, { photoURL: url });
          updateDoc(usersRef, {
            profileImgUrl: url,
          });
        });
      });
    }
    return;
  };

  return (
    <Background>
      <ModalContainer container direction="column">
        <CloseBtn item>
          <button
            className="btn"
            onClick={() => {
              setImage("");
              closeModal(false);
            }}
          >
            <MdClose />
          </button>
        </CloseBtn>
        <Grid item className="item">
          <Cropper
            style={{ width: "200px", height: "200px" }}
            src={image}
            crop={onCropPreview}
            ref={cropperRef}
            initialAspectRatio={1 / 1}
            guides={true}
            onInitialized={(instance) => {
              setCropper(instance);
            }}
          />
        </Grid>
        <Grid item className="item">
          <StyledAvatar src={croppedImg} alt="croppedimg" width="200px" />
        </Grid>
        <Grid item className="item">
          <Btn onClick={handleUpload}>Upload</Btn>
        </Grid>
      </ModalContainer>
    </Background>
  );
}

export default ImgEditModal;
