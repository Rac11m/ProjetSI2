import {Container, Box, Typography, TextField, Grid, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import React, { useState } from 'react'


function bureauService(roleValue){
    if(roleValue === "consulaire"){
      return(  <TextField
        required
        id="pays-ratachement"
        label="Pays ratachement"
        name='pays-ratachement'
        /> );
    }else{
    return(    <TextField
    required
    id="bureau"
    label="Bureau"
    name='bureau'
    /> );
    }
  }

function CreateUser() {

    const [roleValue, setRoleValue] = useState(null);
    const [dateValue, setDateValue] = useState(null);

    return (
        <Container component="form" className='cadre' sx={{padding: "10px"}}>
    
        <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '50ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <div className='partie-auth'>

        <Typography variant="h5" gutterBottom style={{marginTop:'5px'}}>
              Creation d'un nouveau profile
        </Typography>

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
          {/* <Grid container> */}
          <TextField
            margin='normal'
            required
            fullWidth
            id="email"
            label="email"
            type="email"
            placeholder='exemple@email.com'
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
     <FormControl margin='normal' sx={{ m:1, width: '400px' }}>
 <InputLabel id="demo-simple-select-label">Role</InputLabel>
  <Select
    required
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={roleValue}
    label="Role"
    onChange={(event)=> {
      setRoleValue(event.target.value);
    }
  }
  >
    <MenuItem value={'officier'}>Officier</MenuItem>
    <MenuItem value={'consulaire'}>Consulaire</MenuItem>
  </Select>
    </FormControl>
    
    </div>
    <div className='partie-infogen'>
          <Grid>  
          <TextField
            margin='normal'
            required
            fullWidth
            id="nom"
            label="Nom"
            />
          <TextField
            margin='normal'
            required
            fullWidth
            id="prenom"
            label="Prenom"
            />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
             <DatePicker
                label="Date Prise Service"
                value={dateValue}
                onChange={(date) => {
                        setDateValue(date);
                }}
            renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        
            {
            roleValue ? 
                bureauService(roleValue)
            :
            <TextField
            disabled
            id="service"
            label="Veuillez choisir le role"
            />
            }
            </Grid>
          
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

export default CreateUser