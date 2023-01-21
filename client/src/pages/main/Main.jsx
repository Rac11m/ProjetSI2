import React from "react";
import { Button, Container, ButtonGroup, Box } from "@mui/material";
import Navbar from "../../Navbar";

function Main() {
  const buttons = [
    <Button
      variant="contained"
      size="large"
      sx={{ backgroundColor: "#00917C" }}>
      Consulter Les Actes
    </Button>,
    <Button
      variant="contained"
      size="large"
      sx={{ backgroundColor: "#00917C" }}>
      Creation nouveau acte
    </Button>,
    <Button
      variant="contained"
      size="large"
      sx={{ backgroundColor: "#00917C" }}>
      Mise a jour nouveau acte
    </Button>,
  ];

  return (
    <>
      <Navbar />
      <Container component="main">
        <Box
          sx={{
            display: "flex",
            "& > *": {
              m: 6,
            },
          }}>
          <ButtonGroup
            orientation="vertical"
            aria-label="vertical outlined button group">
            {buttons}
          </ButtonGroup>

          <ButtonGroup
            orientation="vertical"
            aria-label="vertical outlined button group">
            {buttons}
          </ButtonGroup>

          <ButtonGroup
            orientation="vertical"
            aria-label="vertical outlined button group">
            {buttons}
          </ButtonGroup>
        </Box>
      </Container>
    </>
  );
}

export default Main;
