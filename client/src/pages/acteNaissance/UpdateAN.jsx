import React from "react";
import { Container } from "@mui/system";
import { Box, Button, TextField, Grid, Alert } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import http from "../../services/httpService";
import moment from "moment";
import Navbar from "../../Navbar";

function UpdateAN({ user }) {
  const navigateHook = useNavigate();
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `${token}`,
    },
  };

  let acteObjet = {
    num_personne: "",
    num_bureau: "",
    matricule: "",
  };

  let personneObjet = {
    num_identifiant_national: "",
    nom: "",
    prenom: "",
    sexe: "",
    date_naissance: "",
    heure_naissance: "",
    lieu_naissance: "",
    commune_naissance: "",
    wilaya_naissance: "",
    pays_naissance: "",
    etat_matrimonial: "",
    commune_residence: "",
    num_pere: "",
    num_mere: "",
    profession: "",
  };

  let bureauObjet = {
    num_bureau: "",
    nom_commune: "",
    daira: "",
    wilaya: "",
    matricule_maire: "",
  };

  const [nin, setNin] = useState(null);
  const [acte, setActe] = useState(acteObjet);
  const [etatActe, setEtatActe] = useState(null);
  const [personne, setPersonne] = useState(personneObjet);
  const [changerNom, setChangerNom] = useState(null);
  const [changerPrenom, setChangerPrenom] = useState(null);
  const [changerCommuneR, setChangerCommuneR] = useState(null);
  const [changerEtatMatrimonial, setChangerEtatMatrimonial] = useState(null);
  const [changerProfession, setChangerProfession] = useState(null);
  const [commune, setCommune] = useState(bureauObjet);
  const [error, setError] = useState(null);

  const searchActeNaissance = async (nin) => {
    try {
      const result = await http.get(`api/actesNaissance/${nin}`, config);
      setActe(result.data);
      getPersonne(nin);
      getBureau(result.data.num_bureau);
      setEtatActe(true);
      setError(null);
    } catch (e) {
      setError(e.response.data);
      console.log(e);
    }
  };

  const getPersonne = async (nin) => {
    try {
      const resultp = await http.get(`api/personnes/${nin}`, config);
      setPersonne(resultp.data);
    } catch (e) {
      console.log(e);
    }
  };

  const getBureau = async (numbureau) => {
    try {
      const comm = await http.get(`api/bureauxNationaux/${numbureau}`, config);
      setCommune(comm.data);
      console.log(comm.data);
    } catch (e) {
      console.log(e);
    }
  };

  const updateActeN = async (nin) => {
    let personneEnvoi = personne;
    if (changerNom && String(changerNom).length > 3) {
      personneEnvoi.nom = changerNom;
    }
    if (changerPrenom && String(changerPrenom).length > 3) {
      personneEnvoi.prenom = changerPrenom;
    }
    if (changerCommuneR && String(changerCommuneR).length > 1) {
      personneEnvoi.commune_residence = changerCommuneR;
    }
    if (changerEtatMatrimonial && String(changerEtatMatrimonial).length > 1) {
      personneEnvoi.etat_matrimonial = changerEtatMatrimonial;
    }
    if (changerProfession && String(changerProfession).length > 1) {
      personneEnvoi.profession = changerProfession;
    }

    delete personneEnvoi._id;
    delete personneEnvoi.__v;
    const respp = await http.put(`api/personnes/${nin}`, personneEnvoi, config);
    if (respp.status === 200) {
      navigateHook("/consulterAN");
    }
  };

  return (
    <>
      {user && (
        <>
          <Navbar user={user} />
          <Container
            component="form"
            className="cadre"
            sx={{ padding: "10px", paddingBottom: "2%", marginBottom: "3%" }}>
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
                type="number"
                id="nin_declarant"
                label="NIN"
                name="matricule"
                autoComplete="matricule"
                autoFocus
                onChange={(e) => {
                  setNin(e.target.value);
                }}
              />
              <Button
                fullWidth
                type="button"
                variant="contained"
                style={{
                  backgroundColor: "#00917C",
                  top: "15px",
                  marginBottom: "2rem",
                }}
                disabled={!nin}
                onClick={() => {
                  searchActeNaissance(nin);
                }}>
                Search
              </Button>
              {error && (
                <Alert variant="outlined" severity="warning">
                  {<p>{error}</p>}
                </Alert>
              )}
              {!error && etatActe && (
                <>
                  <hr />
                  <Grid>
                    <TextField
                      margin="normal"
                      disabled
                      fullWidth
                      id="nomP"
                      label="Nom Prenom"
                      value={`${personne.nom} ${personne.prenom}`}
                    />
                    <TextField
                      margin="normal"
                      fullWidth
                      id="nomP"
                      label="Nouveau Nom"
                      onChange={(e) => {
                        setChangerNom(e.target.value);
                      }}
                    />
                    <TextField
                      margin="normal"
                      fullWidth
                      id="nomP"
                      label="Nouveau Prenom"
                      onChange={(e) => {
                        setChangerPrenom(e.target.value);
                      }}
                    />
                    <TextField
                      margin="normal"
                      disabled
                      fullWidth
                      id="date_naissance"
                      label="Date Naissance"
                      value={moment(personne.date_naissance).format(
                        "DD-MM-YYYY"
                      )}
                    />
                    <TextField
                      margin="normal"
                      disabled
                      fullWidth
                      id="lieu_naissance"
                      label="Lieu Naissance"
                      value={`${personne.lieu_naissance}, ${personne.commune_naissance}, ${personne.wilaya_naissance}`}
                    />
                    <TextField
                      margin="normal"
                      disabled
                      fullWidth
                      id="commune_residence"
                      label="Commune Residence"
                      value={`${personne.commune_residence}`}
                    />
                    <TextField
                      margin="normal"
                      fullWidth
                      id="commune_residence"
                      label="Nouvelle Commune Residence"
                      onChange={(e) => {
                        setChangerCommuneR(e.target.value);
                      }}
                    />
                    <TextField
                      margin="normal"
                      disabled
                      fullWidth
                      id="etat_matrimonial"
                      label="Etat Matrimonial"
                      value={`${personne.etat_matrimonial}`}
                    />
                    <TextField
                      margin="normal"
                      fullWidth
                      id="etat_matrimonial"
                      label="Nouveau Etat Matrimonial"
                      onChange={(e) => {
                        setChangerEtatMatrimonial(e.target.value);
                      }}
                    />
                    <TextField
                      margin="normal"
                      disabled
                      fullWidth
                      id="profession"
                      label="Profession"
                      value={`${personne.profession}`}
                    />
                    <TextField
                      margin="normal"
                      fullWidth
                      id="profession"
                      label="Nouvelle Profession"
                      onChange={(e) => {
                        setChangerProfession(e.target.value);
                      }}
                    />
                    <TextField
                      margin="normal"
                      disabled
                      fullWidth
                      id="matricule"
                      label="Matricule"
                      value={acte.matricule}
                    />
                    <TextField
                      margin="normal"
                      disabled
                      fullWidth
                      id="num_bureau"
                      label="Nom Commune"
                      value={commune.nom_commune}
                    />
                    <Button
                      fullWidth
                      type="button"
                      variant="contained"
                      style={{
                        backgroundColor: "#00917C",
                        top: "15px",
                        marginBottom: "1rem",
                      }}
                      onClick={() => {
                        updateActeN(nin);
                      }}>
                      Update
                    </Button>
                  </Grid>
                </>
              )}
            </Box>
          </Container>
        </>
      )}
    </>
  );
}

export default UpdateAN;
