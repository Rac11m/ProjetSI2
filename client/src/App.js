import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login/Login";
import Main from "./pages/main/Main";
import Settings from "./pages/settings/Settings";
import FormulaireCreation from "./pages/acteNaissance/FormulaireCreation";
function App() {
  return (
    <>
      <Router>
        <div className="container">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route
              path="/creationactenaissance"
              element={<FormulaireCreation />}
            />
            <Route path="/Main" element={<Main />} />
            <Route path="/Settings" element={<Settings />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
