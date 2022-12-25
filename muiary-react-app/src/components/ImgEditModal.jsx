import { Grid } from "@mui/material";
import React from "react";
import styled from "styled-components";
import { useState } from "react";
import Cropper from "react-cropper";
import { useRef } from "react";
import "cropperjs/dist/cropper.css";
import { storage, updateProfileImage, upload } from "../firebase-config";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase-config";
import { UserAuth } from "../context/AuthContext";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { updateProfile } from "firebase/auth";

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

function ImgEditModal({ closeModal, image, imageName, setImageUrl }) {
  const { user } = UserAuth();

  const [photo, setPhoto] = useState(null);
  const [photoURL, setPhotoURL] = useState("");
  const [loading, setLoading] = useState(false);

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
      let imageData = await cropper.getCroppedCanvas().toDataURL("image/jpeg");
      const storageRef = ref(storage, `${user.uid}`);
      const imagesRef = ref(storageRef, imageName);
      const uploadTask = await uploadString(
        imagesRef,
        imageData,
        "data_url"
      ).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          setImageUrl(url);
          console.log(url);
        });
      });
    }
    return;
  };

  return (
    <Background>
      <ModalContainer container>
        <Grid item>
          <Cropper
            style={{ width: "200px", height: "200px" }}
            src={image}
            crop={onCropPreview}
            ref={cropperRef}
            initialAspectRatio={1 / 1}
            guides={false}
            onInitialized={(instance) => {
              setCropper(instance);
            }}
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
