import { Container } from "@mui/system";
import { Box, Button, TextField } from "@mui/material";
import React from "react";
import { useState } from "react";
import http from "../../services/httpService";

<<<<<<< HEAD
function ConsulterAN({ user }) {
=======
function ConsulterAD() {
>>>>>>> 977aae7f0af35f08d90bf3d947f9d6453397e05f
  const [nin, setNin] = useState(null);
  const [acte, setActe] = useState(null);
  const [personnes, setPersonnes] = useState({
    declarant: null,
    defunt: null,
    fonctionnaire: null,
  });

  const searchActeDeces = async (nin) => {
    const result = await http.get(`api/actesDeces/${nin}`);
    if (result) {
      setActe(result.data);
      getPersonnes(result);
    }
    console.log(acte);
  };

  const getPersonnes = async (result) => {
    const declarant = await http.get(
      `api/personnes/${result.data.num_declarant}`
    );
    const defunt = await http.get(`api/personnes/${result.data.num_personne}`);
    const fonctionnaire = await http.get(`api/users/${result.data.matricule}`);
    // console.log({ declarant, defunt, fonctionnaire });
    setPersonnes({ declarant, defunt, fonctionnaire });
    console.log(personnes);
  };

  return (
<<<<<<< HEAD
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
=======
    <Container className="cadre" sx={{ padding: "10px", paddingBottom: "2%" }}>
      <Box
        sx={{
          "& .MuiTextField-root": { m: 1 },
        }}
        noValidate
        autoComplete="off">
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
          }}>
          Search
        </Button>
      </Box>
    </Container>
>>>>>>> 977aae7f0af35f08d90bf3d947f9d6453397e05f
  );
}

export default ConsulterAD;
