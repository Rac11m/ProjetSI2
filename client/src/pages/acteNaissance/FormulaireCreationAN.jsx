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

const FormulaireCreation = () => {
  const [dateValue, setDateValue] = useState(null);
  const [timeValue, setTimeValue] = useState(null);
  const [sexeValue, setSexeValue] = useState(null);
  const [affiliationValue, setAffiliationValue] = useState(null);

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
          autoComplete="off"
        >
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
              style={{ backgroundColor: "#00917C", top: "15px" }}
            >
              Search
            </Button>
            {/* </Box> */}
            <Grid container>
              <TextField
                margin="normal"
                fullWidth
                readOnly
                id="nom_declarant"
                label="Nom"
              />
              <TextField
                margin="normal"
                fullWidth
                readOnly
                id="prenom_declarant"
                label="Prenom"
              />
              <TextField
                margin="normal"
                fullWidth
                readOnly
                id="sexe_declarant"
                label="Sexe"
              />
              <TextField
                margin="normal"
                fullWidth
                readOnly
                id="etatM_declarant"
                label="état matrimonial "
              />
              <TextField
                margin="normal"
                fullWidth
                readOnly
                id="profession_declarant"
                label="Profession"
              />
              <TextField
                margin="normal"
                fullWidth
                readOnly
                id="dateN_declarant"
                label="Date Naissance"
              />
              <TextField
                margin="normal"
                fullWidth
                readOnly
                id="lieuN_declarant"
                label="Lieu Naissance"
              />
              <TextField
                margin="normal"
                fullWidth
                readOnly
                id="communeN_declarant"
                label="Commune Naissance"
              />
              <TextField
                margin="normal"
                fullWidth
                readOnly
                id="wilayaN_declarant"
                label="Wilaya Naissance"
              />
              <TextField
                margin="normal"
                fullWidth
                readOnly
                id="CommuneR_declarant"
                label="Commune Résidence"
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
                  }}
                >
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
              />
              <FormControl sx={{ m: 1, width: 200 }}>
                <InputLabel id="sexe_label">Sexe</InputLabel>
                <Select
                  required
                  labelId="sexe_label"
                  id="sexe_newborn"
                  value={sexeValue}
                  label="Sexe"
                  onChange={(event) => {
                    setSexeValue(event.target.value);
                  }}
                >
                  <MenuItem value={"M"}>Male</MenuItem>
                  <MenuItem value={"F"}>Femelle</MenuItem>
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
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="outlined-disabled"
                label="Commune Naissance"
                name="Commune Naissance"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="outlined-disabled"
                label="Wilaya Naissance"
                name="Wilaya Naissance"
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
                }}
              >
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
