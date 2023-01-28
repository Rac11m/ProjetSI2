import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, ButtonGroup, Box } from "@mui/material";
import Navbar from "../../Navbar";
import bannergov from "../../media/banner-site-web-gov.png";

const Main = ({ user }) => {
  const navigateHook = useNavigate();

  return (
    <>
      {user && (
        <>
          <Navbar user={user} />
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
                sx={{ width: "304px" }}
                orientation="vertical"
                aria-label="vertical outlined button group"
              >
                <Button
                  variant="contained"
                  size="large"
                  sx={{ backgroundColor: "#00917C" }}
                  onClick={() => navigateHook("/consulterAN")}
                >
                  Consulter Les Actes de Naissances
                </Button>
                <Button
                  variant="contained"
                  size="large"
                  sx={{ backgroundColor: "#00917C", height: "68.5px" }}
                  onClick={() => navigateHook("/creationactenaissance")}
                >
                  Creation nouveau acte de naissance
                </Button>
                <Button
                  key={2}
                  variant="contained"
                  size="large"
                  sx={{ backgroundColor: "#00917C", height: "68.5px" }}
                >
                  Mise a jour acte de naissance
                </Button>
              </ButtonGroup>

              <ButtonGroup
                sx={{ width: "304px" }}
                orientation="vertical"
                aria-label=""
              >
                <Button
                  variant="contained"
                  size="large"
                  sx={{ backgroundColor: "#00917C", height: "68.5px" }}
                  onClick={() => navigateHook("/consulterAM")}
                >
                  Consulter Les Actes de mariages
                </Button>
                <Button
                  variant="contained"
                  size="large"
                  sx={{ backgroundColor: "#00917C", height: "68.5px" }}
                  onClick={() => navigateHook("/creationactemariage")}
                >
                  Creation Nouveau acte de mariage
                </Button>
                <Button
                  variant="contained"
                  size="large"
                  sx={{ backgroundColor: "#00917C", height: "68.5px" }}
                >
                  Mise a jour acte de mariage
                </Button>{" "}
              </ButtonGroup>

              <ButtonGroup
                sx={{ width: "304px" }}
                orientation="vertical"
                aria-label="vertical outlined button group"
              >
                <Button
                  variant="contained"
                  size="large"
                  sx={{ backgroundColor: "#00917C", height: "68.5px" }}
                  onClick={() => navigateHook("/consulterAD")}
                >
                  Consulter Les Actes de dÉcÈs
                </Button>
                <Button
                  variant="contained"
                  size="large"
                  sx={{ backgroundColor: "#00917C", height: "68.5px" }}
                  onClick={() => navigateHook("/creationactedeces")}
                >
                  Creation nouveau acte de dÉcÈs
                </Button>
                <Button
                  variant="contained"
                  size="large"
                  sx={{ backgroundColor: "#00917C", height: "68.5px" }}
                >
                  Mise a jour acte de dÉcÈs
                </Button>{" "}
              </ButtonGroup>
              <ButtonGroup
                orientation="vertical"
                aria-label="vertical outlined button group"
              >
                <Button
                  variant="contained"
                  size="large"
                  sx={{ backgroundColor: "#00917C" }}
                  onClick={() => navigateHook("/registreNaissance")}
                >
                  Voir registre des Actes de Naissance
                </Button>
                <Button
                  key={1}
                  variant="contained"
                  size="large"
                  sx={{ backgroundColor: "#00917C" }}
                  onClick={() => navigateHook("/registreMariage")}
                >
                  Voir registre des Actes de Mariage
                </Button>
                <Button
                  key={2}
                  variant="contained"
                  size="large"
                  sx={{ backgroundColor: "#00917C" }}
                  onClick={() => navigateHook("/registreDeces")}
                >
                  Voir registre des Actes de Deces
                </Button>{" "}
              </ButtonGroup>
            </Box>
            <img width={"100%"} src={bannergov} alt="banner-gov" />
          </Container>
        </>
      )}
    </>
  );
};

export default Main;
