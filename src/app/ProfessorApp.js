import React, {useEffect} from "react";
import {Routes, Route} from "react-router-dom";
import MainSideBar from "../component/SideBar";
import AssignmentListPage from "../page/AssignmentListPage";
import CreateSubjectPage from "../page/CreateSubjectPage";
import LoginPage from "../page/LoginPage";
import ProfessorPage from "../page/ProfessorPage";
import RegisterPage from "../page/RegisterPage";
import SubjectListPage from "../page/SubjectListPage";
import styled from "styled-components";
import AddAssignmentPage from "../page/AddAssignmentPage";
import {useRecoilState} from "recoil";
import {professorState, studentState} from "../atom/user";
import ProfessorChatPage from "../page/ProfessorChatPage";
import {Box, useColorModeValue} from "@chakra-ui/react";

export const Layout = styled.div`
  margin-left: 240px;
  display: flex;
  justify-content: center;
`;

function ProfessorApp() {

    const [professor, setProfessor] = useRecoilState(professorState);
    useEffect(() => {
        if (professor === null && localStorage['professor']) {
            console.log(JSON.parse(localStorage['professor']));
            setProfessor(JSON.parse(localStorage['professor']));
        }
    }, []);

    return (
        <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')} >
            <MainSideBar/>
            <Layout>
                <Routes>
                    <Route path="/" element={<SubjectListPage/>}/>
                    <Route path="/login" element={<LoginPage professor/>}/>
                    <Route path="/register" element={<RegisterPage professor/>}/>
                    <Route path="/create_subject" element={<CreateSubjectPage/>}/>
                    <Route path="/add_assignment" element={<AddAssignmentPage/>}/>
                    <Route path="/assignment/*" element={<AssignmentListPage/>}/>
                    <Route path="/chat/:code" element={<ProfessorChatPage />}/>
                </Routes>
            </Layout>
        </Box>
    );
}

export default ProfessorApp;
