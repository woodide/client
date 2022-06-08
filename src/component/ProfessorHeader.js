import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import {useRecoilState, useRecoilValue} from "recoil";
import {professorState, studentState} from "../atom/user";
function ProfessorHeader() {
  const [professor, setProfessor] = useRecoilState(professorState);

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand as={Link} to="/professor">
          WOOD IDE
        </Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/professor/create_subject">
            과목 생성
          </Nav.Link>
          <Nav.Link as={Link} to="/professor/add_assignment">
            과제 출제
          </Nav.Link>
          <Nav.Link as={Link} to="/professor/assignment">
            출제 된 과제 현황
          </Nav.Link>
          <Nav.Link as={Link} to="/professor/chat">
            과제 채팅 관리
          </Nav.Link>
        </Nav>
        <Nav>
          {!professor ? (
              <>
                <Nav.Link as={Link} to="/professor/login">
                  로그인
                </Nav.Link>
                <Nav.Link as={Link} to="/professor/register">
                  회원가입
                </Nav.Link>
              </>
          ) : <Nav.Link as={Link} to={"/professor/login"} style={{cursor:"pointer"}} onClick={() =>  {
            delete localStorage['professor'];
            setProfessor(null);
          }}>
            로그아웃
          </Nav.Link>}
        </Nav>
      </Container>
    </Navbar>
  );
}

export default ProfessorHeader;
