import { Container } from "@mui/system";
import { Box, Button, TextField } from "@mui/material";
import React from "react";
import { useState } from "react";
import http from "../../services/httpService";

function ConsulterAM({ user }) {
  const [nin, setNin] = useState(null);
  const [acte, setActe] = useState(null);
  const [personnes, setPersonnes] = useState({
    homme: null,
    femme: null,
    temoin1: null,
    temoin2: null,
    fonctionnaire: null,
  });

  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `${token}`,
    },
  };

  const searchActeMariage = async (nin) => {
    const result = await http.get(`api/actesMariage/${nin}`, config);
    if (result) {
      getPersonnes(result);
      setActe(result.data);
    }
  };

  const getPersonnes = async (result) => {
    const homme = await http.get(
      `api/personnes/${result.data.num_homme}`,
      config
    );
    const femme = await http.get(
      `api/personnes/${result.data.num_femme}`,
      config
    );
    const temoin1 = await http.get(
      `api/personnes/${result.data.num_temoin1}`,
      config
    );
    const temoin2 = await http.get(
      `api/personnes/${result.data.num_temoin2}`,
      config
    );
    const fonctionnaire = await http.get(
      `api/users/${result.data.matricule}`,
      config
    );
    setPersonnes({ homme, femme, temoin1, temoin2, fonctionnaire });
    console.log(personnes);
  };

  return (
    <>
      {user && (
        <>
          <Container
            className="cadre"
            sx={{ padding: "10px", paddingBottom: "2%" }}>
            <Box
              sx={{
                "& .MuiTextField-root": { m: 1 },
              }}
              noValidate
              autoComplete="off">
              <TextField
                margin="normal"
                required
                fullWidth
                id="nin_declarant"
                label="NIN"
                name="matricule"
                autoComplete="matricule"
                autoFocus
                onChange={(e) => {
                  setNin(e.target.value);
                }}
              />
              {/* <Box marginBottom={10}> */}
              <Button
                fullWidth
                type="button"
                variant="contained"
                style={{ backgroundColor: "#00917C", top: "15px" }}
                onClick={(e) => {
                  searchActeMariage(nin);
                  console.log(acte);
                }}>
                Search
              </Button>
            </Box>
          </Container>
        </>
      )}
    </>
  );
}

export default ConsulterAM;
