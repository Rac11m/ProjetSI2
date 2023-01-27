import { Alert, Button, Container } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <>
      <Container component="main">
        <Alert
          variant="filled"
          severity="error"
          style={{ justifyContent: "center" }}
        >
          Erreur - Cette page n'existe pas! <hr /> merci de rediriger vers le
          principal
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            style={{ backgroundColor: "#00917C" }}
            onClick={() => navigate("/")}
          >
            Cliquez ici
          </Button>
        </Alert>
      </Container>
    </>
  );
};

export default NotFound;
