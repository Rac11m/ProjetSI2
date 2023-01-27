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
import "./forms.css";
import Navbar from "../../Navbar";
import http from "../../services/httpService";
import moment from "moment";

const FormulaireCreation = ({ user }) => {
  const [dateValue, setDateValue] = useState(null);
  const [timeValue, setTimeValue] = useState(null);
  const [sexeValue, setSexeValue] = useState("");
  const [affiliationValue, setAffiliationValue] = useState(null);
  const [nindeclarant, setNindeclarant] = useState(null);

  let nouveauNeObjet = {
    num_identifiant_national: "1000000004",
    nom: "",
    prenom: "",
    sexe: "",
    date_naissance: "",
    heure_naissance: "",
    lieu_naissance: "",
    commune_naissance: "",
    wilaya_naissance: "",
    pays_naissance: "",
    etat_matrimonial: " ",
    commune_residence: "",
    num_pere: "",
    num_mere: "",
  };
  const [nouveauNe, setNouveauNe] = useState(nouveauNeObjet);

  const DeclarantVide = {
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
  const [declarant, setDeclarant] = useState(DeclarantVide);

  const officierObjet = {
    matricule: "30000",
    num_bureau: "16000",
  };

  const ActeNaissObjet = {
    date_declaration: "",
    num_personne: "",
    num_pere: "",
    num_mere: "",
    num_declarant: "",
    num_acte_mariage: " ",
    num_acte_deces: " ",
    num_bureau: "",
    matricule: "",
  };

  const sendActeNaissance = async (acte) => {
    acte.date_declaration = moment(new Date()).format("YYYY-MM-DD");
    acte.num_personne = nouveauNeObjet.num_identifiant_national;
    acte.num_declarant = nindeclarant;
    acte.num_pere = nouveauNe.num_pere;
    acte.num_mere = nouveauNe.num_mere;
    acte.matricule = officierObjet.matricule;
    acte.num_bureau = officierObjet.num_bureau;
    return await http.post("api/actesNaissance", acte);
  };

  const sendNouveauNe = async () => {
    const pere = await http.get(`api/personnes/${nouveauNeObjet.num_pere}`);
    nouveauNeObjet.commune_residence = pere.data.commune_residence;
    setNouveauNe((prevElement) => {
      return {
        ...prevElement,
        commune_residence: nouveauNeObjet.commune_residence,
      };
    });
    nouveauNeObjet.pays_naissance = "Algerie";
    nouveauNeObjet.etat_matrimonial = " ";
    return await http.post("api/personnes", nouveauNeObjet);
  };
  const searchDeclarant = async (nin) => {
    const result = await http.get(`api/personnes/${nin}`);
    setDeclarant(result.data);
    console.log(declarant);
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
                    setNindeclarant(e.target.value);
                  }}
                />
                {/* <Box marginBottom={10}> */}
                <Button
                  type="button"
                  variant="contained"
                  style={{ backgroundColor: "#00917C", top: "15px" }}
                  onClick={() => searchDeclarant(nindeclarant)}
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
                    //label="Prenom"
                    value={declarant.prenom}
                  />
                  <TextField
                    margin="normal"
                    fullWidth
                    readOnly
                    id="sexe_declarant"
                    //label="Sexe"
                    value={declarant.sexe}
                  />
                  <TextField
                    margin="normal"
                    fullWidth
                    readOnly
                    id="etatM_declarant"
                    //label="état matrimonial"
                    value={declarant.etat_matrimonial}
                  />
                  <TextField
                    margin="normal"
                    fullWidth
                    readOnly
                    id="profession_declarant"
                    //label="Profession"
                    value={declarant.profession}
                  />
                  <TextField
                    margin="normal"
                    fullWidth
                    readOnly
                    id="dateN_declarant"
                    //label="Date Naissance"
                    value={declarant.date_naissance}
                  />
                  <TextField
                    margin="normal"
                    fullWidth
                    readOnly
                    id="lieuN_declarant"
                    // label="Lieu Naissance"
                    value={declarant.lieu_naissance}
                  />
                  <TextField
                    margin="normal"
                    fullWidth
                    readOnly
                    id="communeN_declarant"
                    //label="Commune Naissance"
                    value={declarant.commune_naissance}
                  />
                  <TextField
                    margin="normal"
                    fullWidth
                    readOnly
                    id="wilayaN_declarant"
                    // label="Wilaya Naissance"
                    value={declarant.wilaya_naissance}
                  />
                  <TextField
                    margin="normal"
                    fullWidth
                    readOnly
                    id="CommuneR_declarant"
                    // label="Commune Résidence"
                    value={declarant.commune_residence}
                  />
                  <FormControl sx={{ m: 1, width: 260 }}>
                    <InputLabel id="affiliation_label">
                      Affiliation avec le nouveau né
                    </InputLabel>
                    <Select
                      required
                      labelId="affiliation_label"
                      id="affliation_declarant"
                      value={affiliationValue || ""}
                      label="affiliation avec le nouveau né"
                      onChange={(event) => {
                        setAffiliationValue(event.target.value);
                      }}
                    >
                      <MenuItem value={"parent"}>Parent</MenuItem>
                      <MenuItem value={"tuteur"}>Tuteur</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <hr />
              </div>

              <div className="partie-nouveau-ne">
                <Typography
                  variant="h5"
                  gutterBottom
                  style={{ marginTop: "5px" }}
                >
                  Partie Nouveau né
                </Typography>
                <TextField
                  margin="normal"
                  disabled
                  required
                  fullWidth
                  id="nin_newborn"
                  label="NIN"
                  name="nin"
                  autoComplete="nin"
                  autoFocus
                />
                <Grid container>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="nom_newborn"
                    label="Nom"
                    name="Nom"
                    onChange={(e) => {
                      nouveauNeObjet.nom = e.target.value;
                      setNouveauNe((pervUser) => {
                        return {
                          ...pervUser,
                          nom: nouveauNeObjet.nom,
                        };
                      });
                      console.log(nouveauNeObjet.nom);
                    }}
                    autoFocus
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="prenom_newborn"
                    label="Prenom"
                    name="Prenom"
                    autoFocus
                    onChange={(e) => {
                      nouveauNeObjet.prenom = e.target.value;
                      setNouveauNe((pervUser) => {
                        return {
                          ...pervUser,
                          prenom: nouveauNeObjet.prenom,
                        };
                      });
                      console.log(nouveauNeObjet.prenom);
                    }}
                  />
                  <FormControl sx={{ m: 1, width: 200 }}>
                    <InputLabel id="sexe_label">Sexe</InputLabel>
                    <Select
                      required
                      labelId="sexe_label"
                      id="sexe_newborn"
                      value={sexeValue || ""}
                      label="Sexe"
                      onChange={(e) => {
                        setSexeValue(e.target.value);
                        nouveauNeObjet.sexe = e.target.value;
                        setNouveauNe((pervUser) => {
                          return {
                            ...pervUser,
                            sexe: nouveauNeObjet.sexe,
                          };
                        });
                        console.log(nouveauNeObjet.sexe);
                      }}
                    >
                      <MenuItem value={"homme"}>Homme</MenuItem>
                      <MenuItem value={"femme"}>Femme</MenuItem>
                    </Select>
                  </FormControl>

                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Date Naissance"
                      value={dateValue || undefined}
                      onChange={(date) => {
                        setDateValue(date);
                        nouveauNeObjet.date_naissance = moment(date.$d).format(
                          "YYYY-MM-DD"
                        );
                        setNouveauNe((pervUser) => {
                          return {
                            ...pervUser,
                            date_naissance: nouveauNeObjet.date_naissance,
                          };
                        });
                        console.log(nouveauNeObjet.date_naissance);
                      }}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <TimePicker
                      label="Heure Naissance"
                      value={timeValue || undefined}
                      onChange={(time) => {
                        setTimeValue(time);
                        nouveauNeObjet.heure_naissance = moment(time.$d).format(
                          "h:mm"
                        );
                        setNouveauNe((pervUser) => {
                          return {
                            ...pervUser,
                            heure_naissance: nouveauNeObjet.heure_naissance,
                          };
                        });
                        console.log(nouveauNeObjet.heure_naissance);
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
                    onChange={(e) => {
                      nouveauNeObjet.lieu_naissance = e.target.value;
                      setNouveauNe((pervUser) => {
                        return {
                          ...pervUser,
                          lieu_naissance: nouveauNeObjet.lieu_naissance,
                        };
                      });
                      console.log(nouveauNeObjet.lieu_naissance);
                    }}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="outlined-disabled"
                    label="Commune Naissance"
                    name="Commune Naissance"
                    autoFocus
                    onChange={(e) => {
                      nouveauNeObjet.commune_naissance = e.target.value;
                      setNouveauNe((pervUser) => {
                        return {
                          ...pervUser,
                          commune_naissance: nouveauNeObjet.commune_naissance,
                        };
                      });
                      console.log(nouveauNeObjet.commune_naissance);
                    }}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="outlined-disabled"
                    label="Wilaya Naissance"
                    name="Wilaya Naissance"
                    autoFocus
                    onChange={(e) => {
                      nouveauNeObjet.wilaya_naissance = e.target.value;
                      setNouveauNe((pervUser) => {
                        return {
                          ...pervUser,
                          wilaya_naissance: nouveauNeObjet.wilaya_naissance,
                        };
                      });
                      console.log(nouveauNeObjet.wilaya_naissance);
                    }}
                  />
                  <Grid>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="nin_pere"
                      label="NIN Pere"
                      name="NIN Pere"
                      autoFocus
                      onChange={(e) => {
                        nouveauNeObjet.num_pere = e.target.value;
                        setNouveauNe((pervUser) => {
                          return {
                            ...pervUser,
                            num_pere: nouveauNeObjet.num_pere,
                          };
                        });
                        console.log(nouveauNeObjet.num_pere);
                      }}
                    />
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="nom_pere"
                      label="Nom Pere"
                      name="Nom Pere"
                      autoFocus
                    />
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="prenom_pere"
                      label="Prenom Pere"
                      name="Prenom Pere"
                      autoFocus
                    />

                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="prenom_gperepaternel"
                      label="Prenom Grand-Pere Paternel"
                      name="Prenom Grand-Pere Paternel"
                      autoFocus
                    />
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="prenom_gmerepaternel"
                      label="Prenom Grand-Mere Paternel"
                      name="Prenom Grand-Mere Paternel"
                      autoFocus
                    />
                  </Grid>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="nin_mere"
                    label="NIN Mere"
                    name="NIN Mere"
                    autoFocus
                    onChange={(e) => {
                      nouveauNeObjet.num_mere = e.target.value;
                      setNouveauNe((pervUser) => {
                        return {
                          ...pervUser,
                          num_mere: nouveauNeObjet.num_mere,
                        };
                      });
                      console.log(nouveauNeObjet.num_mere);
                    }}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="nom_mere"
                    label="Nom Mere"
                    name="Nom Mere"
                    autoFocus
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="prenom_mere"
                    label="Prenom Mere"
                    name="Prenom Mere"
                    autoFocus
                  />

                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="prenom_gperematernel"
                    label="Prenom Grand-Pere Maternel"
                    name="Prenom Grand-Pere Maternel"
                    autoFocus
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="prenom_gmerematernel"
                    label="Prenom Grand-Mere Maternel"
                    name="Prenom Grand-Mere Maternel"
                    autoFocus
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
                  disabled
                  value={user?.matricule || ""}
                  id="matricule"
                  label="Matricule"
                  name="matricule"
                  autoFocus
                  onChange={(e) => {
                    officierObjet.matricule = e.target.value;
                  }}
                />
                <TextField
                  margin="normal"
                  disabled
                  fullWidth
                  value={user?.numBureau || ""}
                  id="numBureau"
                  label="Num Bureau"
                  name="numbureau"
                  autoFocus
                  onChange={(e) => {
                    officierObjet.num_bureau = e.target.value;
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
                    onClick={(e) => {
                      nouveauNeObjet = nouveauNe;
                      sendNouveauNe();
                      //console.log(nouveauNeObjet);
                      //setNouveauNe(nouveauNeObjet);

                      sendActeNaissance(ActeNaissObjet);
                    }}
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
};

export default FormulaireCreation;
