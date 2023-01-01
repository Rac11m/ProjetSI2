import React from 'react';
import {Button, Grid, Avatar, CssBaseline, TextField, FormControlLabel, Checkbox, Link, Box, Typography, Container} from '@mui/material';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import AccountCircleIcon  from '@mui/icons-material/AccountCircle';
import './login.css';

const theme = createTheme();

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://www.interieur.gov.dz/index.php/fr/">
      MICLAT
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


function Login() {
  return (
    <ThemeProvider theme={theme}>
    <Container component="main" maxWidth="xs" >
      <CssBaseline />
      <Box
       sx={{
         marginTop: 8,
         display: 'flex',
        flexDirection: 'column',       
        alignItems: 'center',
      }} 
      >
        <Avatar  sx={{ m: 1, bgcolor: 'AppWorkspace'}}>
          <AccountCircleIcon fontSize='large' style={{color: '#00917C'}} />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1,}}>
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
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="success" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            style={{backgroundColor: '#00917C'}}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2" underline='none'>
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2" underline='none'>
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
 </ThemeProvider>
  );
}

export default Login