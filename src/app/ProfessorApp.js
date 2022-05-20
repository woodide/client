import React from "react";
import { Routes, Route } from "react-router-dom";
import ProfessorHeader from "../component/ProfessorHeader";
function ProfessorApp() {
  return (
    <div>
      <ProfessorHeader />
      <Routes>
        <Route path="/" element={<>123</>} />
        <Route path="/set_submit" element={<>asd</>} />
      </Routes>
    </div>
  );
}

export default ProfessorApp;
