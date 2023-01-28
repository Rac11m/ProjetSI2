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
import { useNavigate } from "react-router-dom";
import "./forms.css";
import Navbar from "../../Navbar";
import http from "../../services/httpService";
import moment from "moment";

const FormulaireCreation = ({ user }) => {
  const navigateHook = useNavigate();

  const [dateValue, setDateValue] = useState(null);
  const [timeValue, setTimeValue] = useState(null);
  const [sexeValue, setSexeValue] = useState("");
  const [affiliationValue, setAffiliationValue] = useState(null);
  const [nindeclarant, setNindeclarant] = useState(null);
  const [responseAN, setResponseAN] = useState(null);
  const [responseNouveaNe, setResponseNouveauNe] = useState(null);
  const [openDeclarant, setOpenDeclarant] = useState(null);
  const [openPere, setOpenPere] = useState(null);
  const [openMere, setOpenMere] = useState(null);

  const parent = {
    num_identifiant_national: "",
    nom: "",
    prenom: "",
    num_pere: "",
    num_mere: "",
  };

  const [pere, setPere] = useState(parent);
  const [mere, setMere] = useState(parent);
  const [Gperep, setGPerep] = useState(parent);
  const [Gmerep, setGmerep] = useState(parent);
  const [Gperem, setGPerem] = useState(parent);
  const [Gmerem, setGmerem] = useState(parent);

  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `${token}`,
    },
  };

  let nouveauNeObjet = {
    num_identifiant_national: "",
    nom: "",
    prenom: "",
    sexe: "",
    date_naissance: "",
    heure_naissance: "",
    lieu_naissance: "",
    commune_naissance: "",
    wilaya_naissance: "",
    etat_matrimonial: " ",
    commune_residence: "",
    num_pere: "",
    num_mere: "",
  };

  const [nouveauNe, setNouveauNe] = useState(nouveauNeObjet);
  const getNouveuNeeNIN = async () => {
    try {
      let { data } = await http.get("api/personnes/", config);
      let { count } = data;
      count += 1000000000;
      count = String(count);
      setNouveauNe((prev) => {
        return { ...prev, num_identifiant_national: count };
      });
      console.log(count);
    } catch (e) {
      console.log(e);
    }
  };

  const DeclarantVide = {
    commune_naissance: "",
    commune_residence: "",
    date_naissance: " ",
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
    try {
      acte.date_declaration = moment(new Date()).format("YYYY-MM-DD");
      acte.num_personne = nouveauNeObjet.num_identifiant_national;
      acte.num_declarant = nindeclarant;
      acte.num_pere = nouveauNe.num_pere;
      acte.num_mere = nouveauNe.num_mere;
      acte.matricule = user.matricule;
      acte.num_bureau = user.num_bureau;
      const resp = await http.post("api/actesNaissance", acte, config);
      setResponseAN(resp);
      if (resp.status === 200) {
        navigateHook("/consulterAN");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const sendNouveauNe = async () => {
    try {
      const pere = await http.get(
        `api/personnes/${nouveauNeObjet.num_pere}`,
        config
      );
      nouveauNeObjet.commune_residence = pere.data.commune_residence;
      setNouveauNe((prevElement) => {
        return {
          ...prevElement,
          commune_residence: nouveauNeObjet.commune_residence,
        };
      });
      nouveauNeObjet.pays_naissance = "Algerie";
      nouveauNeObjet.etat_matrimonial = " ";
      const resp = await http.post("api/personnes", nouveauNeObjet, config);
      setResponseNouveauNe(resp);
    } catch (e) {
      console.log(e);
    }
  };

  const searchDeclarant = async (nin) => {
    const result = await http.get(`api/personnes/${nin}`, config);
    setDeclarant(result.data);
    setOpenDeclarant(true);
    console.log(declarant);
  };
  const searchParent = async (nin, affil) => {
    try {
      const result = await http.get(`api/personnes/${nin}`, config);
      if (affil === "pere") {
        setPere(result.data);
        searchParent(result.data.num_pere, "gperep");
        searchParent(result.data.num_mere, "gmerep");
        setOpenPere(true);
      } else if (affil === "mere") {
        setMere(result.data);
        searchParent(result.data.num_pere, "gperem");
        searchParent(result.data.num_mere, "gmerem");
        setOpenMere(true);
      } else if (affil === "gperep") {
        setGPerep(result.data);
      } else if (affil === "gmerep") {
        setGmerep(result.data);
      } else if (affil === "gperem") {
        setGPerem(result.data);
      } else if (affil === "gmerem") {
        setGmerem(result.data);
      }
    } catch (e) {
      console.log(e);
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
                {openDeclarant && (
                  <Grid container>
                    <TextField
                      margin="normal"
                      fullWidth
                      readOnly
                      disabled={true}
                      id="nom_declarant"
                      value={declarant.nom}
                    />
                    <TextField
                      margin="normal"
                      fullWidth
                      readOnly
                      disabled={true}
                      id="prenom_declarant"
                      //label="Prenom"
                      value={declarant.prenom}
                    />
                    <TextField
                      margin="normal"
                      fullWidth
                      readOnly
                      disabled={true}
                      id="sexe_declarant"
                      //label="Sexe"
                      value={declarant.sexe}
                    />
                    <TextField
                      margin="normal"
                      fullWidth
                      readOnly
                      disabled={true}
                      id="etatM_declarant"
                      //label="état matrimonial"
                      value={declarant.etat_matrimonial}
                    />
                    <TextField
                      margin="normal"
                      fullWidth
                      readOnly
                      disabled={true}
                      id="profession_declarant"
                      //label="Profession"
                      value={declarant.profession}
                    />
                    <TextField
                      margin="normal"
                      fullWidth
                      readOnly
                      disabled={true}
                      id="dateN_declarant"
                      // label="Date Naissance"
                      value={moment(declarant.date_naissance).format(
                        "DD-MM-YYYY"
                      )}
                    />
                    <TextField
                      margin="normal"
                      fullWidth
                      readOnly
                      disabled={true}
                      id="lieuN_declarant"
                      // label="Lieu Naissance"
                      value={declarant.lieu_naissance}
                    />
                    <TextField
                      margin="normal"
                      fullWidth
                      readOnly
                      disabled={true}
                      id="communeN_declarant"
                      //label="Commune Naissance"
                      value={declarant.commune_naissance}
                    />
                    <TextField
                      margin="normal"
                      fullWidth
                      readOnly
                      disabled={true}
                      id="wilayaN_declarant"
                      // label="Wilaya Naissance"
                      value={declarant.wilaya_naissance}
                    />
                    <TextField
                      margin="normal"
                      fullWidth
                      readOnly
                      disabled={true}
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
                )}

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
                  // label="NIN"
                  name="nin"
                  autoComplete="nin"
                  autoFocus
                  value={nouveauNe.num_identifiant_national}
                />
                <Button
                  type="button"
                  variant="contained"
                  style={{ backgroundColor: "#00917C", top: "15px" }}
                  onClick={() => getNouveuNeeNIN()}
                >
                  Generer NIN
                </Button>
                <Grid container>
                  <Grid>
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
                        value={dateValue}
                        onChange={(date) => {
                          setDateValue(date);
                          nouveauNeObjet.date_naissance = moment(
                            date.$d
                          ).format("YYYY-MM-DD");
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
                        value={timeValue}
                        onChange={(time) => {
                          setTimeValue(time);
                          nouveauNeObjet.heure_naissance = moment(
                            time.$d
                          ).format("h:mm");
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
                  </Grid>
                  <Grid>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="nin_pere"
                      label="NIN Pere"
                      name="NIN Pere"
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

                    <Button
                      type="button"
                      variant="contained"
                      style={{
                        backgroundColor: "#00917C",
                        top: "15px",
                      }}
                      onClick={() => {
                        searchParent(nouveauNe.num_pere, "pere");
                        // searchParent(pere.num_pere, "gperep");
                        // searchParent(pere.num_mere, "gmerep");
                      }}
                    >
                      Search
                    </Button>
                    {openPere && (
                      <Grid>
                        <TextField
                          margin="normal"
                          required
                          fullWidth
                          id="nom_pere"
                          label="Nom Pere"
                          name="Nom Pere"
                          value={pere.nom}
                        />
                        <TextField
                          margin="normal"
                          required
                          fullWidth
                          id="prenom_pere"
                          label="Prenom Pere"
                          name="Prenom Pere"
                          value={pere.prenom}
                        />

                        <TextField
                          margin="normal"
                          required
                          fullWidth
                          id="prenom_gperepaternel"
                          label="Prenom Grand-Pere Paternel"
                          name="Prenom Grand-Pere Paternel"
                          value={Gperep.prenom}
                        />
                        <TextField
                          margin="normal"
                          required
                          fullWidth
                          id="prenom_gmerepaternel"
                          // label="Grand-Mere Paternel"
                          name="Grand-Mere Paternel"
                          value={`${Gmerep.nom} ${Gmerep.prenom}`}
                        />
                      </Grid>
                    )}
                  </Grid>
                  <br />
                  <Grid>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="nin_mere"
                      label="NIN Mere"
                      name="NIN Mere"
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
                    <Button
                      type="button"
                      variant="contained"
                      style={{
                        backgroundColor: "#00917C",
                        top: "15px",
                      }}
                      onClick={() => {
                        searchParent(nouveauNe.num_mere, "mere");
                      }}
                    >
                      Search
                    </Button>
                    {openMere && (
                      <Grid>
                        <TextField
                          margin="normal"
                          required
                          fullWidth
                          id="nom_mere"
                          label="Nom Mere"
                          value={mere.nom}
                        />
                        <TextField
                          margin="normal"
                          required
                          fullWidth
                          id="prenom_mere"
                          label="Prenom Mere"
                          value={mere.prenom}
                        />

                        <TextField
                          margin="normal"
                          required
                          fullWidth
                          id="prenom_gperematernel"
                          label="Prenom Grand-Pere Maternel"
                          name="Prenom Grand-Pere Maternel"
                          value={Gperem.nom}
                        />
                        <TextField
                          margin="normal"
                          required
                          fullWidth
                          id="prenom_gmerematernel"
                          // label="Grand-Mere Maternel"
                          name="Grand-Mere Maternel"
                          value={`${Gmerem.nom} ${Gmerem.prenom} `}
                        />
                      </Grid>
                    )}
                  </Grid>
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
                />
                <TextField
                  margin="normal"
                  disabled
                  fullWidth
                  value={user?.num_bureau || ""}
                  id="numBureau"
                  label="Num Bureau"
                  name="numbureau"
                  onClick={() => {
                    console.log(user.matricule);
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
                      sendActeNaissance(ActeNaissObjet);
                    }}
                  >
                    Create
                  </Button>
                </Box>
              </div>
              {responseAN && responseNouveaNe ? <p></p> : <p></p>}
            </Box>
          </Container>
        </>
      )}
    </>
  );
};

export default FormulaireCreation;
