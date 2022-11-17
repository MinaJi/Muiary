import { Avatar, Badge } from "@mui/material";
import React from "react";
import styled from "styled-components";
import { MdEdit } from "react-icons/md";
import { useState } from "react";
import { UserAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { upload } from "../firebase-config";

const EditBadge = styled(Badge)({
  "& .MuiBadge-badge": {
    backgroundColor: "#36AE7C",
    width: "45px",
    height: "45px",
    top: "175px",
    right: "25px",
    borderRadius: "100%",
    border: "2px solid white",
  },
});

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
  cursor: pointer;
`;

function EditProfilePic() {
  const { user } = UserAuth();
  const [showEdit, setShowEdit] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [photoURL, setPhotoURL] = useState("");
  const [loading, setLoading] = useState(false);

  const updateImg = () => {
    setShowEdit((prev) => !prev);
  };

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setPhoto(e.target.files[0]);
    }
  };
  const handleUpload = () => {
    upload(photo, user, setLoading);
  };

  useEffect(() => {
    if (user?.photoURL) {
      setPhotoURL(user.photoURL);
    }
  }, [user]);

  console.log(user.photoURL);

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
        <StyledAvatar src={photoURL} />
      </EditBadge>
      {showEdit && (
        <>
          <div>
            <input type="file" onChange={handleChange} />
            <button onClick={handleUpload} disabled={loading || !photo}>
              Upload
            </button>
          </div>
        </>
      )}
    </>
  );
}

export default EditProfilePic;
