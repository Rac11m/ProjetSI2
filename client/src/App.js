import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./pages/login/Login";
import Main from "./pages/main/Main";
import Settings from "./pages/settings/Settings";
import FormulaireCreationAN from "./pages/acteNaissance/FormulaireCreationAN";
import FormulaireCreationAM from "./pages/acteMariage/FormulaireCreationAM";
import FormulaireCreationAD from "./pages/acteDeces/FormulaireCreationAD";
import CreateUser from "./pages/createUser/CreateUser";
import jwtDecode from "jwt-decode";
import ConsulterAN from "./pages/acteNaissance/ConsulterAN";
import ConsulterAM from "./pages/acteMariage/ConsulterAM";
import ConsulterAD from "./pages/acteDeces/ConsulterAD";
import UpdateAN from "./pages/acteNaissance/UpdateAN";
import UpdateAM from "./pages/acteMariage/UpdateAM";
import UpdateAD from "./pages/acteDeces/UpdateAD";
import NotFound from "./pages/notFound/NotFound";

function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const jwt = localStorage.getItem("token");
      if (!jwt) navigate("/login");
      const decoded = jwtDecode(jwt);
      setUser(decoded);
    } catch (error) {}
  }, [navigate]);

  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<Main user={user} />} />
        <Route path="/ConsulterAN" element={<ConsulterAN user={user} />} />
        <Route path="/ConsulterAM" element={<ConsulterAM user={user} />} />
        <Route path="/ConsulterAD" element={<ConsulterAD user={user} />} />
        <Route path="/updateAN" element={<UpdateAN user={user} />} />
        <Route path="/updateAM" element={<UpdateAM user={user} />} />
        <Route path="/updateAD" element={<UpdateAD user={user} />} />
        <Route
          path="/creationactenaissance"
          element={<FormulaireCreationAN user={user} />}
        />
        <Route
          path="/creationactemariage"
          element={<FormulaireCreationAM user={user} />}
        />
        <Route
          path="/creationactedeces"
          element={<FormulaireCreationAD user={user} />}
        />
        <Route path="/createUser" element={<CreateUser User={user} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/settings" element={<Settings user={user} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
