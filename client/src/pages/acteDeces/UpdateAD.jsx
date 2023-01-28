import { Container } from "@mui/system";
import { Box, Button, TextField, Grid } from "@mui/material";
import React from "react";
import { useState } from "react";
import http from "../../services/httpService";

function UpdateAD({ user }) {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `${token}`,
    },
  };

  let acteObjet = {
    num_declarant: "",
    date_declaration: "",
    num_acte_naissance: "",
    num_personne: "",
    date_deces: "",
    heure_deces: "",
    lieu_deces: "",
    num_bureau: "",
    matricule: "",
  };

  let bureauObjet = {
    num_bureau: "",
    nom_commune: "",
    daira: "",
    wilaya: "",
    matricule_maire: "",
  };

  const [nin, setNin] = useState(null);
  const [acte, setActe] = useState(acteObjet);
  const [communeActuelle, setCommuneActuelle] = useState(bureauObjet);

  const searchActeDeces = async (nin) => {
    try {
      const result = await http.get(`api/actesDeces/${nin}`, config);
      setActe(result.data);
      getBureau(user.num_bureau);
      console.log(result.data);
    } catch (e) {
      console.log(e);
    }
  };

  const getBureau = async (numbureau) => {
    try {
      const comm = await http.get(`api/bureauxNationaux/${numbureau}`, config);
      setCommuneActuelle(comm.data);
      console.log(comm.data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      {user && (
        <>
          <Container
            component="form"
            className="cadre"
            sx={{ padding: "10px", paddingBottom: "2%", marginBottom: "3%" }}>
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
              <Button
                fullWidth
                type="button"
                variant="contained"
                style={{
                  backgroundColor: "#00917C",
                  top: "15px",
                  marginBottom: "2rem",
                }}
                onClick={() => {
                  searchActeDeces(nin);
                }}>
                Search
              </Button>
              <hr />
              <Grid>
                <TextField
                  margin="normal"
                  disabled
                  fullWidth
                  id="nin_declarant"
                  label="NIN Declarant"
                  value={acte.num_declarant}
                />
                <TextField
                  margin="normal"
                  disabled
                  fullWidth
                  id="date_declaration"
                  label="Date Declaration"
                  value={acte.date_declaration}
                />
                <TextField
                  margin="normal"
                  disabled
                  fullWidth
                  id="nin_personne"
                  label="NIN Defunt"
                  value={acte.num_personne}
                />
                <TextField
                  margin="normal"
                  fullWidth
                  id="date_deces"
                  label="Date Deces"
                  value={acte.date_deces}
                />
                <TextField
                  margin="normal"
                  fullWidth
                  id="heure_deces"
                  label="Heure Deces"
                  value={acte.heure_deces}
                />
                <TextField
                  margin="normal"
                  fullWidth
                  id="lieu_deces"
                  label="Lieu Deces"
                  value={acte.lieu_deces}
                />
                <TextField
                  margin="normal"
                  disabled
                  fullWidth
                  id="matricule"
                  label="Matricule"
                  value={acte.matricule}
                />
                <TextField
                  margin="normal"
                  disabled
                  fullWidth
                  id="num_bureau"
                  label="Num Bureau"
                  value={acte.num_bureau}
                />
                <Button
                  fullWidth
                  type="button"
                  variant="contained"
                  style={{
                    backgroundColor: "#00917C",
                    top: "15px",
                    marginBottom: "1rem",
                  }}
                  onClick={() => {
                    searchActeDeces(nin);
                  }}>
                  Update
                </Button>
              </Grid>
            </Box>
          </Container>
        </>
      )}
    </>
  );
}

export default UpdateAD;
