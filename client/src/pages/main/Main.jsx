import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Container,
  ButtonGroup,
  Box,
  TextField,
  Grid,
  Typography,
} from "@mui/material";
import Navbar from "../../Navbar";
import bannergov from "../../media/banner-site-web-gov.png";
import Chart from "../../components/Chart";
import { useState } from "react";
import http from "../../services/httpService";
import Bar from "../../components/Bar";

const Main = ({ user }) => {
  const [openChart, setOpenChart] = useState(null);
  const [data, setData] = useState([]);
  const [barData, setBarData] = useState([]);
  const [nbrPersonnes, setNbrPersonnes] = useState(null);
  const color = "hsl(148, 70%, 50%)";

  const navigateHook = useNavigate();

  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `${token}`,
    },
  };

  const getNaissanceStats = async () => {
    try {
      const { data: result } = await http.post(
        "api/statistiques/",
        { collection: "naissance" },
        config
      );
      let newData = data;
      newData.push(result);
      setData(newData);
    } catch (error) {
      console.log(error);
    }
  };
  const getMariageStats = async () => {
    try {
      const { data: result } = await http.post(
        "api/statistiques/",
        { collection: "mariage" },
        config
      );
      let newData = data;
      newData.push(result);
      setData(newData);
    } catch (error) {
      console.log(error);
    }
  };
  const getDecesStats = async () => {
    try {
      const { data: result } = await http.post(
        "api/statistiques/",
        { collection: "deces" },
        config
      );
      let newData = data;
      newData.push(result);
      setData(newData);
    } catch (error) {
      console.log(error);
    }
  };

  const getNbrActesNaissance = async () => {
    try {
      const { data: result } = await http.get("api/actesNaissance/", config);
      let value = {
        country: "ActesNaissance",
        "nombre Actes": result.count,
        "nombre ActesColor": color,
      };
      let newData = barData;
      newData.push(value);
      setBarData(newData);
    } catch (error) {
      console.log(error);
    }
  };

  const getNbrActesMariage = async () => {
    try {
      const { data: result } = await http.get("api/actesMariage/", config);
      let value = {
        country: "ActesMariage",
        "nombre Actes": result.count,
        "nombre ActesColor": color,
      };
      let newData = barData;
      newData.push(value);
      setBarData(newData);
    } catch (error) {
      console.log(error);
    }
  };

  const getNbrActesDeces = async () => {
    try {
      const { data: result } = await http.get("api/actesDeces/", config);
      let value = {
        country: "ActesDeces",
        "nombre Actes": result.count,
        "nombre ActesColor": color,
      };
      let newData = barData;
      newData.push(value);
      setBarData(newData);
    } catch (error) {
      console.log(error);
    }
  };

  const getNbrPersonnes = async () => {
    try {
      const { data } = await http.get("api/personnes/", config);
      setNbrPersonnes(data.count);
    } catch (error) {
      console.log(error);
    }
  };

  const generateChart = async () => {
    await getNaissanceStats();
    await getMariageStats();
    await getDecesStats();

    await getNbrActesNaissance();
    await getNbrActesMariage();
    await getNbrActesDeces();

    await getNbrPersonnes();

    setOpenChart(true);
  };

  return (
    <>
      {user && (
        <>
          <Navbar user={user} />
          <Container component="main">
            <img width={"100%"} src={bannergov} alt="banner-gov" />
            <Box
              sx={{
                display: "flex",
                "& > *": {
                  m: 6,
                },
              }}
            >
              <ButtonGroup
                sx={{ width: "304px" }}
                orientation="vertical"
                aria-label="vertical outlined button group"
              >
                <Button
                  variant="contained"
                  size="large"
                  sx={{ backgroundColor: "#00917C" }}
                  onClick={() => navigateHook("/consulterAN")}
                >
                  Consulter Les Actes de Naissances
                </Button>
                <Button
                  variant="contained"
                  size="large"
                  sx={{ backgroundColor: "#00917C", height: "68.5px" }}
                  onClick={() => navigateHook("/creationactenaissance")}
                >
                  Creation nouveau acte de naissance
                </Button>
                <Button
                  key={2}
                  variant="contained"
                  size="large"
                  sx={{ backgroundColor: "#00917C", height: "68.5px" }}
                  onClick={() => navigateHook("/updateAN")}
                >
                  Mise a jour acte de naissance
                </Button>
              </ButtonGroup>

              <ButtonGroup
                sx={{ width: "304px" }}
                orientation="vertical"
                aria-label=""
              >
                <Button
                  variant="contained"
                  size="large"
                  sx={{ backgroundColor: "#00917C", height: "68.5px" }}
                  onClick={() => navigateHook("/consulterAM")}
                >
                  Consulter Les Actes de mariages
                </Button>
                <Button
                  variant="contained"
                  size="large"
                  sx={{ backgroundColor: "#00917C", height: "68.5px" }}
                  onClick={() => navigateHook("/creationactemariage")}
                >
                  Creation Nouveau acte de mariage
                </Button>
                <Button
                  variant="contained"
                  size="large"
                  sx={{ backgroundColor: "#00917C", height: "68.5px" }}
                  onClick={() => navigateHook("/updateAM")}
                >
                  Mise a jour acte de mariage
                </Button>{" "}
              </ButtonGroup>

              <ButtonGroup
                sx={{ width: "304px" }}
                orientation="vertical"
                aria-label="vertical outlined button group"
              >
                <Button
                  variant="contained"
                  size="large"
                  sx={{ backgroundColor: "#00917C", height: "68.5px" }}
                  onClick={() => navigateHook("/consulterAD")}
                >
                  Consulter Les Actes de dÉcÈs
                </Button>
                <Button
                  variant="contained"
                  size="large"
                  sx={{ backgroundColor: "#00917C", height: "68.5px" }}
                  onClick={() => navigateHook("/creationactedeces")}
                >
                  Creation nouveau acte de dÉcÈs
                </Button>
                <Button
                  variant="contained"
                  size="large"
                  sx={{ backgroundColor: "#00917C", height: "68.5px" }}
                  onClick={() => navigateHook("/updateAD")}
                >
                  Mise a jour acte de dÉcÈs
                </Button>{" "}
              </ButtonGroup>
            </Box>
            {user && user.role === "admin" && (
              <>
                <Box
                  sx={{
                    display: "flex",
                    "& > *": {
                      m: 6,
                    },
                  }}
                >
                  <ButtonGroup
                    orientation="vertical"
                    aria-label="vertical outlined button group"
                  >
                    <Button
                      variant="contained"
                      size="large"
                      sx={{ backgroundColor: "#00917C" }}
                      onClick={() => navigateHook("/registreNaissance")}
                    >
                      Voir registre des Actes de Naissance
                    </Button>
                    <Button
                      key={1}
                      variant="contained"
                      size="large"
                      sx={{ backgroundColor: "#00917C" }}
                      onClick={() => navigateHook("/registreMariage")}
                    >
                      Voir registre des Actes de Mariage
                    </Button>
                    <Button
                      key={2}
                      variant="contained"
                      size="large"
                      sx={{ backgroundColor: "#00917C" }}
                      onClick={() => navigateHook("/registreDeces")}
                    >
                      Voir registre des Actes de Deces
                    </Button>{" "}
                  </ButtonGroup>
                </Box>
                <hr />
                <Button variant="text">Partie Statistique</Button>
                <br />
                <Button
                  key={2}
                  variant="contained"
                  size="large"
                  sx={{
                    backgroundColor: "#00917C",
                    marginLeft: 6,
                    // marginBottom: 10,
                  }}
                  onClick={() => {
                    generateChart();
                  }}
                >
                  Voir les statistiques des actes
                </Button>
                <br />
                {openChart && (
                  <>
                    <div style={{ marginLeft: 100, marginTop: 20 }}>
                      <Typography>Nombre de citoyens</Typography>
                      <TextField disabled="true" value={nbrPersonnes} />
                    </div>

                    <Chart data={data} legend="Nombre des actes par an." />
                    <Bar data={barData} legend="Nombre par registre d'actes." />
                  </>
                )}
              </>
            )}
          </Container>
        </>
      )}
    </>
  );
};

export default Main;
