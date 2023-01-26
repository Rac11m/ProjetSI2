import { Container } from "@mui/system";
import { Box, Button, TextField } from "@mui/material";
import React from "react";
import { useState } from "react";
import http from "../../services/httpService";
// import { Document, Page, View, Text, PDFViewer } from "@react-pdf/renderer";

function ConsulterAN({ user }) {
  const [nin, setNin] = useState(null);
  const [acte, setActe] = useState(null);
  const [personne, setPersonne] = useState(null);

  const searchActeNaissance = async (nin) => {
    const result = await http.get(`api/actesNaissance/${nin}`);
    setActe(result.data);
    console.log(acte);
    getPersonne();
  };

  const getPersonne = async () => {
    const result = await http.get(`api/personnes/${acte.num_personne}`);
    setPersonne(result.data);
    console.log(personne);
  };

  return (
    <>
      {user && (
        <>
          <Container
            className="cadre"
            sx={{ padding: "10px", paddingBottom: "2%" }}
          >
            <Box
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
                  e.preventDefault();
                  searchActeNaissance(nin);
                }}
              >
                Search
              </Button>
            </Box>
          </Container>
          {/* <Container
            component="form"
            className="cadre"
            sx={{ padding: "10px", marginTop: "100px", paddingBottom: "2%" }}>
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 1 },
              }}
              noValidate
              autoComplete="off">
              <Document>
                <Page size="A4">
                  <View wrap="true">
                    <Text>Acte Naissance</Text>
                    <Text>Le : </Text>
                  </View>
                </Page>
              </Document>
            </Box>
          </Container> */}
        </>
      )}
    </>
  );
}

export default ConsulterAN;
