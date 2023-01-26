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
import moment from "moment";
import http from "../../services/httpService";

function CreateUser() {
  const [roleValue, setRoleValue] = useState(null);
  const [dateValue, setDateValue] = useState(null);

  const userObjet = {
    matricule: "",
    email: "",
    password: "",
    nom: "",
    prenom: "",
    date_prise_service: "",
    num_bureau: " ",
    pays_de_rattachement: " ",
    role: roleValue,
  };

  const bureauService = (roleValue) => {
    if (roleValue === "consulaire") {
      return (
        <TextField
          required
          fullWidth
          id="pays-ratachement"
          label="Pays ratachement"
          name="pays-ratachement"
          onChange={(e) => {
            userObjet.pays_de_rattachement = e.target.value;
            setUser((pervUser) => {
              return {
                ...pervUser,
                pays_de_rattachement: userObjet.pays_de_rattachement,
              };
            });
            console.log(userObjet.pays_de_rattachement);
          }}
        />
      );
    } else {
      return (
        <TextField
          required
          fullWidth
          id="bureau"
          label="Bureau"
          name="bureau"
          onChange={(e) => {
            userObjet.num_bureau = e.target.value;
            setUser((pervUser) => {
              return {
                ...pervUser,
                num_bureau: userObjet.num_bureau,
              };
            });
            console.log(userObjet.num_bureau);
          }}
        />
      );
    }
  };

  const [user, setUser] = useState(userObjet);

  const sendNewUser = async (user) => {
    return await http.post("/api/users", user);
  };

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
              onChange={(e) => {
                userObjet.matricule = e.target.value;
                setUser((pervUser) => {
                  return {
                    ...pervUser,
                    matricule: userObjet.matricule,
                  };
                });
                console.log(userObjet.matricule);
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              onChange={(e) => {
                userObjet.password = e.target.value;
                setUser((pervUser) => {
                  return {
                    ...pervUser,
                    password: userObjet.password,
                  };
                });
                console.log(userObjet.password);
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="nom"
              label="Nom"
              onChange={(e) => {
                userObjet.nom = e.target.value;
                setUser((pervUser) => {
                  return {
                    ...pervUser,
                    nom: userObjet.nom,
                  };
                });
                console.log(userObjet.nom);
              }}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Date Prise Service"
                value={dateValue}
                onChange={(date) => {
                  setDateValue(date);
                  userObjet.date_prise_service = moment(date.$d).format(
                    "YYYY-MM-DD"
                  );
                  setUser((pervUser) => {
                    return {
                      ...pervUser,
                      date_prise_service: userObjet.date_prise_service,
                    };
                  });
                  console.log(userObjet.date_prise_service);
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
              onChange={(e) => {
                userObjet.email = e.target.value;
                setUser((pervUser) => {
                  return {
                    ...pervUser,
                    email: userObjet.email,
                  };
                });
                console.log(userObjet.email);
              }}
            />
            <FormControl margin="normal" sx={{ m: 1, width: "100%" }}>
              <InputLabel id="demo-simple-select-label">Role</InputLabel>
              <Select
                required
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={roleValue == null ? "" : roleValue}
                label="Role"
                onChange={(event) => {
                  setRoleValue(event.target.value);
                  userObjet.role = event.target.value;
                  setUser((pervUser) => {
                    return {
                      ...pervUser,
                      role: userObjet.role,
                    };
                  });
                }}>
                <MenuItem value={"maire"}>Maire</MenuItem>
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
              onChange={(e) => {
                userObjet.prenom = e.target.value;
                setUser((pervUser) => {
                  return {
                    ...pervUser,
                    prenom: userObjet.prenom,
                  };
                });
                console.log(userObjet.prenom);
              }}
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
          style={{ backgroundColor: "#00917C", marginTop: 10 }}
          onClick={(e) => sendNewUser(user)}>
          Create
        </Button>
      </Box>
    </Container>
  );
}

export default CreateUser;
