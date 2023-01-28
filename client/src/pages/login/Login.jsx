import React, { useState } from "react";
import {
  Button,
  Avatar,
  CssBaseline,
  TextField,
  Link,
  Box,
  Typography,
  Container,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import http from "../../services/httpService";
import "./login.css";

const Login = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const [matricule, setMatricule] = useState(null);
  const [password, setPassword] = useState(null);
  const [role, setRole] = useState(null);

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
    try {
      const { data: jwt } = await http.post("api/auth", user);
      localStorage.setItem("token", jwt);
      window.location = "/";
    } catch (ex) {
      setError(ex.response.data);
    }
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
              onChange={(e) => {
                setUser((prev) => {
                  return { ...prev, matricule: e.target.value };
                });
                setMatricule((prev) => {
                  return { ...prev, matricule: e.target.value };
                });
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
              autoComplete="current-password"
              onChange={(e) => {
                setUser((prev) => {
                  return { ...prev, password: e.target.value };
                });
                setPassword((prev) => {
                  return { ...prev, password: e.target.value };
                });
              }}
            />
            <FormControl fullWidth margin="normal">
              <InputLabel id="demo-simple-select-label">Role</InputLabel>
              <Select
                required
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={user?.role || ""}
                label="Role"
                onChange={(e) => {
                  setUser((prev) => {
                    return { ...prev, role: e.target.value };
                  });
                  setRole((prev) => {
                    return { ...prev, role: e.target.value };
                  });
                }}
              >
                <MenuItem value={"admin"}>Admin</MenuItem>
                <MenuItem value={"maire"}>Maire</MenuItem>
                <MenuItem value={"officier"}>Officier</MenuItem>
                <MenuItem value={"consulaire"}>Consulaire</MenuItem>
              </Select>
            </FormControl>
            {error && (
              <Alert
                variant="outlined"
                severity="warning"
                style={{ height: "80px" }}
              >
                {<p>matricule ou mot de passe ou role est incorrecte.</p>}
              </Alert>
            )}
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              style={{ backgroundColor: "#00917C" }}
              onClick={() => loginUser()}
              disabled={!(matricule && password && role)}
            >
              Se connecter
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
};

export default Login;
