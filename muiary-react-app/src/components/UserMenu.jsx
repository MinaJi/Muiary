import React from "react";
import { Box, Grid } from "@mui/material";
import styled from "styled-components";

const StyledBox = styled(Grid)`
  && {
    margin-top: 65px;
    width: 100%;
    background-color: #8dd8e9;
    height: calc(100vh - 65px);
  }
`;

function UserMenu() {
  return (
    <>
      {/* <StyledBox
        sx={{
          width: "100%",
          height: "100vh",
          backgroundColor: "primary.dark",
          "&:hover": {
            backgroundColor: "primary.main",
            opacity: [0.9, 0.8, 0.7],
          },
        }}
      >
        UserMenu
      </StyledBox> */}
      <Box sx={{ flexGrow: 0, display: { xs: "flex", md: "none" } }}>
        <StyledBox container>메뉴</StyledBox>
      </Box>
    </>
  );
}

export default UserMenu;
