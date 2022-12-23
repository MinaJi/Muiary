import { Grid } from "@mui/material";
import React from "react";
import styled from "styled-components";
import { useState } from "react";
import Cropper from "react-cropper";
import { useRef } from "react";
import "cropperjs/dist/cropper.css";
import { upload } from "../firebase-config";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase-config";
import { UserAuth } from "../context/AuthContext";
import { async } from "@firebase/util";

const Background = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #0000008d;
  top: 0;
  left: 0;
  z-index: 300;
`;

const ModalContainer = styled(Grid)`
  && {
    background-color: #ffffff;
    width: 600px;
    height: 500px;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    padding: 25px;
    box-shadow: rgba(97, 97, 97, 0.35) 0px 5px 15px;
  }
`;

function ImgEditModal({ closeModal, previewImg }) {
  const { user } = UserAuth();

  const [photo, setPhoto] = useState(null);
  const [photoURL, setPhotoURL] = useState("");
  const [loading, setLoading] = useState(false);
  const usersRef = doc(db, `users/${user.uid}`);

  const cropperRef = useRef("");
  const [croppedImg, setCroppedImg] = useState("");
  //   const blob = new Blob();
  //   const newImage = new File([blob], blob.name, { type: blob.type });
  // 크롭된 이미지 어캐해야 주소로 보낼 수 있는지????????

  const onCrop = () => {
    const imageElement = cropperRef?.current;
    const cropper = imageElement?.cropper;
    setCroppedImg(cropper.getCroppedCanvas().toDataURL("image/jpge"));
  };

  const handleUpload = async () => {
    console.log(croppedImg);
    upload(photo, user, setLoading);
    try {
      await updateDoc(usersRef, {
        profileImgUrl: photoURL,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Background>
      <ModalContainer container>
        <Grid item>
          <Cropper
            style={{ width: "200px", height: "200px" }}
            src={previewImg}
            crop={onCrop}
            ref={cropperRef}
            initialAspectRatio={1 / 1}
            guides={false}
          />
        </Grid>
        <Grid item>
          <img src={croppedImg} alt="croppedimg" width="200px" />
          <button onClick={handleUpload}>upload</button>
        </Grid>
        <Grid item>
          <button
            onClick={() => {
              closeModal(false);
            }}
          >
            닫기
          </button>
        </Grid>
      </ModalContainer>
    </Background>
  );
}

export default ImgEditModal;
