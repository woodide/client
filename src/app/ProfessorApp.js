import React from "react";
import { Routes, Route } from "react-router-dom";
import ProfessorHeader from "../component/ProfessorHeader";
import LoginPage from "../page/LoginPage";
import ProfessorPage from "../page/ProfessorPage";
import RegisterPage from "../page/RegisterPage";
import SetSubmitPage from "../page/SetSubmitPage";
import { Layout } from "./UserApp";

function ProfessorApp() {
  return (
    <div>
      <ProfessorHeader />
      <Layout>
        <Routes>
          <Route path="/" element={<ProfessorPage />} />
          <Route path="/login" element={<LoginPage professor />} />
          <Route path="/register" element={<RegisterPage professor />} />
          <Route path="/set_submit" element={<SetSubmitPage />} />
        </Routes>
      </Layout>
    </div>
  );
}

export default ProfessorApp;
