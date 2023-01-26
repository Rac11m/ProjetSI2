import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login/Login";
import Main from "./pages/main/Main";
import Settings from "./pages/settings/Settings";
import FormulaireCreationAN from "./pages/acteNaissance/FormulaireCreationAN";
import FormulaireCreationAM from "./pages/acteMariage/FormulaireCreationAM";
import FormulaireCreationAD from "./pages/acteDeces/FormulaireCreationAD";
import CreateUser from "./pages/createUser/CreateUser";
// import Navbar from "./Navbar";
import jwtDecode from "jwt-decode";
import ConsulterAN from "./pages/acteNaissance/ConsulterAN";
import ConsulterAM from "./pages/acteMariage/ConsulterAM";
import ConsulterAD from "./pages/acteDeces/ConsulterAD";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const jwt = localStorage.getItem("token");
      const decoded = jwtDecode(jwt);
      setUser(decoded);
    } catch (error) {}
  }, []);

  return (
    <>
      <Router>
        <div className="container">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/ConsulterAN" element={<ConsulterAN />} />
            <Route path="/ConsulterAM" element={<ConsulterAM />} />
            <Route path="/ConsulterAD" element={<ConsulterAD />} />
            <Route
              path="/creationactenaissance"
              element={<FormulaireCreationAN user={user} />}
            />
            <Route
              path="/creationactemariage"
              element={<FormulaireCreationAM />}
            />
            <Route
              path="/creationactedeces"
              element={<FormulaireCreationAD />}
            />
            <Route path="/createUser" element={<CreateUser />} />
            <Route path="/Main" element={<Main />} />
            <Route path="/Settings" element={<Settings />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
