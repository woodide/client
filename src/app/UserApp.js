import React, {useEffect} from "react";
import Header from "../component/Header";
import {Routes, Route, useLocation} from "react-router-dom";
import MainPage from "../page/MainPage";
import styled from "styled-components";
import LoginPage from "../page/LoginPage";
import RegisterPage from "../page/RegisterPage";
import {ListGroup} from "react-bootstrap";
import IDEPage from "../page/IDEPage";
import ReportPage from "../page/ReportPage";
import {RecoilRoot, useRecoilState} from "recoil";
import {studentState} from "../atom/user";
import StudentSideBar from "../component/StudentSideBar";
import {Box, useColorModeValue} from "@chakra-ui/react";

export const Layout = styled.div`
  height: calc(100vh - 56px);
  display: flex;
  justify-content: center;
`;

function UserApp() {
    const [student, setStudent] = useRecoilState(studentState);
    const location = useLocation();
    useEffect(() => {
        if (student === null && localStorage['student']) {
            setStudent(JSON.parse(localStorage['student']));
        }
    }, []);

    return (
        <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')} >
            {location.pathname.includes("/ide") ? <Header /> : <StudentSideBar />}
                <Layout>
                    <Routes>
                        <Route path="/*" element={<MainPage/>}/>
                        <Route path="/login" element={<LoginPage/>}/>
                        <Route path="/register" element={<RegisterPage/>}/>
                        <Route path="/report/:imageName" element={<ReportPage/>}/>
                        <Route path="/ide/:imageName" element={<IDEPage/>}/>
                        <Route path="/submit" element={<>과제 현황</>}/>
                        <Route path="/login" element={<>로그인 컴포넌트 렌더링</>}/>
                    </Routes>
                </Layout>
        </Box>
    );
}

export default UserApp;
