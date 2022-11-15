import { Avatar, Badge } from "@mui/material";
import React from "react";
import styled from "styled-components";
import { MdEdit } from "react-icons/md";
import { useState } from "react";

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

const Preview = styled.img`
  border: 1px solid black;
`;

function EditProfilePic() {
  const [showEdit, setShowEdit] = useState(false);

  const updateImg = () => {
    setShowEdit((prev) => !prev);
  };

  const handleChange = () => {

  };
  const handleUpload = () => {

  }

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
        <StyledAvatar />
      </EditBadge>
      {showEdit && (
        <>
          <div>
            <input type="file" onChange={handleChange} />
            <button onClick={handleUpload}>Upload</button>
            <Preview alt="preview" />
          </div>
        </>
      )}
    </>
  );
}

export default EditProfilePic;
