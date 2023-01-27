import "@fontsource/roboto/500.css";
import { TextField, Box, Typography, Button, Grid } from "@mui/material";
import { Container } from "@mui/system";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider/LocalizationProvider";
import React, { useState } from "react";
import "../acteNaissance/forms.css";
import Navbar from "../../Navbar";
import moment from "moment";
import http from "../../services/httpService";

function FormulaireCreation() {
  let acteMariage = {
    date_mariage: "",
    lieu_mariage: "",
    num_homme: "",
    num_femme: "",
    num_temoin1: "",
    num_temoin2: "",
    num_bureau: "",
    matricule: "",
  };
  let officierObjet = {
    matricule: "",
    num_bureau: "",
  };

  let personneObjet = {
    commune_naissance: "",
    commune_residence: "",
    date_naissance: "",
    etat_matrimonial: "",
    heure_naissance: "",
    lieu_naissance: "",
    nom: "",
    num_identifiant_national: "",
    num_mere: "",
    num_pere: "",
    pays_naissance: "",
    prenom: "",
    profession: "",
    sexe: "",
    wilaya_naissance: "",
  };

  const [epoux, setEpoux] = useState(personneObjet);
  const [epouse, setEpouse] = useState(personneObjet);
  const [temoin1, setTemoin1] = useState(personneObjet);
  const [temoin2, setTemoin2] = useState(personneObjet);
  const [dateValue, setDateValue] = useState(null);
  const [acte, setActe] = useState(acteMariage);

  const sendActeMariage = async (acte) => {
    return await http.post("api/actesMariage", acte);
  };

  const searchEpoux = async (nin) => {
    try {
      const result = await http.get(`api/personnes/${nin}`);
      setEpoux(result.data);
    } catch (e) {
      console.log(e);
    }
  };

  // const changerEtatMatrimonial = asynce (nin) => {
  //    return await http.put(`/api/personnes/${nin}`,....);
  // }

  const searchEpouse = async (nin) => {
    try {
      const result = await http.get(`api/personnes/${nin}`);
      setEpouse(result.data);
    } catch (e) {
      console.log(e);
    }
  };
  const searchTemoin = async (nin, temoinAChoisir) => {
    try {
      const result = await http.get(`api/personnes/${nin}`);
      if (temoinAChoisir === "temoin1") {
        setTemoin1(result.data);
      } else {
        setTemoin2(result.data);
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <Navbar />
      <Container component="form" className="cadre" sx={{ padding: "10px" }}>
        <Box
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off">
          <div className="partie-mariage">
            <Typography variant="h5" gutterBottom style={{ marginTop: "5px" }}>
              Partie Mariage
            </Typography>
            <Grid container>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Date Mariage"
                  value={dateValue}
                  onChange={(date) => {
                    setDateValue(date);
                    acteMariage.date_mariage = moment(date.$d).format(
                      "YYYY-MM-DD"
                    );
                    setActe((prevElement) => {
                      return {
                        ...prevElement,
                        date_mariage: acteMariage.date_mariage,
                      };
                    });
                    console.log(acteMariage.date_mariage);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
              <TextField
                margin="normal"
                required
                fullWidth
                id="outlined-disabled"
                label="Lieu Mariage"
                name="Lieu Mariage"
                autoFocus
                onChange={(e) => {
                  acteMariage.lieu_mariage = e.target.value;
                  setActe((prevElement) => {
                    return {
                      ...prevElement,
                      lieu_mariage: acteMariage.lieu_mariage,
                    };
                  });
                  console.log(acteMariage.lieu_mariage);
                }}
              />
            </Grid>
            <hr />
          </div>

          <div className="partie-mariees">
            <Typography variant="h5" gutterBottom style={{ marginTop: "5px" }}>
              Partie Mariées
            </Typography>
            <Grid container id={"Partie_epoux"}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="nin_epoux"
                label="NIN époux"
                name="nin"
                autoComplete="nin"
                autoFocus
                onChange={(e) => {
                  acteMariage.num_homme = e.target.value;
                  setActe((prevElement) => {
                    return {
                      ...prevElement,
                      num_homme: acteMariage.num_homme,
                    };
                  });
                  console.log(acteMariage.num_homme);
                }}
              />
              <Button
                type="button"
                variant="contained"
                style={{ backgroundColor: "#00917C", top: "1px" }}
                onClick={() => searchEpoux(acte.num_homme)}>
                Search
              </Button>
              <Grid>
                <TextField
                  margin="normal"
                  readOnly
                  fullWidth
                  id="nom_epoux"
                  label="Nom époux"
                  name="Nom_époux"
                  autoFocus
                  value={epoux.nom}
                />
                <TextField
                  margin="normal"
                  readOnly
                  required
                  fullWidth
                  id="prenom_epoux"
                  label="Prenom époux"
                  name="Prenom_époux"
                  autoFocus
                  value={epoux.prenom}
                />
                <TextField
                  margin="normal"
                  required
                  readOnly
                  fullWidth
                  id="profession_epoux"
                  label="Profession"
                  value={epoux.profession}
                />
                <TextField
                  margin="normal"
                  required
                  readOnly
                  fullWidth
                  id="date_naiss_epoux"
                  label="Date Naissance"
                  value={moment(epoux.date_naissance).format("DD-MM-YYYY")}
                />
                <TextField
                  margin="normal"
                  readOnly
                  fullWidth
                  id="commune_naiss_epoux"
                  label="Commune Naissance"
                  value={epoux.commune_naissance}
                />
                <TextField
                  margin="normal"
                  readOnly
                  fullWidth
                  id="wilaya_naiss_epoux"
                  label="Wilaya Naissance"
                  value={epoux.wilaya_naissance}
                />
                <TextField
                  margin="normal"
                  readOnly
                  fullWidth
                  id="info_pere_epoux"
                  label="Nom Prenom Pere"
                  value={epoux.num_pere}
                />
                <TextField
                  margin="normal"
                  readOnly
                  fullWidth
                  id="info_mere_epoux"
                  label="Nom Prenom Mere"
                  value={epoux.num_mere}
                />
              </Grid>
            </Grid>
            <Grid container id={"Partie Epouse"}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="nin_epouse"
                label="NIN épouse"
                name="nin"
                autoComplete="nin"
                autoFocus
                onChange={(e) => {
                  acteMariage.num_femme = e.target.value;
                  setActe((prevElement) => {
                    return {
                      ...prevElement,
                      num_femme: acteMariage.num_femme,
                    };
                  });
                  console.log(acteMariage.num_femme);
                }}
              />
              <Button
                type="button"
                variant="contained"
                style={{ backgroundColor: "#00917C", top: "1px" }}
                onClick={() => searchEpouse(acte.num_femme)}>
                Search
              </Button>
              <Grid>
                <TextField
                  margin="normal"
                  readOnly
                  fullWidth
                  id="nom_epouse"
                  label="Nom épouse"
                  value={epouse.nom}
                />
                <TextField
                  margin="normal"
                  readOnly
                  fullWidth
                  id="prenom_epouse"
                  label="Prenom épouse"
                  value={epouse.prenom}
                />
                <TextField
                  margin="normal"
                  readOnly
                  fullWidth
                  id="profession_epouse"
                  label="Profession"
                  value={epouse.profession}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="date_naiss_epouse"
                  label="Date Naissance"
                  value={moment(epouse.date_naissance).format("DD-MM-YYYY")}
                />
                <TextField
                  margin="normal"
                  readOnly
                  fullWidth
                  id="comm_naiss_epouse"
                  label="Commune Naissance"
                  value={epouse.commune_naissance}
                />
                <TextField
                  margin="normal"
                  readOnly
                  fullWidth
                  id="wil_naiss_epouse"
                  label="Wilaya Naissance"
                  value={epouse.wilaya_naissance}
                />
                <TextField
                  margin="normal"
                  readOnly
                  fullWidth
                  id="pere_epouse"
                  label="Nom Prenom Pere"
                  value={epouse.num_pere}
                />
                <TextField
                  margin="normal"
                  readOnly
                  fullWidth
                  id="mere_epouse"
                  label="Nom Prenom Mere"
                  value={epouse.num_mere}
                />
              </Grid>
            </Grid>
            <hr />
          </div>

          <div className="partie-temoins">
            <Typography variant="h5" gutterBottom style={{ marginTop: "5px" }}>
              Partie Témoins
            </Typography>
            <Grid container id={"temoin1"}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="nin_temoin1"
                label="NIN"
                name="matricule"
                autoComplete="matricule"
                autoFocus
                onChange={(e) => {
                  acteMariage.num_temoin1 = e.target.value;
                  setActe((prevElement) => {
                    return {
                      ...prevElement,
                      num_temoin1: acteMariage.num_temoin1,
                    };
                  });
                  console.log(acteMariage.num_temoin1);
                }}
              />
              <Button
                type="button"
                variant="contained"
                style={{
                  backgroundColor: "#00917C",
                  top: "10px",
                  height: "50px",
                }}
                onClick={() => searchTemoin(acte.num_temoin1, "temoin1")}>
                Search
              </Button>
              <TextField
                margin="normal"
                readOnly
                fullWidth
                id="nom_temoin1"
                label="Nom"
                value={temoin1.nom}
              />
              <TextField
                margin="normal"
                readOnly
                fullWidth
                id="prenom_temoin2"
                label="Prenom"
                value={temoin1.prenom}
              />
            </Grid>
            <Grid container id={"temoin2"}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="nin_temoin2"
                label="NIN"
                name="matricule"
                autoComplete="matricule"
                autoFocus
                onChange={(e) => {
                  acteMariage.num_temoin2 = e.target.value;
                  setActe((prevElement) => {
                    return {
                      ...prevElement,
                      num_temoin2: acteMariage.num_temoin2,
                    };
                  });
                  console.log(acteMariage.num_temoin2);
                }}
              />
              <Button
                type="button"
                variant="contained"
                style={{
                  backgroundColor: "#00917C",
                  top: "10px",
                  height: "50px",
                }}
                onClick={() => searchTemoin(acte.num_temoin2, "temoin2")}>
                Search
              </Button>
              <TextField
                margin="normal"
                readOnly
                fullWidth
                id="nom_temoin2"
                label="Nom"
                value={temoin2.nom}
              />
              <TextField
                margin="normal"
                readOnly
                fullWidth
                id="prenom_temoin2"
                label="Prenom"
                value={temoin2.prenom}
              />
            </Grid>
            <hr />
          </div>

          <div className="partie-Administration">
            <Typography variant="h5" gutterBottom style={{ marginTop: "5px" }}>
              Partie Administration
            </Typography>
            <TextField
              margin="normal"
              required
              fullWidth
              id="matricule"
              label="Matricule"
              name="matricule"
              autoFocus
              onChange={(e) => {
                acteMariage.matricule = e.target.value;
                setActe((prevElement) => {
                  return {
                    ...prevElement,
                    matricule: acteMariage.matricule,
                  };
                });
                console.log(acteMariage.matricule);
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="numBureau"
              label="Num Bureau"
              name="numbureau"
              autoFocus
              onChange={(e) => {
                acteMariage.num_bureau = e.target.value;
                setActe((prevElement) => {
                  return {
                    ...prevElement,
                    num_bureau: acteMariage.num_bureau,
                  };
                });
                console.log(acteMariage.num_bureau);
              }}
            />
            <Box marginBottom={10}>
              <Button
                type="button"
                variant="contained"
                style={{
                  backgroundColor: "#00917C",
                  float: "right",
                  right: "10px",
                }}
                onClick={() => sendActeMariage(acte)}>
                Create
              </Button>
            </Box>
          </div>
        </Box>
      </Container>
    </>
  );
}

export default FormulaireCreation;
