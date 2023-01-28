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
    width: "800px",
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
    fontSize: 20,
    lineHeight: "2rem",
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

function ConsulterAN({ user }) {
  let acteObjet = {
    date_declaration: "",
    num_personne: "",
    num_pere: "",
    num_mere: "",
    num_declarant: "",
    num_acte_mariage: null,
    num_acte_deces: null,
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
  let bureauObjet = {
    num_bureau: "",
    nom_commune: "",
    daira: "",
    wilaya: "",
    matricule_maire: "",
  };

  const [nin, setNin] = useState(null);
  const [acte, setActe] = useState(acteObjet);
  const [acteM, setActeM] = useState(null);
  const [acteD, setActeD] = useState(null);
  const [commune, setCommune] = useState(bureauObjet);
  const [communeActuelle, setCommuneActuelle] = useState(bureauObjet);
  const [personne, setPersonne] = useState(personneObjet);
  const [pere, setPere] = useState(personneObjet);
  const [mere, setMere] = useState(personneObjet);
  const [declarant, setDeclarant] = useState(personneObjet);
  const [officier, setOfficier] = useState(userObjet);
  const [usr, setUsr] = useState(userObjet);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `${token}`,
    },
  };

  const searchActeNaissance = async (nin) => {
    try {
      const result = await http.get(`api/actesNaissance/${nin}`, config);
      setActe(result.data);
      getPersonne(result);
      getOfficier(result.data.matricule);
      getDeclarant(result.data.num_declarant);
      getBureau(result.data.num_bureau, "comm");
      getBureau(user.num_bureau, "commA");
      if (result.data.num_acte_mariage) {
        getActe(result.data.num_personne, "actem");
      }
      if (
        result.data.num_acte_deces &&
        result.data.num_acte_deces !== " " &&
        result.data.num_acte_deces !== ""
      ) {
        getActe(result.data.num_personne, "acted");
      }
      setError(null);
    } catch (e) {
      setError(e.response.data);
      setActe(null);
    }
  };

  const getActe = async (nin, typeActe) => {
    try {
      if (typeActe === "actem") {
        const acte = await http.get(`api/actesMariage/${nin}`, config);
        setActeM(acte.data);
      } else {
        const acted = await http.get(`api/actesDeces/${nin}`, config);
        setActeD(acted.data);
      }
    } catch (e) {}
  };

  const getBureau = async (numbureau, lacomm) => {
    try {
      const comm = await http.get(`api/bureauxNationaux/${numbureau}`, config);
      if (lacomm === "commA") {
        setCommuneActuelle(comm.data);
      } else {
        setCommune(comm.data);
      }
    } catch (e) {}
  };

  const getDeclarant = async (numDeclarant) => {
    try {
      const declar = await http.get(`api/personnes/${numDeclarant}`, config);
      setDeclarant(declar.data);
    } catch (e) {}
  };

  const getOfficier = async (matricule) => {
    try {
      const off = await http.get(`api/users/${matricule}`, config);
      setOfficier(off.data);
      const usir = await http.get(`api/users/${user.matricule}`, config);
      setUsr(usir.data);
    } catch (e) {}
  };

  const getPere = async (result) => {
    try {
      const pers = await http.get(`api/personnes/${result}`, config);
      setPere(pers.data);
    } catch (e) {}
  };
  const getMere = async (result) => {
    try {
      const pers = await http.get(`api/personnes/${result}`, config);
      setMere(pers.data);
    } catch (e) {}
  };
  const getPersonne = async (result) => {
    try {
      const pers = await http.get(
        `api/personnes/${result.data.num_personne}`,
        config
      );
      setPersonne(pers.data);
      getPere(pers.data.num_pere);
      getMere(pers.data.num_mere);
    } catch (e) {}
  };

  // const getEp = async (nin) => {
  //   const epp = await http.get(`api/personnes/${nin}`, config);
  //   return epp.data.nom;
  // };

  return (
    <>
      <Navbar user={user} />
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
            onClick={() => {
              searchActeNaissance(nin);
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
      {acte?._id ? (
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
                  a : {commune.nom_commune}
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
                {` ${officier.nom} ${officier.prenom}  `}
                Officier d'Etat Civil a la commune, {commune.nom_commune}
              </Text>
              <br />
              <Text style={styles.text}>
                Mentions marginales :{" "}
                {acteM ? (
                  <>
                    <br />
                    <Text style={styles.text}>
                      Marié(e) Le{" "}
                      {moment(acteM.date_mariage).format("DD-MM-YYYY")}{" "}
                    </Text>
                  </>
                ) : (
                  <p></p>
                )}
                {acteD ? (
                  <>
                    <br />
                    <Text style={styles.text}>
                      Marié(e) Le{" "}
                      {moment(acteD.date_deces).format("DD-MM-YYYY")}{" "}
                    </Text>
                  </>
                ) : (
                  <p></p>
                )}
              </Text>
              <br />
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
      {/* <PDFDownloadLink
        document={<Document title="ActePdf" />}
        fileName="acte_naissance.pdf">
        {({ loading }) => (loading ? "Loading" : "Download")}
      </PDFDownloadLink> */}
    </>
  );
}

export default ConsulterAN;
