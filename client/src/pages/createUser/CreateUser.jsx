import {
  Container,
  Box,
  Typography,
  TextField,
  Grid,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React, { useState } from "react";

function bureauService(roleValue) {
  if (roleValue === "consulaire") {
    return (
      <TextField
        required
        fullWidth
        id="pays-ratachement"
        label="Pays ratachement"
        name="pays-ratachement"
      />
    );
  } else {
    return (
      <TextField required fullWidth id="bureau" label="Bureau" name="bureau" />
    );
  }
}

function CreateUser() {
  const [roleValue, setRoleValue] = useState(null);
  const [dateValue, setDateValue] = useState(null);

  return (
    <Container
      component="form"
      className="cadre"
      sx={{ marginTop: "13%", padding: "2%" }}>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1 },
        }}
        noValidate
        autoComplete="off">
        <Typography
          variant="h5"
          gutterBottom
          style={{ marginTop: "5px", textAlign: "center" }}>
          Creation d'un nouveau profile
        </Typography>
        <Grid container spacing={2} columns={16} className="partie-auth">
          <Grid item xs={8}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="matricule"
              label="Matricule"
              name="matricule"
              autoComplete="matricule"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="nom"
              label="Nom"
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Date Prise Service"
                value={dateValue}
                onChange={(date) => {
                  setDateValue(date);
                }}
                renderInput={(params) => <TextField fullWidth {...params} />}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={8}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="email"
              type="email"
              placeholder="exemple@email.com"
            />
            <FormControl margin="normal" sx={{ m: 1, width: "100%" }}>
              <InputLabel id="demo-simple-select-label">Role</InputLabel>
              <Select
                required
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={roleValue}
                label="Role"
                onChange={(event) => {
                  setRoleValue(event.target.value);
                }}>
                <MenuItem value={"officier"}>Officier</MenuItem>
                <MenuItem value={"consulaire"}>Consulaire</MenuItem>
              </Select>
            </FormControl>

            <TextField
              margin="normal"
              required
              fullWidth
              id="prenom"
              label="Prenom"
            />
            {roleValue ? (
              bureauService(roleValue)
            ) : (
              <TextField
                fullWidth
                disabled
                id="service"
                label="Veuillez choisir le role"
              />
            )}
          </Grid>
        </Grid>

        <Button
          fullWidth
          type="button"
          variant="contained"
          style={{ backgroundColor: "#00917C", marginTop: 10 }}>
          Create
        </Button>
      </Box>
    </Container>
  );
}

export default CreateUser;
