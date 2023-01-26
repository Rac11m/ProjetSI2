import { Container } from "@mui/system";
import { Box, Button, TextField } from "@mui/material";
import React from "react";
import { useState } from "react";
import http from "../../services/httpService";

function ConsulterAN({ user }) {
  const [nin, setNin] = useState(null);
  const [acte, setActe] = useState(null);

  const searchActeDeces = async (nin) => {
    const result = await http.get(`api/actesDeces/${nin}`);
    setActe(result.data);
    console.log(acte);
  };

  return (
    <>
      {user && (
        <>
          <Container
            component="form"
            className="cadre"
            sx={{ padding: "10px", paddingBottom: "2%" }}
          >
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 1 },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="nin_declarant"
                label="NIN"
                name="matricule"
                autoComplete="matricule"
                autoFocus
                onChange={(e) => {
                  setNin(e.target.value);
                }}
              />
              {/* <Box marginBottom={10}> */}
              <Button
                fullWidth
                type="button"
                variant="contained"
                style={{ backgroundColor: "#00917C", top: "15px" }}
                onClick={(e) => {
                  searchActeDeces(nin);
                }}
              >
                Search
              </Button>
            </Box>
          </Container>
        </>
      )}
    </>
  );
}

export default ConsulterAN;
