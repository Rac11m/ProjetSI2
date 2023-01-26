import "@fontsource/roboto/500.css";
import {
  TextField,
  Box,
  Typography,
  Button,
  Grid,
  MenuItem,
  InputLabel,
  FormControl,
  Select,
} from "@mui/material";
import { Container } from "@mui/system";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider/LocalizationProvider";
import React, { useState } from "react";
import "./forms.css";
import Navbar from "../../Navbar";
import http from "../../services/httpService";

const FormulaireCreation = () => {
  const [dateValue, setDateValue] = useState(null);
  const [timeValue, setTimeValue] = useState(null);
  const [sexeValue, setSexeValue] = useState("");
  const [affiliationValue, setAffiliationValue] = useState(null);
  const [nindeclarant, setNindeclarant] = useState(null);
  const [nouveauNe, setNouveauNe] = useState(null);
  const DeclarantVide = {
    nom: "Nom",
    prenom: "Prenom",
    sexe: "Sexe",
    etat_matrimonial: "etat matrimonial",
    profession: "profession",
    date_naissance: "date naissance",
    lieu_naissance: "lieu naissance",
    commune_naissance: "commune naissance",
    wilaya_naissance: "wilaya naissance",
    commune_residence: "commune residence",
  };
  const [declarant, setDeclarant] = useState(DeclarantVide);

  const ActeNaissObjet = {
    date_declaration: "",
    num_personne: "",
    num_declarant: "",
    num_acte_mariage: null,
    num_acte_deces: null,
    num_registre: "",
    matricule: "",
  };

  const nouveauNeObjet = {
    num_identifiant_national: "11115555",
    nom: "nsss",
    prenom: "ssss",
    sexe: "sexeValue",
    date_naissance: "2002-12-15",
    heure_naissance: "timeValue",
    lieu_naissance: "alger",
    commune_naissance: "a;lger",
    wilaya_naissance: "algers",
    pays_naissance: "Algerie",
    etat_matrimonial: null,
    profession: null,
  };

  const officierObjet = {
    matricule: "",
    num_bureau: "",
  };

  const sendActeNaissance = async (acte) => {
    acte.date_declaration = Date.now();
    acte.num_personne = Math.random();
    acte.num_declarant = nindeclarant;
    acte.num_registre = 12;
    acte.matricule = officierObjet.matricule;
    return await http.post("api/actesNaissance", acte);
  };
  const sendNouveauNe = async (nouveauNe) => {
    return await http.post("api/personnes", nouveauNe);
  };
  const searchDeclarant = async (nin) => {
    const result = await http.get(`api/personnes/${nin}`);
    setDeclarant(result.data);
    console.log(declarant);
  };
  return (
    <>
      <Navbar />
      <Container component="form" className="cadre" sx={{ padding: "10px" }}>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off">
          <div className="partie-declarant">
            <Typography variant="h5" gutterBottom style={{ marginTop: "5px" }}>
              Partie Declarant
            </Typography>
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
                setNindeclarant(e.target.value);
              }}
            />
            {/* <Box marginBottom={10}> */}
            <Button
              type="button"
              variant="contained"
              style={{ backgroundColor: "#00917C", top: "15px" }}
              onClick={() => searchDeclarant(nindeclarant)}>
              Search
            </Button>
            {/* </Box> */}
            <Grid container>
              <TextField
                margin="normal"
                fullWidth
                readOnly
                id="nom_declarant"
                value={declarant.nom}
              />
              <TextField
                margin="normal"
                fullWidth
                readOnly
                id="prenom_declarant"
                //label="Prenom"
                value={declarant.prenom}
              />
              <TextField
                margin="normal"
                fullWidth
                readOnly
                id="sexe_declarant"
                //label="Sexe"
                value={declarant.sexe}
              />
              <TextField
                margin="normal"
                fullWidth
                readOnly
                id="etatM_declarant"
                //label="état matrimonial"
                value={declarant.etat_matrimonial}
              />
              <TextField
                margin="normal"
                fullWidth
                readOnly
                id="profession_declarant"
                //label="Profession"
                value={declarant.profession}
              />
              <TextField
                margin="normal"
                fullWidth
                readOnly
                id="dateN_declarant"
                //label="Date Naissance"
                value={declarant.date_naissance}
              />
              <TextField
                margin="normal"
                fullWidth
                readOnly
                id="lieuN_declarant"
                // label="Lieu Naissance"
                value={declarant.lieu_naissance}
              />
              <TextField
                margin="normal"
                fullWidth
                readOnly
                id="communeN_declarant"
                //label="Commune Naissance"
                value={declarant.commune_naissance}
              />
              <TextField
                margin="normal"
                fullWidth
                readOnly
                id="wilayaN_declarant"
                // label="Wilaya Naissance"
                value={declarant.wilaya_naissance}
              />
              <TextField
                margin="normal"
                fullWidth
                readOnly
                id="CommuneR_declarant"
                // label="Commune Résidence"
                value={declarant.commune_residence}
              />
              <FormControl sx={{ m: 1, width: 260 }}>
                <InputLabel id="affiliation_label">
                  Affiliation avec le nouveau né
                </InputLabel>
                <Select
                  required
                  labelId="affiliation_label"
                  id="affliation_declarant"
                  value={affiliationValue}
                  label="affiliation avec le nouveau né"
                  onChange={(event) => {
                    setAffiliationValue(event.target.value);
                  }}>
                  <MenuItem value={"P"}>Parent</MenuItem>
                  <MenuItem value={"F"}>Tuteur</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <hr />
          </div>

          <div className="partie-nouveau-ne">
            <Typography variant="h5" gutterBottom style={{ marginTop: "5px" }}>
              Partie Nouveau né
            </Typography>
            <TextField
              margin="normal"
              disabled
              required
              fullWidth
              id="nin_newborn"
              label="NIN"
              name="matricule"
              autoComplete="matricule"
              autoFocus
            />
            <Grid container>
              <TextField
                margin="normal"
                required
                fullWidth
                id="nom_newborn"
                label="Nom"
                name="Nom"
                onChange={(e) => {
                  nouveauNeObjet.nom = e.target.value;
                  setNouveauNe(nouveauNeObjet);
                }}
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="prenom_newborn"
                label="Prenom"
                name="Prenom"
                autoFocus
                onChange={(e) => {
                  nouveauNeObjet.prenom = e.target.value;
                  setNouveauNe(nouveauNeObjet);
                }}
              />
              <FormControl sx={{ m: 1, width: 200 }}>
                <InputLabel id="sexe_label">Sexe</InputLabel>
                <Select
                  required
                  labelId="sexe_label"
                  id="sexe_newborn"
                  value={sexeValue}
                  label="Sexe"
                  onChange={(e) => {
                    setSexeValue(e.target.value);
                    console.log(sexeValue);
                  }}>
                  <MenuItem value={"homme"}>Homme</MenuItem>
                  <MenuItem value={"femme"}>Femme</MenuItem>
                </Select>
              </FormControl>
              <TextField
                disabled
                id="etatM_newborn"
                label="état matrimonial "
                value={null}
                defaultValue="NULL"
              />
              <TextField
                disabled
                id="profession_newborn"
                label="Profession"
                value={null}
                defaultValue="NULL"
              />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Date Naissance"
                  value={dateValue}
                  onChange={(date) => {
                    setDateValue(date);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TimePicker
                  label="Heure Naissance"
                  value={timeValue}
                  onChange={(time) => {
                    setTimeValue(time);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
              <TextField
                margin="normal"
                required
                fullWidth
                id="outlined-disabled"
                label="Lieu Naissance"
                name="Lieu Naissance"
                autoFocus
                onChange={(e) => {
                  nouveauNeObjet.lieu_naissance = e.target.value;
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="outlined-disabled"
                label="Commune Naissance"
                name="Commune Naissance"
                autoFocus
                onChange={(e) => {
                  nouveauNeObjet.commune_naissance = e.target.value;
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="outlined-disabled"
                label="Wilaya Naissance"
                name="Wilaya Naissance"
                autoFocus
                onChange={(e) => {
                  nouveauNeObjet.wilaya_naissance = e.target.value;
                  console.log(nouveauNeObjet);
                }}
              />
              <Grid>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="nin_pere"
                  label="NIN Pere"
                  name="NIN Pere"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="nom_pere"
                  label="Nom Pere"
                  name="Nom Pere"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="prenom_pere"
                  label="Prenom Pere"
                  name="Prenom Pere"
                  autoFocus
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Date Naissance Pere"
                    value={dateValue}
                    onChange={(date) => {
                      setDateValue(date);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="lieu_naisspere"
                  label="lieu naissance Pere"
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="prenom_gperepaternel"
                  label="Prenom Grand-Pere Paternel"
                  name="Prenom Grand-Pere Paternel"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="prenom_gmerepaternel"
                  label="Prenom Grand-Mere Paternel"
                  name="Prenom Grand-Mere Paternel"
                  autoFocus
                />
              </Grid>
              <TextField
                margin="normal"
                required
                fullWidth
                id="nin_mere"
                label="NIN Mere"
                name="NIN Mere"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="nom_mere"
                label="Nom Mere"
                name="Nom Mere"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="prenom_mere"
                label="Prenom Mere"
                name="Prenom Mere"
                autoFocus
              />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Date Naissance Mere"
                  value={dateValue}
                  onChange={(date) => {
                    setDateValue(date);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
              <TextField
                margin="normal"
                required
                fullWidth
                id="lieu_naissmere"
                label="lieu naissance Mere"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="prenom_gperematernel"
                label="Prenom Grand-Pere Maternel"
                name="Prenom Grand-Pere Maternel"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="prenom_gmerematernel"
                label="Prenom Grand-Mere Maternel"
                name="Prenom Grand-Mere Maternel"
                autoFocus
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
                officierObjet.matricule = e.target.value;
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
                officierObjet.num_bureau = e.target.value;
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
                onClick={(e) => {
                  sendNouveauNe(nouveauNeObjet);
                }}>
                Create
              </Button>
            </Box>
          </div>
        </Box>
      </Container>
    </>
  );
};

export default FormulaireCreation;
