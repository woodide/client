import React from "react";
import { Routes, Route } from "react-router-dom";
import ProfessorHeader from "../component/ProfessorHeader";
import ProfessorPage from "../page/ProfessorPage";
import SetSubmitPage from "../page/SetSubmitPage";
function ProfessorApp() {
  return (
    <div>
      <ProfessorHeader />
      <Routes>
        <Route path="/" element={<ProfessorPage />} />
        <Route path="/login" element={<>asd</>} />
        <Route path="/set_submit" element={<SetSubmitPage />} />
      </Routes>
    </div>
  );
}

export default ProfessorApp;
