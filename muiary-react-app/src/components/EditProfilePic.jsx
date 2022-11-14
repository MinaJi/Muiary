import { Avatar, Badge } from "@mui/material";
import React from "react";
import styled from "styled-components";
import { MdEdit } from "react-icons/md";

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
  const updateImg = () => {
    alert("dfsdfdsf");
  };

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
    </>
  );
}

export default EditProfilePic;
