import React from "react";
import { Routes, Route } from "react-router-dom";
import ProfessorHeader from "../component/ProfessorHeader";
import AssignmentListPage from "../page/AssignmentListPage";
import CreateSubjectPage from "../page/CreateSubjectPage";
import LoginPage from "../page/LoginPage";
import ProfessorPage from "../page/ProfessorPage";
import RegisterPage from "../page/RegisterPage";
import SetAssignmentPage from "../page/SetAssignmentPage";
import SubjectListPage from "../page/SubjectListPage";
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
          <Route path="/create_subject" element={<CreateSubjectPage />} />
          <Route path="/subject_list" element={<SubjectListPage />} />
          <Route path="/set_assignment" element={<SetAssignmentPage />} />
          <Route path="/assignment_list" element={<AssignmentListPage />} />
        </Routes>
      </Layout>
    </div>
  );
}

export default ProfessorApp;
