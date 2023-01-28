import React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Container,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import MenuIcon from "@mui/icons-material/Menu";

function Navbar({ user }) {
  const navigateHook = useNavigate();
  const logOut = () => {
    localStorage.removeItem("token");
    navigateHook("/login");
  };

  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: "#00917C", marginBottom: "1.5em" }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component={"a"}
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <HomeIcon />
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
          </Box>
          <Box sx={{ flexGrow: 1 }}>
            <Typography textAlign={"center"}>
              Bienvenue {user.role} num : {user.matricule}
            </Typography>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Button
              type="button"
              variant="contained"
              style={{ backgroundColor: "#bababa", left: "10px" }}
              onClick={() => logOut()}
            >
              LOGOUT
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
