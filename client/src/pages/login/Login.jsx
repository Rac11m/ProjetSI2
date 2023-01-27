import React, { useState } from "react";
import {
  Button,
  Grid,
  Avatar,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Box,
  Typography,
  Container,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import http from "../../services/httpService";
import "./login.css";

const Login = () => {
  const [user, setUser] = useState(null);
  const theme = createTheme();

  const Copyright = (props) => {
    return (
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        {...props}
      >
        {"Copyright © "}
        <Link color="inherit" href="https://www.interieur.gov.dz/index.php/fr/">
          MICLAT
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    );
  };

  const loginUser = async () => {
    const { data: jwt } = await http.post("api/auth", user);
    localStorage.setItem("token", jwt);
    if (user) window.location = "/";
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "AppWorkspace" }}>
            <AccountCircleIcon fontSize="large" style={{ color: "#00917C" }} />
          </Avatar>
          <Typography component="h1" variant="h5">
            S'identifier
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="matricule"
              label="Matricule"
              name="matricule"
              autoComplete="matricule"
              autoFocus
              onChange={(e) =>
                setUser((prev) => {
                  return { ...prev, matricule: e.target.value };
                })
              }
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) =>
                setUser((prev) => {
                  return { ...prev, password: e.target.value };
                })
              }
            />
            <FormControl fullWidth margin="normal">
              <InputLabel id="demo-simple-select-label">Role</InputLabel>
              <Select
                required
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={user?.role || ""}
                label="Role"
                onChange={(e) =>
                  setUser((prev) => {
                    return { ...prev, role: e.target.value };
                  })
                }
              >
                <MenuItem value={"admin"}>Admin</MenuItem>
                <MenuItem value={"maire"}>Maire</MenuItem>
                <MenuItem value={"officier"}>Officier</MenuItem>
                <MenuItem value={"consulaire"}>Consulaire</MenuItem>
              </Select>
            </FormControl>
            <FormControlLabel
              control={<Checkbox value="remember" color="success" />}
              label="Se souvenir de moi"
            />
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              style={{ backgroundColor: "#00917C" }}
              onClick={() => loginUser()}
            >
              Se connecter
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2" underline="none">
                  Mot de passe oublier?
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
};

export default Login;
