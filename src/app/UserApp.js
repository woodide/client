import React from "react";
import Header from "../component/Header";
import { Routes, Route } from "react-router-dom";
import MainPage from "../page/UserPage";
import styled from "styled-components";
import LoginPage from "../page/LoginPage";
import RegisterPage from "../page/RegisterPage";

export const Layout = styled.div`
  height: calc(100vh - 56px);
`;

function UserApp() {
  return (
    <div>
      <Header />
      <Layout>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/submit" element={<>과제 현황</>} />
          <Route path="/login" element={<>로그인 컴포넌트 렌더링</>} />
        </Routes>
      </Layout>
    </div>
  );
}

export default UserApp;
