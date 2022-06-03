import React from "react";
import SideBar from "../../component/SideBar";
import styled from "styled-components";
import { Routes, Route, useParams } from "react-router-dom";

const Main = styled.div`
  margin-left: 260px;
`;

function Subject() {
  const { id } = useParams();
  return <div>{id}</div>;
}

function MainPage() {
  return (
    <div>
      <SideBar
        subjects={[
          { name: "운영체제", link: "/subject/F092" },
          { name: "컴퓨터구조", link: "/subject/F093" },
        ]}
      />
      <Main>
        <Routes>
          <Route path="/subject/:id" element={<Subject />} />
        </Routes>
      </Main>
    </div>
  );
}

export default MainPage;
