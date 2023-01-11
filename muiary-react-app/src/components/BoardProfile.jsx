import { Avatar } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const StyledAvatar = styled(Avatar)`
  && {
    width: 75px;
    height: 75px;
    cursor: pointer;
  }
`;

const Div = styled.div`
  position: fixed;
  padding: 20px;
`;

function BoardProfile({ username }) {
  const navi = useNavigate();

  return (
    <Div>
      <StyledAvatar>
        <img src="" alt="profile" onClick={() => navi(`/muiary/${username}`)} />
      </StyledAvatar>
      <div>
        @{username}
      </div>
    </Div>
  );
}

export default BoardProfile;
