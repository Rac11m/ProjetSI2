import { Container } from "@mui/system";
import { Alert, Box, Button, TextField } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import React, { useState } from "react";
import http from "../../services/httpService";
import Navbar from "../../Navbar";
import { Navigate } from "react-router-dom";

const Registres = ({ user, num_registre }) => {
  const [num_bureau, setNum_bureau] = useState(null);
  const [year, setYear] = useState(null);
  const [registres, setRegistres] = useState(null);
  const [error, setError] = useState(false);

  const currYear = new Date().getFullYear();

  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `${token}`,
    },
  };

  const searchRegistres = async (info) => {
    try {
      const { data } = await http.post(`api/registres/`, info, config);
      setRegistres(data);
      setError(false);
    } catch (e) {
      setRegistres(null);
      setError(true);
    }
  };

  return (
    <>
      {user && user.role == "admin" && (
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
                id="num_bureau"
                label="Numéro bureau"
                name="num_bureau"
                autoComplete="num_bureau"
                autoFocus
                onChange={(e) => {
                  setNum_bureau(e.target.value);
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                type="number"
                inputProps={{ min: 1900, max: currYear }}
                id="annee"
                label="Année"
                name="annee"
                autoComplete="annee"
                onChange={(e) => {
                  setYear(e.target.value);
                }}
              />
              <Button
                fullWidth
                type="button"
                variant="contained"
                style={{ backgroundColor: "#00917C" }}
                disabled={!(num_bureau && year && year <= currYear)}
                onClick={() => {
                  searchRegistres({
                    num_bureau,
                    num_registre,
                    date_declaration: year,
                  });
                }}
              >
                Search
              </Button>
              {error === true && (
                <Alert
                  variant="outlined"
                  severity="warning"
                  style={{ marginTop: "30px" }}
                >
                  {<p>Numéro bureau ou Année est incorrecte.</p>}
                </Alert>
              )}
            </Box>
          </Container>
          {/* Table des actes Naissance */}
          {registres && num_registre === "0" && (
            <TableContainer component={Paper} style={{ marginTop: "30px" }}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Num Personne</TableCell>
                    <TableCell align="right">Date Declaration</TableCell>
                    <TableCell align="right">Num acte deces</TableCell>
                    <TableCell align="right">Num acte mariage</TableCell>
                    <TableCell align="right">Num Mere</TableCell>
                    <TableCell align="right">Num Pere</TableCell>
                    <TableCell align="right">Num Declarant</TableCell>
                    <TableCell align="right">Num Bureau</TableCell>
                    <TableCell align="right">matricule Agent</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {registres?.map((row) => {
                    const date = new Date(row.date_declaration);
                    const completeDate = `${date.getFullYear()}-${
                      date.getMonth() + 1
                    }-${date.getDay()}`;
                    return (
                      <TableRow
                        key={row.num_personne}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {row.num_personne}
                        </TableCell>
                        <TableCell align="right">{completeDate}</TableCell>
                        <TableCell align="right">
                          {row.num_acte_deces}
                        </TableCell>
                        <TableCell align="right">
                          {row.num_acte_mariage}
                        </TableCell>
                        <TableCell align="right">{row.num_mere}</TableCell>
                        <TableCell align="right">{row.num_pere}</TableCell>
                        <TableCell align="right">{row.num_declarant}</TableCell>
                        <TableCell align="right">{row.num_bureau}</TableCell>
                        <TableCell align="right">{row.matricule}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          )}
          {/* Table des actes Mariage */}
          {registres && num_registre === "1" && (
            <TableContainer component={Paper} style={{ marginTop: "30px" }}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Lieu Mariage</TableCell>
                    <TableCell align="right">Date Mariage</TableCell>
                    <TableCell align="right">Num Homme</TableCell>
                    <TableCell align="right">Num Femme</TableCell>
                    <TableCell align="right">Num Temoin 1</TableCell>
                    <TableCell align="right">Num Temoin 2</TableCell>
                    <TableCell align="right">Num Bureau</TableCell>
                    <TableCell align="right">matricule Agent</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {registres?.map((row, index) => {
                    const date = new Date(row.date_mariage);
                    const completeDate = `${date.getFullYear()}-${
                      date.getMonth() + 1
                    }-${date.getDay()}`;
                    return (
                      <TableRow
                        key={index}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {row.lieu_mariage}
                        </TableCell>
                        <TableCell align="right">{completeDate}</TableCell>
                        <TableCell align="right">{row.num_homme}</TableCell>
                        <TableCell align="right">{row.num_femme}</TableCell>
                        <TableCell align="right">{row.num_temoin1}</TableCell>
                        <TableCell align="right">{row.num_temoin2}</TableCell>
                        <TableCell align="right">{row.num_bureau}</TableCell>
                        <TableCell align="right">{row.matricule}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          )}
          {/* Table des actes Deces */}
          {registres && num_registre === "2" && (
            <TableContainer component={Paper} style={{ marginTop: "30px" }}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Num Personne</TableCell>
                    <TableCell align="right">Num Declarant</TableCell>
                    <TableCell align="right">Date Declaration</TableCell>
                    <TableCell align="right">Num acte naissance</TableCell>
                    <TableCell align="right">Date Deces</TableCell>
                    <TableCell align="right">Lieu Deces</TableCell>
                    <TableCell align="right">Num Bureau</TableCell>
                    <TableCell align="right">matricule Agent</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {registres?.map((row) => {
                    const declareDate = new Date(row.date_declaration);
                    const completeDeclareDate = `${declareDate.getFullYear()}-${
                      declareDate.getMonth() + 1
                    }-${declareDate.getDay()}`;

                    const decesDate = new Date(row.date_deces);
                    const completeDecesDate = `${decesDate.getFullYear()}-${
                      decesDate.getMonth() + 1
                    }-${decesDate.getDay()}`;
                    return (
                      <TableRow
                        key={row.num_personne}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {row.num_personne}
                        </TableCell>
                        <TableCell align="right">{row.num_declarant}</TableCell>
                        <TableCell align="right">
                          {completeDeclareDate}
                        </TableCell>
                        <TableCell align="right">
                          {row.num_acte_naissance}
                        </TableCell>
                        <TableCell align="right">{completeDecesDate}</TableCell>
                        <TableCell align="right">{row.lieu_deces}</TableCell>
                        <TableCell align="right">{row.num_bureau}</TableCell>
                        <TableCell align="right">{row.matricule}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </>
      )}
      {user.role !== "admin" && <Navigate to="/" />}
    </>
  );
};

export default Registres;
