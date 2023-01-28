import { Container } from "@mui/system";
import { Alert, Box, Button, TextField } from "@mui/material";
import React from "react";
import { useState } from "react";
import http from "../../services/httpService";
import {
  Document,
  Page,
  Text,
  StyleSheet,
  Font,
  View,
  // PDFDownloadLink,
} from "@react-pdf/renderer";
import moment from "moment";
import Navbar from "../../Navbar";

const styles = StyleSheet.create({
  body: {
    position: "absolute",
    width: "650px",
    height: "95%",
    marginTop: "5%",
    left: "30%",
    border: "1px solid black",
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    fontFamily: "Oswald",
  },
  author: {
    fontSize: 12,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    margin: 12,
    fontFamily: "Oswald",
  },
  text: {
    margin: 12,
    lineHeight: "2rem",
    fontSize: 20,
    textAlign: "justify",
    fontFamily: "Times-Roman",
  },

  header: {
    fontSize: 10,
    marginBottom: 20,
    textAlign: "center",
    color: "grey",
  },
});

Font.register({
  family: "Oswald",
  src: "https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf",
});

function ConsulterAD({ user }) {
  let acteObjet = {
    num_declarant: "",
    date_declaration: "",
    num_acte_naissance: "",
    num_personne: "",
    date_deces: "",
    heure_deces: "",
    lieu_deces: "",
    raison: "",
    num_bureau: "",
    matricule: "",
  };

  // eslint-disable-next-line no-unused-vars
  let personneObjet = {
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

  // eslint-disable-next-line no-unused-vars
  let userObjet = {
    matricule: "",
    email: "",
    password: "",
    nom: "",
    prenom: "",
    date_prise_service: "",
    num_bureau: "",
    pays_de_rattachement: "",
    role: "",
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
  const [commune, setCommune] = useState(bureauObjet);
  const [communeActuelle, setCommuneActuelle] = useState(bureauObjet);
  const [usr, setUsr] = useState(userObjet);
  const [personnes, setPersonnes] = useState({
    declarant: null,
    defunt: null,
    pered: null,
    mered: null,
    fonctionnaire: null,
  });
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `${token}`,
    },
  };

  const searchActeDeces = async (nin) => {
    try {
      const result = await http.get(`api/actesDeces/${nin}`, config);
      setActe(result.data);
      getPersonnes(result);
      getBureau(result.data.num_bureau, "comm");
      getBureau(user.num_bureau, "commA");
      setError(null);
    } catch (e) {
      setError(e.response.data);
    }
  };

  const getPersonnes = async (result) => {
    try {
      const declarant = await http.get(
        `api/personnes/${result.data.num_declarant}`,
        config
      );
      const defunt = await http.get(
        `api/personnes/${result.data.num_personne}`,
        config
      );
      const pered = await http.get(
        `api/personnes/${defunt.data.num_pere}`,
        config
      );
      const mered = await http.get(
        `api/personnes/${defunt.data.num_mere}`,
        config
      );
      const fonctionnaire = await http.get(
        `api/users/${result.data.matricule}`,
        config
      );
      const usir = await http.get(`api/users/${user.matricule}`, config);
      setUsr(usir.data);
      setPersonnes({
        declarant,
        defunt,
        pered,
        mered,
        fonctionnaire,
      });
    } catch (e) {
      console.log(e);
    }
  };

  const getBureau = async (numbureau, lacomm) => {
    try {
      const comm = await http.get(`api/bureauxNationaux/${numbureau}`, config);
      if (lacomm === "commA") {
        setCommuneActuelle(comm.data);
      } else {
        setCommune(comm.data);
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
                style={{ backgroundColor: "#00917C" }}
                disabled={!nin}
                onClick={(e) => {
                  searchActeDeces(nin);
                }}
              >
                Search
              </Button>
              {error && (
                <Alert
                  variant="outlined"
                  severity="warning"
                  style={{ marginTop: "30px" }}
                >
                  {<p>{error}</p>}
                </Alert>
              )}
            </Box>
          </Container>

          {acte._id &&
          personnes.defunt &&
          personnes.declarant &&
          personnes.pered &&
          personnes.mered &&
          personnes.fonctionnaire ? (
            <Document title="ActePdf">
              <Page size={"A4"} style={styles.body} fixed>
                <View>
                  <Text fixed>
                    <h6 style={{ textAlign: "center" }}>
                      REPUBLIQUE ALGERIENNE DEMOCRATIQUE POPULAIRE
                    </h6>
                  </Text>
                  <br />
                  <Text style={styles.subtitle}>
                    <p
                      style={{
                        fontSize: "10px",
                        position: "absolute",
                        top: "40px",
                      }}
                    >
                      MINISTERE DE l'INTERIEUR
                      <br />
                      DES COLLECTIVITTES LOCALES
                    </p>
                  </Text>
                  <br />
                  <div style={{ marginTop: "-15px", marginBottom: "10px" }}>
                    <Text>Wilaya : {communeActuelle.wilaya}</Text>
                    <br />
                    <Text>Daira : {communeActuelle.daira}</Text>
                    <br />
                    <Text>Commune : {communeActuelle.nom_commune}</Text>
                    <br />
                  </div>
                  <Text style={styles.title}>
                    <h4>Acte De Mariage</h4>
                  </Text>
                  <Text style={styles.author}>
                    <p style={{ marginTop: "-30px" }}>Version Electronique</p>
                  </Text>
                  <br />
                  <div style={{ position: "absolute", left: "25px" }}>
                    <Text style={styles.text}>
                      Le : {moment(acte.date_deces).format("DD-MM-YYYY")}
                    </Text>
                    <Text style={styles.text}>à : {acte.heure_deces}</Text>
                    <br />
                    <Text style={styles.text}>
                      est décédé a : {` ${acte.lieu_deces} `}
                    </Text>
                    <br />
                    <Text style={styles.text}>raison : {acte.raison}</Text>
                    <Text style={styles.text}>
                      Le nommé :{" "}
                      {` ${personnes.defunt.data.nom} ${personnes.defunt.data.prenom} `}
                    </Text>
                    <br />
                    <Text style={styles.text}>
                      né le:{" "}
                      {moment(personnes.defunt.data.date_naissance).format(
                        "DD-MM-YYYY"
                      )}
                    </Text>
                    <Text style={styles.text}>
                      a : {personnes.defunt.data.lieu_naissance}
                    </Text>
                    <br />
                    <Text style={styles.text}>
                      Commune de : {personnes.defunt.data.commune_naissance}
                    </Text>
                    <Text style={styles.text}>
                      wilaya de : {personnes.defunt.data.wilaya_naissance}
                    </Text>
                    <br />
                    <Text style={styles.text}>
                      Agé de :{" "}
                      {new Date().getFullYear() -
                        moment(personnes.defunt.data.date_naissance).year()}
                    </Text>
                    <br />
                    <Text style={styles.text}>
                      Profession: {personnes.defunt.data.profession}
                    </Text>
                    <br />
                    <Text style={styles.text}>
                      Fils de : {personnes.pered.data.nom}{" "}
                      {personnes.pered.data.prenom}
                    </Text>
                    <br />
                    <Text style={styles.text}>
                      Et de : {personnes.mered.data.nom}{" "}
                      {personnes.mered.data.prenom}
                    </Text>
                    <br />
                    <Text style={styles.text}>
                      Dressé le :{" "}
                      {moment(acte.date_declaration).format("DD-MM-YYYY")}
                    </Text>
                    <br />
                    <Text style={styles.text}>
                      {" "}
                      Dans la commune de : {commune.nom_commune} {"   "}
                    </Text>
                    <Text style={styles.text}>
                      {" "}
                      Wilaya de : {commune.wilaya}
                    </Text>
                    <br />
                    <Text style={styles.text}>
                      {" "}
                      par : {personnes.fonctionnaire.data.nom} {"  "}{" "}
                      {personnes.fonctionnaire.data.prenom}
                    </Text>
                    <br />
                    <Text style={styles.text}>
                      Sur la déclaration de :{" "}
                      {`${personnes.declarant.data.nom} ${personnes.declarant.data.prenom}`}
                    </Text>
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      right: "10px",
                      bottom: "10px",
                    }}
                  >
                    <Text style={styles.text}>
                      Fait a : {communeActuelle.nom_commune} {"  "} le{" "}
                      {moment(acte.date_declaration).format("DD-MM-YYYY")}
                    </Text>
                    <br />
                    <Text style={styles.text}>
                      L'officier de l'etat civil, {usr.nom} {"  "} {usr.prenom}
                    </Text>
                    <br />
                  </div>
                </View>
              </Page>
            </Document>
          ) : (
            <p></p>
          )}
        </>
      )}
    </>
  );
}

export default ConsulterAD;
