import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login/Login";
import Main from "./pages/main/Main";
import Settings from "./pages/settings/Settings";
import FormulaireCreationAN from "./pages/acteNaissance/FormulaireCreationAN";
import FormulaireCreationAM from "./pages/acteMariage/FormulaireCreationAM";
import FormulaireCreationAD from "./pages/acteDeces/FormulaireCreationAD";
import CreateUser from "./pages/createUser/CreateUser";
import Navbar from "./Navbar";
function App() {
  return (
    <>
      <Router>
        <div className="container">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route
              path="/creationactenaissance"
              element={<FormulaireCreationAN />}
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
            <Route path="/navbar" element={<Navbar />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
