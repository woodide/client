import React from "react";
import {Navbar, Container, Nav} from "react-bootstrap";
import {Link} from "react-router-dom";

function Header() {
    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand as={Link} to="/">
                    WOOD IDE
                </Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link as={Link} to="/submit">
                        과제 현황
                    </Nav.Link>
                    {/* 로그인 시 삭제 예정 */}
                </Nav>
                <Nav>
                    {!localStorage['student'] ? (
                        <>
                            <Nav.Link as={Link} to="/login">
                                로그인
                            </Nav.Link>
                            <Nav.Link as={Link} to="/register">
                                회원가입
                            </Nav.Link>
                        </>
                    ) : <Nav.Link as={"div"} style={{cursor:"pointer"}}  onClick={() =>  delete localStorage['student']}>
                        로그아웃
                    </Nav.Link>}
                </Nav>
            </Container>
        </Navbar>
    );
}

export default Header;
