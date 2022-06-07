import React, {useEffect} from "react";
import {Navbar, Container, Nav, Button} from "react-bootstrap";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useRecoilState, useRecoilValue} from "recoil";
import {assignmentState, studentState} from "../atom/user";
import MarkdownModalButton from "./MarkdownModalButton";
import useRemainTimer from "../hook/useRemainTimer";
import {Box, Flex, IconButton, Stack, Text, useBreakpointValue, useColorModeValue} from "@chakra-ui/react";
import {CgTrees} from "react-icons/cg";

function AssignmentBar() {
    const {assignmentName, dueDate, description} = useRecoilValue(assignmentState);
    const navigate = useNavigate();

    const remainDueDate = useRemainTimer(new Date(dueDate));
    return <>
        <Nav.Link as={"div"}>
            진행중인 과제 : {assignmentName}
        </Nav.Link>
        <Nav.Link as={"div"}>
            남은 시간 {remainDueDate}
        </Nav.Link>
        <Nav.Link as={"div"} style={{cursor: "pointer"}}
                  onClick={() => navigate(-1)}>
            뒤로가기
        </Nav.Link>
        <MarkdownModalButton title={"과제 설명 보기"} value={description}/>
    </>
}


function Header() {
    const location = useLocation();
    const [student, setStudent] = useRecoilState(studentState);

    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand as={Link} to="/">
                    <div className={"flex"}>
                        <CgTrees className={"mt-1 mr-1.5"}/>
                        <div>
                            WOOD IDE
                        </div>
                    </div>
                </Navbar.Brand>
                <Nav>
                    {!student ? (
                        <>
                            <Nav.Link as={Link} to="/login">
                                로그인
                            </Nav.Link>
                            <Nav.Link as={Link} to="/register">
                                회원가입
                            </Nav.Link>
                        </>
                    ) : <>
                        {location.pathname.includes("/ide") ? <AssignmentBar/> :
                            <Nav.Link as={"div"} style={{cursor: "pointer"}}
                                      onClick={() => {
                                          delete localStorage['student'];
                                          setStudent(null);
                                      }
                                      }>
                                로그아웃
                            </Nav.Link>}

                    </>}
                </Nav>
            </Container>
        </Navbar>
    );
}

export default Header;
