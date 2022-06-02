import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
function ProfessorHeader() {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand as={Link} to="/professor">
          WOOD IDE
        </Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/professor/set_submit">
            과제 출제
          </Nav.Link>
          <Nav.Link as={Link} to="/professor/set_submit">
            학생 승인
          </Nav.Link>
          <Nav.Link as={Link} to="/professor/set_submit">
            출제 된 과제 현황
          </Nav.Link>
          {/* 로그인 시 삭제 예정 */}
        </Nav>
        <Nav>
          <Nav.Link as={Link} to="/professor/login">
            로그인
          </Nav.Link>
          <Nav.Link as={Link} to="/professor/register">
            회원가입
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default ProfessorHeader;
