import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import UserApp from "./app/UserApp";
import ProfessorApp from "./app/ProfessorApp";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function TestRouting() {
  // Test용 UI 로그인 권한 부여시 알아서 이동
  return (
    <>
      <Link
        to={"/professor"}
        style={{
          color: "white",
          position: "absolute",
          zIndex: 99,
          right: 0,
        }}
      >
        교수님 앱으로 (테스트)
      </Link>
      <Link
        to={"/"}
        style={{
          color: "white",
          position: "absolute",
          zIndex: 99,
          right: 150,
        }}
      >
        학생 앱으로 (테스트)
      </Link>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <TestRouting />
      <Routes>
        <Route path="/*" element={<UserApp />}></Route>
        <Route path="/professor/*" element={<ProfessorApp />}></Route>
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
