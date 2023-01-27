import { Container } from "@mui/system";
import { Box, Button, TextField } from "@mui/material";
import React from "react";
import { useState } from "react";
import http from "../../services/httpService";
import {
  Document,
  Page,
  View,
  Text,
  PDFViewer,
  StyleSheet,
  Font,
  PDFDownloadLink,
} from "@react-pdf/renderer";
import moment from "moment";

const styles = StyleSheet.create({
  body: {
    position: "absolute",
    width: "50%",
    height: "95%",
    marginTop: "5%",
    left: "50ch",
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

// const MyDoc = (personne, pere, mere, commune, declarant, officier, acte) => (

// );

function ConsulterAN() {
  let acteObjet = {
    date_declaration: "",
    num_personne: "",
    num_pere: "",
    num_mere: "",
    num_declarant: "",
    num_acte_mariage: "",
    num_acte_deces: "",
    num_registre: "",
    num_bureau: "",
    matricule: "",
    _id: "",
  };

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

  const [nin, setNin] = useState(null);
  const [acte, setActe] = useState(acteObjet);
  const [commune, setCommune] = useState(null);
  const [personne, setPersonne] = useState(personneObjet);
  const [pere, setPere] = useState(personneObjet);
  const [mere, setMere] = useState(personneObjet);
  const [declarant, setDeclarant] = useState(personneObjet);
  const [officier, setOfficier] = useState(userObjet);

  const searchActeNaissance = async (nin) => {
    try {
      const result = await http.get(`api/actesNaissance/${nin}`);
      setActe(result.data);
      getPersonne(result);
      getOfficier(result.data.matricule);
      getDeclarant(result.data.num_declarant);
      // getNomCommune(result.data.num_bureau);
    } catch (e) {
      console.log(e);
    }
  };

  const getNomCommune = async (numbureau) => {
    try {
      const comm = await http.post(`api/bureauNationnal/${numbureau}`);
      console.log(comm);
      //setCommune(comm.data);
    } catch (e) {
      console.log(e);
    }
  };

  const getDeclarant = async (numDeclarant) => {
    try {
      const declar = await http.get(`api/personnes/${numDeclarant}`);
      setDeclarant(declar.data);
    } catch (e) {
      console.log(e);
    }
  };

  const getOfficier = async (matricule) => {
    try {
      const off = await http.get(`api/users/${matricule}`);
      setOfficier(off.data);
    } catch (e) {
      console.log(e);
    }
  };

  const getPere = async (result) => {
    try {
      const pers = await http.get(`api/personnes/${result}`);
      setPere(pers.data);
    } catch (e) {
      console.log(e);
    }
  };
  const getMere = async (result) => {
    try {
      const pers = await http.get(`api/personnes/${result}`);
      setMere(pers.data);
    } catch (e) {
      console.log(e);
    }
  };
  const getPersonne = async (result) => {
    try {
      const pers = await http.get(`api/personnes/${result.data.num_personne}`);
      setPersonne(pers.data);
      getPere(pers.data.num_pere);
      getMere(pers.data.num_mere);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Container
        className="cadre"
        sx={{ padding: "10px", paddingBottom: "2%" }}>
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
          <Button
            fullWidth
            type="button"
            variant="contained"
            style={{ backgroundColor: "#00917C", top: "15px" }}
            onClick={() => {
              searchActeNaissance(nin);
            }}>
            Search
          </Button>
        </Box>
      </Container>
      {acte._id ? (
        <Document>
          <Page size={"A4"} style={styles.body}>
            <Text fixed>
              <h6 style={{ textAlign: "center" }}>
                REPUBLIQUE ALGERIENNE DEMOCRATIQUE POPULAIRE
              </h6>
            </Text>
            <br />
            <Text style={styles.subtitle}>
              <p
                style={{ fontSize: "10px", position: "absolute", top: "40px" }}>
                MINISTERE DE l'INTERIEUR
                <br />
                DES COLLECTIVITTES LOCALES
              </p>
            </Text>
            <br />
            <div style={{ marginTop: "-15px", marginBottom: "10px" }}>
              <Text>Wilaya : {personne.nom}</Text>
              <br />
              <Text>Daira :</Text>
              <br />
              <Text>Commune :</Text>
              <br />
            </div>
            <Text style={styles.title}>
              <h4>Acte De Naissance</h4>
            </Text>
            <Text style={styles.author}>
              <p style={{ marginTop: "-30px" }}>Version Electronique</p>
            </Text>
            <br />
            <Text style={styles.text}>
              Le : {moment(personne.date_naissance).format("DD-MM-YYYY")}
            </Text>
            <br />
            <Text style={styles.text}>à : {personne.heure_naissance}</Text>,
            <Text style={styles.text}>
              <span style={{ position: "absolute", left: "50%" }}>
                est né à : {personne.lieu_naissance}
              </span>
            </Text>
            <br />
            <Text style={styles.text}>
              Commune de : {personne.commune_naissance}
            </Text>
            <Text style={styles.text}>
              <span style={{ position: "absolute", left: "50%" }}>
                Wilaya de : {personne.wilaya_naissance}
              </span>
            </Text>
            <br />
            <Text style={styles.text}>
              Le/La Nommé(e) : {personne.nom} {personne.prenom}
            </Text>
            <br />
            <Text style={styles.text}>Du sexe : {personne.sexe}</Text>
            <br />
            <Text style={styles.text}>
              Fils/Fille de : {pere.nom} {pere.prenom}
            </Text>
            <Text style={styles.text}>
              Agé de :{" "}
              {new Date().getFullYear() - moment(pere.date_naissance).year()}
            </Text>
            <Text style={styles.text}>Profession : {pere.profession}</Text>
            <br />
            <Text style={styles.text}>
              Et de : {mere.nom} {mere.prenom}
            </Text>
            <Text style={styles.text}>
              Agé de :
              {new Date().getFullYear() - moment(mere.date_naissance).year()}
            </Text>
            <Text style={styles.text}>Profession : {mere.profession}</Text>
            <br />
            <Text style={styles.text}>
              Domiciliés a : {pere.commune_residence}
            </Text>
            <br />
            <Text style={styles.text}>
              Dressé le : {moment(acte.date_declaration).format("DD-MM-YYYY")}
            </Text>
            <Text style={styles.text}>
              <span style={{ position: "absolute", left: "50%" }}>
                a : {acte.num_bureau} {commune}
              </span>
            </Text>
            <br />
            <Text style={styles.text}>
              Sur declaration faite par Madame/Monsieur : {declarant.nom}{" "}
              {declarant.prenom} {"   "}
            </Text>
            <br />
            <Text style={styles.text}>
              Lecture faite, on signes avec Nous :
              {`${officier.nom} ${officier.prenom}`}
              Officier d'Etat Civil a la commune, {officier.num_bureau}{" "}
              {commune}
            </Text>
            <br />
            <Text style={styles.text}>
              Mentions marginales : {acte.num_acte_mariage}
              {acte.num_acte_deces}
            </Text>
            <br />
            <div
              style={{ position: "absolute", right: "10px", bottom: "10px" }}>
              <Text style={styles.text}>
                Fait a : {acte.num_bureau} {commune} le{" "}
                {moment(acte.date_declaration).format("DD-MM-YYYY")}
              </Text>
              <br />
              <Text style={styles.text}>
                L'officier de l'etat civil, {officier.nom} {"  "}{" "}
                {officier.prenom}
              </Text>
              <br />
            </div>
          </Page>
        </Document>
      ) : (
        <p></p>
      )}
      {/* <PDFDownloadLink document={} fileName="somename.pdf">
        {({ blob, url, loading, error }) =>
          loading ? "Loading document..." : "Download now!"
        }
      </PDFDownloadLink> */}
    </>
  );
}

export default ConsulterAN;
