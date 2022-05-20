import React from "react";
import Header from "../component/Header";
import { Routes, Route } from "react-router-dom";
import MainPage from "../page/UserPage";

function UserApp() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/submit" element={<>과제 현황</>} />
        <Route path="/login" element={<>로그인 컴포넌트 렌더링</>} />
      </Routes>
    </div>
  );
}

export default UserApp;
