import React, { useState } from "react";
import SideBar from "../../component/SideBar";
import styled from "styled-components";
import { Routes, Route, useParams } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import MarkdownModalButton from "../../component/MarkdownModalButton";

const Main = styled.div`
  margin-left: 260px;
  height: 100%;
  padding: 14px;
`;

function Subject() {
  const { id } = useParams();
  return (
    <div>
      <Card style={{ width: "100%" }}>
        <Card.Header>Assignment</Card.Header>
        <Card.Body>
          <Card.Title>PA 2 : MIPS Simulator</Card.Title>

          <Card.Text style={{ color: "rgba(0,0,0,0.5)", marginBottom: "0px" }}>
            {"과제 만료일 : 2022-07-01 20:15:38"}
          </Card.Text>
          <Card.Text style={{ color: "rgba(0,0,0,0.5)" }}>
            {"최근 작업일 : 2022-07-01 20:15:38"}
          </Card.Text>
          <Button variant="primary">IDE 이동</Button>
          <MarkdownModalButton
            title="과제 설명 보기"
            value={`#Hello`}
            style={{ marginLeft: "5px" }}
          />
          <Button variant="primary" style={{ marginLeft: "5px" }}>
            Test Case (2 / 4)
          </Button>
          <Button variant="primary" style={{ marginLeft: "5px" }}>
            보고서 작성
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}

function MainPage() {
  return (
    <div style={{ width: "100%" }}>
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
