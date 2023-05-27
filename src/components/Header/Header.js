import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { currentDate } from "../../utils/constants";
import { ToggleSwitch } from "../ToggleSwitch/ToggleSwitch";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import "./Header.css";

import { styled, Stack } from "@mui/material";

import Container from "@mui/material/Container";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

const Menu = styled(Box)({
  borderBottom: "1px solid black",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  paddingTop: 2,
  marginTop: 5,
});

const MenuItem = styled(Button)({
  fontWeight: 900,
  fontSize: "12px",
  marginRight: "2px",
});

const Logo = styled("div")({
  fontWeight: 900,
  color: "black",
  fontSize: "34px",
  cursor: "pointer",
});

const LogoDesc = styled(Box)({
  fontWeight: 600,
  color: "black",
  fontSize: "16px",
  marginTop: "5px",
});

export function Header({
  isLoggedIn,
  weatherData,
  onAddClick,
  onLoginClick,
  onRegisterClick,
}) {
  const currentUser = useContext(CurrentUserContext);

  if (!weatherData) return null;

  return (
    <>
      <Container>
        <AppBar position="static" color="transparent" elevation={0}>
          <Menu>
            <Stack direction={"row"} flex={1}>
              <Link to={"/"} style={{ textDecoration: "none" }}>
                <Logo>wtwr</Logo>
              </Link>

              <Stack direction={"column"} marginTop={1} marginLeft={1}>
                <LogoDesc>
                  {currentDate}, {weatherData.name}
                </LogoDesc>
              </Stack>
            </Stack>

            {isLoggedIn ? (
              <>
                <Stack direction={"row"} m={1}>
                  <ToggleSwitch />
                  <div className="header__info-user">
                    <button
                      className="header__add-clothes"
                      type="button"
                      onClick={onAddClick}
                    >
                      + Add clothes
                    </button>
                    <p className="header__username">{currentUser.name}</p>
                    <Link to={"/profile"}>
                      <img
                        className="header__avatar"
                        alt="Avatar"
                        src={currentUser.avatar}
                      />
                    </Link>
                  </div>
                </Stack>
              </>
            ) : (
              <>
                <Stack
                  direction={"row"}
                  sx={{ top: "-20px", position: "relative" }}
                >
                  {/* <ToggleSwitch /> */}
                </Stack>
                <Stack direction={"row"} m={1}>
                  <Button
                    onClick={onLoginClick}
                    color="inherit"
                    sx={{
                      color: "#000",
                      fontWeight: "bold",
                      marginRight: "5px",
                    }}
                  >
                    Log in
                  </Button>
                  <MenuItem
                    onClick={onRegisterClick}
                    color="inherit"
                    sx={{
                      color: "#0049fb",
                      fontWeight: "bold",
                      border: "1px solid #0049fb",
                    }}
                  >
                    Sign up
                  </MenuItem>
                </Stack>
              </>
            )}
          </Menu>
        </AppBar>
      </Container>
    </>
  );
}
