import React from 'react'
import {Button, Container, ButtonGroup, Box} from '@mui/material'


function Main() {

  const buttons = [
      <Button variant='contained'>Consulter Les Actes</Button>,
      <Button variant='contained'>Creation nouveau acte</Button>,
      <Button variant='contained'>Mise a jour nouveau acte</Button>
  ]

  return (
    <Container component='main'>
     <Box sx={{display: 'flex',
     '& > *': {
          m: 1,
        },
      }}>
       <ButtonGroup
        orientation="vertical"
        aria-label="vertical outlined button group"
      >
        {buttons}
      </ButtonGroup>

      <ButtonGroup
        orientation="vertical"
        aria-label="vertical outlined button group"
      >
        {buttons}
      </ButtonGroup>
     
      <ButtonGroup
        orientation="vertical"
        aria-label="vertical outlined button group"
        >
        {buttons}
      </ButtonGroup>
     
        </Box>
    </Container>
  )
}

export default Main