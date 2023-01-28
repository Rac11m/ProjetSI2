import { Container } from "@mui/system";
import { Box, Button, TextField } from "@mui/material";
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

function ConsulterAM({ user }) {
  let acteObjet = {
    date_mariage: "",
    lieu_mariage: "",
    num_homme: "",
    num_femme: "",
    num_temoin1: "",
    num_temoin2: "",
    num_bureau: "",
    matricule: "",
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
  const [commune, setCommune] = useState(bureauObjet);
  const [communeActuelle, setCommuneActuelle] = useState(bureauObjet);
  const [personnes, setPersonnes] = useState({
    homme: null,
    pereh: null,
    mereh: null,
    femme: null,
    peref: null,
    meref: null,
    temoin1: null,
    temoin2: null,
    fonctionnaire: null,
  });

  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `${token}`,
    },
  };

  const searchActeMariage = async (nin) => {
    try {
      const result = await http.get(`api/actesMariage/${nin}`, config);
      getPersonnes(result);
      setActe(result.data);
      getBureau(result.data.num_bureau, "comm");
      getBureau(user.num_bureau, "commA");
    } catch (e) {
      console.log(e);
    }
  };

  const getPersonnes = async (result) => {
    try {
      const homme = await http.get(
        `api/personnes/${result.data.num_homme}`,
        config
      );
      const pereh = await http.get(
        `api/personnes/${homme.data.num_pere}`,
        config
      );
      const mereh = await http.get(
        `api/personnes/${homme.data.num_mere}`,
        config
      );
      const femme = await http.get(
        `api/personnes/${result.data.num_femme}`,
        config
      );
      const peref = await http.get(
        `api/personnes/${femme.data.num_pere}`,
        config
      );
      const meref = await http.get(
        `api/personnes/${femme.data.num_mere}`,
        config
      );
      const temoin1 = await http.get(
        `api/personnes/${result.data.num_temoin1}`,
        config
      );
      const temoin2 = await http.get(
        `api/personnes/${result.data.num_temoin2}`,
        config
      );
      const fonctionnaire = await http.get(
        `api/users/${result.data.matricule}`,
        config
      );
      setPersonnes({
        homme,
        pereh,
        mereh,
        femme,
        peref,
        meref,
        temoin1,
        temoin2,
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
              {/* <Box marginBottom={10}> */}
              <Button
                fullWidth
                type="button"
                variant="contained"
                style={{ backgroundColor: "#00917C", top: "15px" }}
                onClick={(e) => {
                  searchActeMariage(nin);
                  console.log(acte);
                }}>
                Search
              </Button>
            </Box>
          </Container>

          {acte._id && personnes.fonctionnaire ? (
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
                      }}>
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
                  <Text style={styles.text}>
                    Le : {moment(acte.date_mariage).format("DD-MM-YYYY")}
                  </Text>
                  <Text style={styles.text}>à : {acte.lieu_mariage}</Text>
                  <br />
                  <Text style={styles.text}>
                    A été célébré devant l'officier de l'etat:{" "}
                    {` ${personnes.fonctionnaire.data.nom} ${personnes.fonctionnaire.data.prenom} `}
                  </Text>
                  <br />
                  <Text style={styles.text}>
                    le Mariage du nommé :{" "}
                    {` ${personnes.homme.data.nom} ${personnes.homme.data.prenom} `}
                  </Text>
                  <br />
                  <Text style={styles.text}>
                    Profession: {personnes.homme.data.profession}
                  </Text>
                  <Text style={styles.text}>
                    <span style={{ position: "absolute", left: "50%" }}>
                      né le:{" "}
                      {moment(personnes.homme.data.date_naissance).format(
                        "DD-MM-YYYY"
                      )}
                    </span>
                  </Text>
                  <br />
                  <Text style={styles.text}>
                    a la commune de : {personnes.homme.data.commune_naissance}
                  </Text>
                  <Text style={styles.text}>
                    <span style={{ position: "absolute", left: "50%" }}>
                      Wilaya de : {personnes.homme.data.wilaya_naissance}
                    </span>
                  </Text>
                  <br />
                  <Text style={styles.text}>
                    Fils de : {personnes.pereh.data.nom}{" "}
                    {personnes.pereh.data.prenom}
                  </Text>
                  <Text style={styles.text}>
                    Et de : {personnes.mereh.data.nom}{" "}
                    {personnes.mereh.data.prenom}
                  </Text>
                  <br />
                  <Text style={styles.text}>
                    Et de la Nommée : {personnes.femme.data.nom}{" "}
                    {personnes.femme.data.prenom}
                  </Text>
                  <br />
                  <Text style={styles.text}>
                    Profession: {personnes.femme.data.profession}
                  </Text>
                  <Text style={styles.text}>
                    <span style={{ position: "absolute", left: "50%" }}>
                      né le:{" "}
                      {moment(personnes.femme.data.date_naissance).format(
                        "DD-MM-YYYY"
                      )}
                    </span>
                  </Text>
                  <br />
                  <Text style={styles.text}>
                    a la commune de : {personnes.femme.data.commune_naissance}
                  </Text>
                  <Text style={styles.text}>
                    <span style={{ position: "absolute", left: "50%" }}>
                      Wilaya de : {personnes.femme.data.wilaya_naissance}
                    </span>
                  </Text>
                  <br />
                  <br />
                  <Text style={styles.text}>
                    Fille de : {personnes.peref.data.nom}{" "}
                    {personnes.peref.data.prenom}
                  </Text>
                  <Text style={styles.text}>
                    Et de : {personnes.meref.data.nom}{" "}
                    {personnes.meref.data.prenom}
                  </Text>
                  <br />
                  <Text style={styles.text}>
                    Lesquels ont declaré publiquement vouloir se prendre pour
                    Epoux, et Nous avons prononcé au de la loi qu'ils sont unis
                    par le mariage en présence de :{" "}
                    {`${personnes.temoin1.data.nom} ${personnes.temoin1.data.prenom} `}
                  </Text>
                  <br />
                  <Text style={styles.text}>
                    Et de :{" "}
                    {`${personnes.temoin2.data.nom} ${personnes.temoin2.data.prenom} `}
                  </Text>
                  <br />
                  <Text style={styles.text}>
                    Témoins majeurs, Qui lecture faite on signé avec les époux
                  </Text>
                  <br />
                  <Text style={styles.text}>
                    Et Nous :
                    {` ${personnes.fonctionnaire.data.nom}  ${personnes.fonctionnaire.data.prenom}`}
                    <span style={{ position: "absolute", right: "40%" }}>
                      {" "}
                      Officier de l'etat civil,
                    </span>
                  </Text>
                  <br />
                  <Text style={styles.text}>
                    de la commune de : {commune.nom_commune}
                  </Text>
                  <div
                    style={{
                      position: "absolute",
                      right: "10px",
                      bottom: "10px",
                    }}>
                    <Text style={styles.text}>
                      Fait a : {communeActuelle.nom_commune} {"  "} le{" "}
                      {moment(acte.date_declaration).format("DD-MM-YYYY")}
                    </Text>
                    <br />
                    <Text style={styles.text}>
                      L'officier de l'etat civil,{" "}
                      {personnes.fonctionnaire.data.nom} {"  "}{" "}
                      {personnes.fonctionnaire.data.prenom}
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

export default ConsulterAM;
