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

function FormulaireCreation() {
  const [dateValue, setDateValue] = useState(null);
  const [timeValue, setTimeValue] = useState(null);

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
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TimePicker
                  label="Heure Mariage"
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
                label="Lieu Mariage"
                name="Lieu Mariage"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="outlined-disabled"
                label="Commune Mariage"
                name="Commune Mariage"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="outlined-disabled"
                label="Wilaya Mariage"
                name="Wilaya Mariage"
                autoFocus
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
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="nom_epoux"
                label="Nom époux"
                name="Nom_époux"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="prenom_epoux"
                label="Prenom époux"
                name="Prenom_époux"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="profession_epoux"
                label="Profession"
                defaultValue=""
              />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Date Naiss époux"
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
              <TextField
                margin="normal"
                required
                fullWidth
                id=""
                label="Nom Prenom Pere"
                name="Nom Prenom Pere"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id=""
                label="Nom Prenom Mere"
                name="Nom Prenom Mere"
                autoFocus
              />
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
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="nom_epouse"
                label="Nom épouse"
                name="Nom_épouse"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="prenom_epouse"
                label="Prenom épouse"
                name="Prenom_épouse"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="profession_epouse"
                label="Profession"
                defaultValue=""
              />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Date Naiss épouse"
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
              <TextField
                margin="normal"
                required
                fullWidth
                id=""
                label="Nom Prenom Pere"
                name="Nom Prenom Pere"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id=""
                label="Nom Prenom Mere"
                name="Nom Prenom Mere"
                autoFocus
              />
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
                id="nin_declarant"
                label="NIN"
                name="matricule"
                autoComplete="matricule"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="nom_temoin1"
                label="Nom"
                defaultValue=""
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="prenom_temoin2"
                label="Prenom"
                defaultValue=""
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
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="nom_temoin2"
                label="Nom"
                defaultValue=""
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="prenom_temoin2"
                label="Prenom"
                defaultValue=""
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
    </>
  );
}

export default FormulaireCreation;
