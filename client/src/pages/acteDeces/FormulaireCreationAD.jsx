import "@fontsource/roboto/500.css";
import {
  TextField,
  Box,
  Typography,
  Button,
  Grid,
  MenuItem,
  InputLabel,
  FormControl,
  Select,
} from "@mui/material";
import { Container } from "@mui/system";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider/LocalizationProvider";
import React, { useState } from "react";
import "../acteNaissance/forms.css";
import Navbar from "../../Navbar";
import moment from "moment";
import http from "../../services/httpService";

function FormulaireCreation({ user }) {
  const [dateValue, setDateValue] = useState(null);
  const [timeValue, setTimeValue] = useState(null);
  const [affiliationValue, setAffiliationValue] = useState(null);

  const PersonneObjet = {
    commune_naissance: "",
    commune_residence: "",
    date_naissance: "",
    etat_matrimonial: "",
    heure_naissance: "",
    lieu_naissance: "",
    nom: "",
    num_identifiant_national: "",
    num_mere: "",
    num_pere: "",
    pays_naissance: "",
    prenom: "",
    profession: "",
    sexe: "",
    wilaya_naissance: "",
  };
  const acteDeces = {
    num_declarant: "",
    date_declaration: moment(new Date()).format("YYYY-MM-DD"),
    num_acte_naissance: "",
    num_personne: "",
    date_deces: "",
    heure_deces: "",
    lieu_deces: "",
    num_bureau: "",
    matricule: "",
  };

  const [declarant, setDeclarant] = useState(PersonneObjet);
  const [defunt, setDefunt] = useState(PersonneObjet);

  const [acte, setActe] = useState(acteDeces);

  const sendActeDeces = async (acte) => {
    return await http.post("api/actesDeces", acte);
  };

  const searchDeclarant = async (nin) => {
    try {
      const result = await http.get(`api/personnes/${nin}`);
      setDeclarant(result.data);
    } catch (e) {
      console.log(e);
    }
  };

  const searchDefunt = async (nin) => {
    try {
      const result = await http.get(`api/personnes/${nin}`);
      setDefunt(result.data);
      searchNumActeNaissanceDefunt(nin);
    } catch (e) {
      console.log(e);
    }
  };

  const searchNumActeNaissanceDefunt = async (nin) => {
    try {
      const result = await http.get(`api/actesNaissance/${nin}`);
      setActe((prevElement) => {
        return {
          ...prevElement,
          num_acte_naissance: result.data._id,
        };
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      {user && (
        <>
          <Navbar />
          <Container
            component="form"
            className="cadre"
            sx={{ padding: "10px" }}
          >
            <Box
              sx={{
                "& .MuiTextField-root": { m: 1, width: "25ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <div className="partie-declarant">
                <Typography
                  variant="h5"
                  gutterBottom
                  style={{ marginTop: "5px" }}
                >
                  Partie Declarant
                </Typography>
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
                    setDeclarant((prevElement) => {
                      return {
                        ...prevElement,
                        num_identifiant_national: e.target.value,
                      };
                    });
                    setActe((prevElement) => {
                      return {
                        ...prevElement,
                        num_declarant: e.target.value,
                      };
                    });
                    console.log(declarant.num_identifiant_national);
                  }}
                />
                <Button
                  type="button"
                  variant="contained"
                  style={{ backgroundColor: "#00917C", top: "15px" }}
                  onClick={() =>
                    searchDeclarant(declarant.num_identifiant_national)
                  }
                >
                  Search
                </Button>
                {/* </Box> */}
                <Grid container>
                  <TextField
                    margin="normal"
                    fullWidth
                    readOnly
                    id="nom_declarant"
                    value={declarant.nom}
                  />
                  <TextField
                    margin="normal"
                    fullWidth
                    readOnly
                    id="prenom_declarant"
                    label="Prenom"
                    value={declarant.prenom}
                  />
                  <TextField
                    margin="normal"
                    fullWidth
                    readOnly
                    id="sexe_declarant"
                    label="Sexe"
                    value={declarant.sexe}
                  />
                  <TextField
                    margin="normal"
                    fullWidth
                    readOnly
                    id="etatM_declarant"
                    label="état matrimonial"
                    value={declarant.etat_matrimonial}
                  />
                  <TextField
                    margin="normal"
                    fullWidth
                    readOnly
                    id="profession_declarant"
                    label="Profession"
                    value={declarant.profession}
                  />
                  <TextField
                    margin="normal"
                    fullWidth
                    readOnly
                    id="dateN_declarant"
                    label="Date Naissance"
                    value={moment(declarant.date_naissance).format(
                      "DD-MM-YYYY"
                    )}
                  />
                  <TextField
                    margin="normal"
                    fullWidth
                    readOnly
                    id="lieuN_declarant"
                    label="Lieu Naissance"
                    value={declarant.lieu_naissance}
                  />
                  <TextField
                    margin="normal"
                    fullWidth
                    readOnly
                    id="communeN_declarant"
                    label="Commune Naissance"
                    value={declarant.commune_naissance}
                  />
                  <TextField
                    margin="normal"
                    fullWidth
                    readOnly
                    id="wilayaN_declarant"
                    abel="Wilaya Naissance"
                    value={declarant.wilaya_naissance}
                  />
                  <TextField
                    margin="normal"
                    fullWidth
                    readOnly
                    id="CommuneR_declarant"
                    label="Commune Résidence"
                    value={declarant.commune_residence}
                  />
                  <FormControl sx={{ m: 1, width: 260 }}>
                    <InputLabel id="affiliation_label">
                      Affiliation avec le défunt
                    </InputLabel>
                    <Select
                      required
                      labelId="affiliation_label"
                      id="affliation_declarant"
                      value={affiliationValue || ""}
                      label="affiliation avec le défunt"
                      onChange={(event) => {
                        setAffiliationValue(event.target.value);
                      }}
                    >
                      <MenuItem value={"ascendant_direct"}>
                        Ascendant direct
                      </MenuItem>
                      <MenuItem value={"descendant_direct"}>
                        Descendant direct
                      </MenuItem>
                      <MenuItem value={"tuteur"}>Tuteur</MenuItem>
                      <MenuItem value={"procureur"}>
                        Procureur de la République
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <hr />
              </div>

              <div className="partie-defunt">
                <Typography
                  variant="h5"
                  gutterBottom
                  style={{ marginTop: "5px" }}
                >
                  Partie Défunt
                </Typography>
                <TextField
                  margin="normal"
                  readOnly
                  fullWidth
                  id="nin_dead"
                  label="NIN"
                  onChange={(e) => {
                    setDefunt((prevElement) => {
                      return {
                        ...prevElement,
                        num_identifiant_national: e.target.value,
                      };
                    });
                    setActe((prevElement) => {
                      return {
                        ...prevElement,
                        num_personne: e.target.value,
                      };
                    });
                    console.log(defunt.num_identifiant_national);
                  }}
                />
                <Button
                  type="button"
                  variant="contained"
                  style={{
                    backgroundColor: "#00917C",
                    top: "10px",
                    height: "50px",
                  }}
                  onClick={() => searchDefunt(defunt.num_identifiant_national)}
                >
                  Search
                </Button>
                <Grid container>
                  <TextField
                    margin="normal"
                    readOnly
                    fullWidth
                    id="nom_dead"
                    label="Nom"
                    value={defunt.nom}
                  />
                  <TextField
                    margin="normal"
                    readOnly
                    fullWidth
                    id="prenom_dead"
                    label="Prenom"
                    value={defunt.prenom}
                  />
                  <TextField
                    margin="normal"
                    readOnly
                    fullWidth
                    id="sexe_dead"
                    label="Sexe"
                    value={defunt.sexe}
                  />
                  <TextField
                    margin="normal"
                    readOnly
                    fullWidth
                    id="etatM_dead"
                    label="état matrimonial"
                    value={defunt.etat_matrimonial}
                  />
                  <TextField
                    margin="normal"
                    readOnly
                    id="profession_dead"
                    label="Profession"
                    value={defunt.profession}
                  />
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Date Deces"
                      value={dateValue}
                      onChange={(date) => {
                        setDateValue(date);
                        acteDeces.date_deces = moment(date.$d).format(
                          "YYYY-MM-DD"
                        );
                        setActe((prevElement) => {
                          return {
                            ...prevElement,
                            date_deces: acteDeces.date_deces,
                          };
                        });
                        console.log(acte.date_deces);
                      }}
                      renderInput={(params) => (
                        <TextField required {...params} />
                      )}
                    />
                  </LocalizationProvider>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <TimePicker
                      label="Heure Deces"
                      value={timeValue}
                      onChange={(time) => {
                        setTimeValue(time);
                        acteDeces.heure_deces = moment(time.$d).format("h:mm");
                        setActe((prevElement) => {
                          return {
                            ...prevElement,
                            heure_deces: acteDeces.heure_deces,
                          };
                        });
                        console.log(acteDeces.heure_deces);
                      }}
                      renderInput={(params) => (
                        <TextField required {...params} />
                      )}
                    />
                  </LocalizationProvider>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="lieu_dead"
                    label="Lieu Deces"
                    name="Lieu Deces"
                    onChange={(e) => {
                      acteDeces.lieu_deces = e.target.value;
                      setActe((prevElement) => {
                        return {
                          ...prevElement,
                          lieu_deces: acteDeces.lieu_deces,
                        };
                      });
                      console.log(acteDeces.lieu_deces);
                    }}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="raison_dead"
                    label="Raison deces "
                  />
                </Grid>
                <hr />
              </div>
              <div className="partie-Administration">
                <Typography
                  variant="h5"
                  gutterBottom
                  style={{ marginTop: "5px" }}
                >
                  Partie Administration
                </Typography>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="matricule"
                  label="Matricule"
                  name="matricule"
                  onChange={(e) => {
                    acteDeces.matricule = e.target.value;
                    setActe((prevElement) => {
                      return {
                        ...prevElement,
                        matricule: acteDeces.matricule,
                      };
                    });
                    console.log(acteDeces.matricule);
                  }}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="numBureau"
                  label="Num Bureau"
                  name="numbureau"
                  onChange={(e) => {
                    acteDeces.num_bureau = e.target.value;
                    setActe((prevElement) => {
                      return {
                        ...prevElement,
                        num_bureau: acteDeces.num_bureau,
                      };
                    });
                    console.log(acteDeces.num_bureau);
                  }}
                />
                <Box marginBottom={10}>
                  <Button
                    type="button"
                    variant="contained"
                    style={{
                      backgroundColor: "#00917C",
                      float: "right",
                      right: "10px",
                    }}
                    onClick={() => sendActeDeces(acte)}
                  >
                    Create
                  </Button>
                </Box>
              </div>
            </Box>
          </Container>
        </>
      )}
    </>
  );
}

export default FormulaireCreation;
