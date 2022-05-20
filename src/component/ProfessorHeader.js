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
          {/* 로그인 시 삭제 예정 */}
        </Nav>
      </Container>
    </Navbar>
  );
}

export default ProfessorHeader;
