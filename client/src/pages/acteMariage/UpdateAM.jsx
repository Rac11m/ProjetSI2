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

function UpdateAM({ user }) {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `${token}`,
    },
  };
  let acteObjet = {
    date_mariage: "",
    lieu_mariage: "",
    num_homme: "",
    num_femme: "",
    num_temoin1: "",
    num_temoin2: "",
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
  const [lieumValue, setLieumValue] = useState(null);
  const [communeActuelle, setCommuneActuelle] = useState(bureauObjet);

  const searchActeMariage = async (nin) => {
    try {
      const result = await http.get(`api/actesMariage/${nin}`, config);
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

  const updateActeM = async (nin) => {
    let acteEnvoi = acte;
    if (lieumValue && lieumValue !== " ") {
      acteEnvoi.lieu_mariage = lieumValue;
    }
    if (dateValue) {
      acteEnvoi.date_mariage = moment(dateValue.$d).format("YYYY-MM-DD");
    }
    delete acteEnvoi._id;
    delete acteEnvoi.__v;
    delete acteEnvoi.num_registre;
    const resp = await http.put(`api/actesMariage/${nin}`, acteEnvoi, config);
    if (resp.status === 200) {
      navigateHook("/consulterAM");
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
                  searchActeMariage(nin);
                }}>
                Search
              </Button>
              <hr />
              <Grid>
                <TextField
                  margin="normal"
                  disabled
                  fullWidth
                  id="date_mariage"
                  label="Date Mariage"
                  value={moment(acte.date_mariage).format("DD-MM-YYYY")}
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Date Mariage"
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
                  id="lieu_mariage"
                  label="Lieu Mariage"
                  value={acte.lieu_mariage}
                />
                <TextField
                  margin="normal"
                  id="lieu_mariage"
                  label="Lieu Deces"
                  onChange={(e) => {
                    setLieumValue(e.target.value);
                  }}
                />

                <TextField
                  margin="normal"
                  disabled
                  fullWidth
                  id="nin_homme"
                  label="NIN Homme"
                  value={acte.num_homme}
                />
                <TextField
                  margin="normal"
                  disabled
                  fullWidth
                  id="nin_homme"
                  label="NIN Femme"
                  value={acte.num_femme}
                />
                <TextField
                  margin="normal"
                  disabled
                  fullWidth
                  id="nin_homme"
                  label="NIN Temoin 1"
                  value={acte.num_temoin1}
                />
                <TextField
                  margin="normal"
                  disabled
                  fullWidth
                  id="nin_homme"
                  label="NIN Temoin 2"
                  value={acte.num_temoin2}
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
                    updateActeM(nin);
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

export default UpdateAM;
