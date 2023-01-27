import React from "react";
import { Button, Container, ButtonGroup, Box } from "@mui/material";
import Navbar from "../../Navbar";

const Main = ({ user }) => {
  const buttons = [
    <Button
      key={0}
      variant="contained"
      size="large"
      sx={{ backgroundColor: "#00917C" }}
    >
      Consulter Les Actes
    </Button>,
    <Button
      key={1}
      variant="contained"
      size="large"
      sx={{ backgroundColor: "#00917C" }}
    >
      Creation nouveau acte
    </Button>,
    <Button
      key={2}
      variant="contained"
      size="large"
      sx={{ backgroundColor: "#00917C" }}
    >
      Mise a jour nouveau acte
    </Button>,
  ];

  return (
    <>
      {user && (
        <>
          <Navbar />
          <Container component="main">
            <Box
              sx={{
                display: "flex",
                "& > *": {
                  m: 6,
                },
              }}
            >
              <ButtonGroup
                orientation="vertical"
                aria-label="vertical outlined button group"
              >
                {buttons}
              </ButtonGroup>

              <ButtonGroup
                orientation="vertical"
                aria-label="vertical outlined button group"
              >
                {buttons}
              </ButtonGroup>

              <ButtonGroup
                orientation="vertical"
                aria-label="vertical outlined button group"
              >
                {buttons}
              </ButtonGroup>
            </Box>
          </Container>
        </>
      )}
    </>
  );
};

export default Main;
