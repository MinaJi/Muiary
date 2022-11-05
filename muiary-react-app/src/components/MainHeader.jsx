import React, { useState } from "react";
import styled from "styled-components";
import { CiLight, CiDark } from "react-icons/ci";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";

const Header = styled(Grid)`
  && {
    height: 65px;
    background-color: rgba(255, 255, 255, 0.7);
    border-bottom: 1px solid #cccccc;
    backdrop-filter: blur(20px);
    width: 100%;
    position: fixed;
    padding-left: 15px;
  }
`;

const Btn = styled.button`
  background-color: inherit;
  border: 1px solid #cccccc;
  border-radius: 10px;
  width: 70px;
  height: 40px;
  margin: 3px;
  cursor: pointer;
`;

const TextBtn = styled.button`
  cursor: pointer;
  border: none;
  background-color: inherit;
  font-size: 15px;
  font-weight: bold;
`

const Img = styled.img`
  height: 50px;
  display: flex;
`;

const pages = ["Products", "Pricing", "Blog"];

function MainHeader() {
  const [anchorElNav, setAnchorElNav] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <Header position="static" alignItems="ceter">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Img src="/static/logoonlytext.png" alt="logo" />
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
              style={{ color: "black" }}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <TextBtn
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "black", display: "block" }}
              >
                {page}
              </TextBtn>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Btn>Sign up</Btn>
            <Btn>Sign in</Btn>
            <CiDark style={{fontSize:"inherite"}}/>
          </Box>
        </Toolbar>
      </Container>
    </Header>
  );
}

export default MainHeader;
