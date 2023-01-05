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
import "../acteNaissance/forms.css";

function FormulaireCreation() {
  const [dateValue, setDateValue] = useState(null);
  const [timeValue, setTimeValue] = useState(null);
  const [sexeValue, setSexeValue] = useState(null);
  const [affiliationValue, setAffiliationValue] = useState(null);

  return (
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
          />
          {/* <Box marginBottom={10}> */}
          <Button
            type="button"
            variant="contained"
            style={{ backgroundColor: "#00917C", top: "15px" }}>
            Search
          </Button>
          {/* </Box> */}
          <Grid container>
            <TextField
              readOnly
              id="nom_declarant"
              label="Nom"
              defaultValue="Nom"
            />
            <TextField
              readOnly
              id="prenom_declarant"
              label="Prenom"
              defaultValue="Prenom"
            />
            <TextField
              readOnly
              id="sexe_declarant"
              label="Sexe"
              defaultValue="Sexe"
            />
            <TextField
              readOnly
              id="etatM_declarant"
              label="état matrimonial "
              defaultValue="état matrimonial"
            />
            <TextField
              readOnly
              id="profession_declarant"
              label="Profession"
              defaultValue="Profession"
            />
            <TextField
              readOnly
              id="dateN_declarant"
              label="Date Naissance"
              defaultValue="12/12/2002"
            />
            <TextField
              readOnly
              id="lieuN_declarant"
              label="Lieu Naissance"
              defaultValue="Hôpital IBN ZIRI"
            />
            <TextField
              readOnly
              id="communeN_declarant"
              label="Commune Naissance"
              defaultValue="EL-HAMMAMET"
            />
            <TextField
              readOnly
              id="wilayaN_declarant"
              label="Wilaya Naissance"
              defaultValue="ALGER"
            />
            <TextField
              readOnly
              id="CommuneR_declarant"
              label="Commune Résidence"
              defaultValue="Dar El Beida"
            />
            <FormControl sx={{ m: 1, width: 260 }}>
              <InputLabel id="affiliation_label">
                Affiliation avec le défunt
              </InputLabel>
              <Select
                required
                labelId="affiliation_label"
                id="affliation_declarant"
                value={affiliationValue}
                label="affiliation avec le défunt"
                onChange={(event) => {
                  setAffiliationValue(event.target.value);
                }}>
                <MenuItem value={"ascendant_direct"}>Ascendant direct</MenuItem>
                <MenuItem value={"descendant_direct"}>
                  Descendant direct
                </MenuItem>
                <MenuItem value={"tuteur"}>Tuteur</MenuItem>
                <MenuItem value={"procureur"}>
                  Procureur de la République
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <hr />
        </div>

        <div className="partie-defunt">
          <Typography variant="h5" gutterBottom style={{ marginTop: "5px" }}>
            Partie Défunt
          </Typography>
          <TextField
            margin="normal"
            required
            fullWidth
            id="nin_dead"
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
              id="nom_dead"
              label="Nom"
              name="Nom"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="prenom_dead"
              label="Prenom"
              name="Prenom"
              autoFocus
            />
            <FormControl sx={{ m: 1, width: 200 }}>
              <InputLabel id="sexe_label">Sexe</InputLabel>
              <Select
                required
                labelId="sexe_label"
                id="sexe_dead"
                value={sexeValue}
                label="Sexe"
                onChange={(event) => {
                  setSexeValue(event.target.value);
                }}>
                <MenuItem value={"M"}>Male</MenuItem>
                <MenuItem value={"F"}>Femelle</MenuItem>
              </Select>
            </FormControl>
            <TextField
              margin="normal"
              required
              fullWidth
              id="raison_dead"
              label="Raison deces "
              defaultValue=""
            />
            <TextField
              margin="normal"
              fullWidth
              id="etatM_dead"
              label="état matrimonial "
              defaultValue=""
            />
            <TextField
              margin="normal"
              fullWidth
              id="profession_dead"
              label="Profession"
              defaultValue=""
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Date Deces"
                value={dateValue}
                onChange={(date) => {
                  setDateValue(date);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <TimePicker
                label="Heure Deces"
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
              label="Lieu Deces"
              name="Lieu Deces"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="outlined-disabled"
              label="Commune Deces"
              name="Commune Deces"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="outlined-disabled"
              label="Wilaya Deces"
              name="Wilaya Deces"
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
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="numBureau"
            label="Num Bureau"
            name="numbureau"
            autoFocus
          />
          <Box marginBottom={10}>
            <Button
              type="button"
              variant="contained"
              style={{
                backgroundColor: "#00917C",
                float: "right",
                right: "10px",
              }}>
              Create
            </Button>
          </Box>
        </div>
      </Box>
    </Container>
  );
}

export default FormulaireCreation;
