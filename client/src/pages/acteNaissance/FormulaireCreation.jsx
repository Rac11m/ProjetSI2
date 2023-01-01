import '@fontsource/roboto/500.css'
import { TextField, Box, Typography, Button, Grid, MenuItem, InputLabel, FormControl, Select } from '@mui/material';
import { Container } from '@mui/system';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider/LocalizationProvider';
import React, { useState } from 'react'
import './forms.css';

function FormulaireCreation() {

  const [dateValue, setDateValue] = useState(null);
  const [timeValue, setTimeValue] = useState(null);
  const [sexeValue, setSexeValue] = useState(null);


  return (
    <Container component="form" className='cadre' sx={{padding: "10px"}}>

    <Box
    component="form"
    sx={{
      '& .MuiTextField-root': { m: 1, width: '25ch' },
    }}
    noValidate
    autoComplete="off"
  >
    <div className='partie-declarant'>
    <Typography variant="h5" gutterBottom style={{marginTop:'5px'}}>
          Partie Declarant
    </Typography>
      <TextField
            margin="normal"
            required
            fullWidth
            id="matricule"
            label="NIN"
            name="matricule"
            autoComplete="matricule"
            autoFocus
      />
           {/* <Box marginBottom={10}> */}
      <Button
            type="button"
            variant="contained"
            style={{backgroundColor: '#00917C', top: '15px'}}
            >
            Search
          </Button>
            {/* </Box> */}
      <Grid container>
      <TextField
        readOnly
        id="outlined-disabled"
        label="Nom"
        defaultValue="Nom"
      />
      <TextField
        readOnly
        id="outlined-disabled"
        label="Prenom"
        defaultValue="Prenom"
      />
      <TextField
        readOnly
        id="outlined-disabled"
        label="Sexe"
        defaultValue="Sexe"
      />
      <TextField
        readOnly
        id="outlined-disabled"
        label="état matrimonial "
        defaultValue="état matrimonial"
      />
      {/* <DatePicker
          label="read-only"
          readOnly
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
        /> */}
        <TextField
        readOnly
        id="outlined-disabled"
        label="Profession"
        defaultValue="Profession"
      />
      <TextField
        readOnly
        id="outlined-disabled"
        label="Date Naissance"
        defaultValue="12/12/2002"
      />
      <TextField
        readOnly
        id="outlined-disabled"
        label="Lieu Naissance"
        defaultValue="Hôpital IBN ZIRI"
      />
      <TextField
        readOnly
        id="outlined-disabled"
        label="Commune Naissance"
        defaultValue="EL-HAMMAMET"
      />
      <TextField
      readOnly
      id="outlined-disabled"
      label="Wilaya Naissance"
      defaultValue="ALGER"
    />
      </Grid>
 
      <hr />
            </div>
      
            <div className='partie-nouveau-ne'>
    <Typography variant="h5" gutterBottom style={{marginTop:'5px'}}>
          Partie Nouveau né
    </Typography>
      <TextField
            margin="normal"
            required
            fullWidth
            id="matricule"
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
        id="outlined-disabled"
        label="Nom"
        name="Nom"
        autoFocus
      />
      <TextField
        margin="normal"
        required
        fullWidth
        id="outlined-disabled"
        label="Prenom"
        name="Prenom"
        autoFocus
      />
 <FormControl sx={{ m: 1, width: 200 }}>
 <InputLabel id="demo-simple-select-label">Sexe</InputLabel>
  <Select
    required
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={sexeValue}
    label="Sexe"
    onChange={(event)=> {
      setSexeValue(event.target.value);
    }
  }
  >
    <MenuItem value={'M'}>Male</MenuItem>
    <MenuItem value={'F'}>Femelle</MenuItem>
  </Select>
    </FormControl>
      <TextField
        readOnly
        id="outlined-disabled"
        label="état matrimonial "
        defaultValue="état matrimonial"
      />
        <TextField
        readOnly
        id="outlined-disabled"
        label="Profession"
        defaultValue="Profession"
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
            <div className='partie-Administration'>
    <Typography variant="h5" gutterBottom style={{marginTop:'5px'}}>
          Partie Administration
    </Typography>
      <TextField
            margin="normal"
            required
            fullWidth
            id="matricule"
            label="NIN"
            name="matricule"
            autoComplete="matricule"
            autoFocus
      />
      <TextField
        disabled
        id="outlined-disabled"
        label="Disabled"
        defaultValue="Hello World"
      />
      <TextField
        id="outlined-password-input"
        label="Password"
        type="password"
        autoComplete="current-password"
      />
      <TextField
        id="outlined-read-only-input"
        label="Read Only"
        defaultValue="Hello World"
        InputProps={{
          readOnly: true,
        }}
      />
      <Box marginBottom={10}>
      <Button
            type="button"
            variant="contained"
            style={{backgroundColor: '#00917C', float: 'right',right: '10px'}}
            >
            Search
          </Button>
            </Box>
            </div>
      

    </Box>
    </Container>
    
    )
}

export default FormulaireCreation