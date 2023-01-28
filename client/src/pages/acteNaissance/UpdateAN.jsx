import React from "react";
import { Container } from "@mui/system";
import { Box, Button, TextField, Grid, Alert } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider/LocalizationProvider";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import http from "../../services/httpService";
import moment from "moment";
import Navbar from "../../Navbar";

function UpdateAN({ user }) {
  const navigateHook = useNavigate();
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `${token}`,
    },
  };

  let acteObjet = {
    num_personne: "",
    num_bureau: "",
    matricule: "",
  };

  let personneObjet = {
    num_identifiant_national: "",
    nom: "",
    prenom: "",
    sexe: "",
    date_naissance: "",
    heure_naissance: "",
    lieu_naissance: "",
    commune_naissance: "",
    wilaya_naissance: "",
    pays_naissance: "",
    etat_matrimonial: "",
    commune_residence: "",
    num_pere: "",
    num_mere: "",
    profession: "",
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
  const [etatActe, setEtatActe] = useState(null);
  const [personne, setPersonne] = useState(personneObjet);
  const [dateValue, setDateValue] = useState(null);
  const [communeActuelle, setCommuneActuelle] = useState(bureauObjet);
  const [error, setError] = useState(null);

  const searchActeNaissance = async (nin) => {
    try {
      const result = await http.get(`api/actesNaissance/${nin}`, config);
      setActe(result.data);
      getPersonne(nin);
      getBureau(user.num_bureau);
      setEtatActe(true);
      setError(null);
    } catch (e) {
      setError(e.response.data);
      console.log(e);
    }
  };

  const getPersonne = async (nin) => {
    try {
      const resultp = await http.get(`api/personnes/${nin}`, config);
      setPersonne(resultp.data);
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

  const updateActeN = async (nin) => {
    let acteEnvoi = acte;
    let personneEnvoi = personne;
    // delete acteEnvoi._id;
    // delete acteEnvoi.__v;
    // delete acteEnvoi.num_registre;
    const resp = await http.put(`api/actesNaissance/${nin}`, acteEnvoi, config);
    const respp = await http.put(`api/personnes/${nin}`, personneEnvoi, config);
    if (resp.status === 200 && respp.status === 200) {
      navigateHook("/consulterAN");
    }
  };

  return (
    <>
      {user && (
        <>
          <Navbar user={user} />
          <Container
            component="form"
            className="cadre"
            sx={{ padding: "10px", paddingBottom: "2%", marginBottom: "3%" }}
          >
            <Box
              sx={{
                "& .MuiTextField-root": { m: 1 },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                margin="normal"
                required
                fullWidth
                type="number"
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
                disabled={!nin}
                onClick={() => {
                  searchActeNaissance(nin);
                }}
              >
                Search
              </Button>
              {error && (
                <Alert variant="outlined" severity="warning">
                  {<p>{error}</p>}
                </Alert>
              )}
              {!error && etatActe && (
                <>
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
                        renderInput={(params) => (
                          <TextField required {...params} />
                        )}
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
                        //setLieumValue(e.target.value);
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
                        updateActeN(nin);
                      }}
                    >
                      Update
                    </Button>
                  </Grid>
                </>
              )}
            </Box>
          </Container>
        </>
      )}
    </>
  );
}

export default UpdateAN;
