import { Container } from "@mui/system";
import { Box, Button, TextField, Grid } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider/LocalizationProvider";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import http from "../../services/httpService";
import moment from "moment";

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
    raison: "",
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

  const navigateHook = useNavigate();

  const [nin, setNin] = useState(null);
  const [acte, setActe] = useState(acteObjet);
  const [dateValue, setDateValue] = useState(null);
  const [timeValue, setTimeValue] = useState(null);
  const [lieudValue, setLieudValue] = useState(null);
  const [raisonValue, setRaisonValue] = useState(null);
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

  const updateActeD = async (nin) => {
    let acteEnvoi = acte;
    if (lieudValue && lieudValue !== " ") {
      acteEnvoi.lieu_deces = lieudValue;
    }
    if (dateValue) {
      acteEnvoi.date_deces = moment(dateValue.$d).format("YYYY-MM-DD");
    }
    if (timeValue) {
      acteEnvoi.heure_deces = moment(timeValue.$d).format("h:mm");
    }
    if (raisonValue) {
      acteEnvoi.raison = raisonValue;
    }
    delete acteEnvoi._id;
    delete acteEnvoi.__v;
    delete acteEnvoi.num_registre;
    const resp = await http.put(`api/actesDeces/${nin}`, acteEnvoi, config);
    if (resp.status === 200) {
      navigateHook("/consulterAD");
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
                  value={moment(acte.date_declaration).format("DD-MM-YYYY")}
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
                  disabled
                  fullWidth
                  id="date_deces"
                  label="Date Deces"
                  value={moment(acte.date_deces).format("DD-MM-YYYY")}
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Date Deces"
                    value={dateValue}
                    onChange={(date) => {
                      setDateValue(date);
                    }}
                    renderInput={(params) => <TextField required {...params} />}
                  />
                </LocalizationProvider>
                <TextField
                  margin="normal"
                  disabled
                  fullWidth
                  id="heure_deces"
                  label="Heure Deces"
                  value={acte.heure_deces}
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <TimePicker
                    label="Heure Deces"
                    value={timeValue}
                    onChange={(time) => {
                      setTimeValue(time);
                    }}
                    renderInput={(params) => <TextField required {...params} />}
                  />
                </LocalizationProvider>
                <TextField
                  margin="normal"
                  fullWidth
                  disabled
                  id="lieu_deces"
                  label="Lieu Deces"
                  value={acte.lieu_deces}
                />
                <TextField
                  margin="normal"
                  id="lieu_deces"
                  label="Lieu Deces"
                  onChange={(e) => {
                    setLieudValue(e.target.value);
                  }}
                />
                <TextField
                  margin="normal"
                  fullWidth
                  disabled
                  id="raison_deces"
                  label="Raison Deces"
                  value={acte.raison}
                />
                <TextField
                  margin="normal"
                  id="raison_deces"
                  label="Raison Deces"
                  onChange={(e) => {
                    setRaisonValue(e.target.value);
                  }}
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
                    updateActeD(nin);
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
