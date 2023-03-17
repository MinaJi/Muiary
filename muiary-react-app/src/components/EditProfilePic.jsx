import { Avatar, Badge, Grid } from "@mui/material";
import React from "react";
import styled from "styled-components";
import { MdEdit } from "react-icons/md";
import { useState } from "react";
import { UserAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { RiUpload2Line } from "react-icons/ri";
import ImgEditModal from "./ImgEditModal";
import { updateProfile } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase-config";

const EditBadge = styled(Badge)(() => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#F73859",
    width: "45px",
    height: "45px",
    top: "175px",
    right: "25px",
    borderRadius: "100%",
    border:
      window.localStorage.getItem("theme") === "light"
        ? "2px solid #fff"
        : "2px solid #222831",
  },
}));

const StyledAvatar = styled(Avatar)`
  && {
    width: 200px;
    height: 200px;
  }
`;

const EditBtn = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 20px;
`;

const EditWrapper = styled.div`
  display: block;
  margin: 0 auto;
  margin-top: 1.5rem;
  width: max-content;
  border: ${(props) => props.theme.inputBorder};
  border-radius: 20px;
  padding: 10px;
  align-items: center;
  background-color: ${(props) => props.theme.inputBg};
  color: ${(props) => props.theme.textColor};
  .file-input-wrapper {
    border: 1px dashed ${(props) => props.theme.inputBorderColor};
    border-radius: 10px;
    margin-bottom: 5px;
    font-size: 14px;
    font-weight: 600;
    padding: 10px;
    text-align: center;
    cursor: pointer;
    :hover {
      color: #f73859;
    }
    .input-label {
      cursor: pointer;
    }
    input {
      display: none;
    }
  }
`;

const Btn = styled.button`
  margin: 2.5px;
  border: ${(props) => props.theme.inputBorder};
  background-color: transparent;
  border-radius: 20px;
  padding: 8px;
  font-size: 13px;
  color: ${(props) => props.theme.textColor};
  :hover {
    background-color: #f73859;
    border: 1px solid #f73859;
    color: #fff;
  }
`;

function EditProfilePic() {
  const { user } = UserAuth();
  const usersRef = doc(db, `users/${user.uid}`);
  const [showEdit, setShowEdit] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [error, setError] = useState();
  const [image, setImage] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imageName, setImageName] = useState("");

  const updateImg = () => {
    setShowEdit((prev) => !prev);
  };

  const handleChange = (e) => {
    setError("");
    try {
      setImageName(`${user.uid}`);
      e.preventDefault();
      let files;
      if (e.dataTransfer) {
        files = e.dataTransfer.files;
      } else if (e.target) {
        files = e.target.files;
      }
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(files[0]);
      setOpenModal(true);
      e.target.value = null;
    } catch (error) {
      e.target.value = null;
      setError("파일 선택 안되었음 실패");
      setOpenModal(false);
    }
  };

  const deleteImg = (e) => {
    e.preventDefault();
    setImageUrl("");
    updateProfile(user, { photoURL: "" });
    updateDoc(usersRef, {
      profileImgUrl: "",
    });
  };

  useEffect(() => {
    if (user?.photoURL) {
      setImageUrl(user.photoURL);
    }
  }, [user]);

  console.log(user)

  return (
    <>
      <EditBadge
        badgeContent={
          <EditBtn onClick={updateImg}>
            <MdEdit />
          </EditBtn>
        }
        overlap="circular"
      >
        <StyledAvatar src={imageUrl} id="profile" />
      </EditBadge>
      {showEdit && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{ width: "200px" }}
        >
          <EditWrapper>
            <div className="file-input-wrapper">
              <label htmlFor="file-input" className="input-label">
                <div>
                  <RiUpload2Line style={{ fontSize: "20px" }} />
                </div>
                Choose a file...
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleChange}
                id="file-input"
              />
            </div>
            <Grid item>
              <Btn onClick={deleteImg}>Delete profile pic</Btn>
            </Grid>
          </EditWrapper>
        </motion.div>
      )}
      {openModal && (
        <ImgEditModal
          closeModal={setOpenModal}
          image={image}
          imageName={imageName}
          setImageUrl={setImageUrl}
          setImage={setImage}
        />
      )}
    </>
  );
}

export default EditProfilePic;
