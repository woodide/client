import React, {useMemo, useState} from "react";
import {Main,SideBar} from "../../component/SideBar";
import styled from "styled-components";
import {Routes, Route, useParams, useNavigate} from "react-router-dom";
import {Card } from "react-bootstrap";
import MarkdownModalButton from "../../component/MarkdownModalButton";
import {useQuery} from "react-query";
import moment from "moment";
import {FetchPost} from "../../model/Request";
import {toast} from "react-toastify";
import { useSetRecoilState} from "recoil";
import {assignmentState} from "../../atom/user";
import {Button, Text} from "@chakra-ui/react";

function AssignmentItem({assignmentName, description, dueDate, imageName}) {
    const navigate = useNavigate();
    const handleConnectContainer = async () => {
        navigate(`/ide/${imageName}`);
        return;
    }


    return <Card style={{width: "100%"}}>
        <Card.Header>Assignment</Card.Header>
        <Card.Body>
            <Card.Title>{assignmentName}</Card.Title>

            <Card.Text style={{color: "rgba(0,0,0,0.5)", marginBottom: "0px"}}>
                {`과제 만료일 : ${moment(dueDate).format("yyyy-MM-DD H:mm")}`}
            </Card.Text>
            <Card.Text style={{color: "rgba(0,0,0,0.5)"}}>
                {"최근 작업일 : 2022-07-01 20:15:38"}
            </Card.Text>
            <div className={"mt-3"}>
            <Button  bg={'blue.400'}
                     color={'white'}
                     _hover={{
                         bg: 'blue.500',
                     }} onClick={handleConnectContainer}>IDE 이동</Button>
            <MarkdownModalButton
                bg={'blue.400'}
                color={'white'}
                _hover={{
                    bg: 'blue.500',
                }}
                title="과제 설명 보기"
                value={description}
                style={{marginLeft: "5px"}}
            />
            <Button  bg={'blue.400'}
                     color={'white'}
                     _hover={{
                         bg: 'blue.500',
                     }} style={{marginLeft: "5px"}}>
                Test Case (2 / 4)
            </Button>
            <Button  bg={'blue.400'}
                     color={'white'}
                     _hover={{
                         bg: 'blue.500',
                     }} style={{marginLeft: "5px"}} onClick={() => navigate(`/report/${imageName}`)}>
                보고서 작성
            </Button>
            </div>
        </Card.Body>
    </Card>
}

function Subject() {

    const {code} = useParams();

    const {data: assignmentList} = useQuery(["student", "assignment", code]);

    const assignmentElem = useMemo(() => assignmentList?.map((assignment, idx) => <AssignmentItem
        key={`assign-${idx}`} {...assignment} />) ?? [], [assignmentList]);

    console.log(assignmentElem);
    return (
        <div>
            {assignmentElem.length === 0 ? <Text>등록된 과제가 없습니다.</Text> : <>{assignmentElem}</>}
        </div>
    );
}

function MainPage() {
    return (
        <div style={{width: "100%"}}>
                <Routes>
                    <Route path="/subject/:code" element={<Subject/>}/>
                </Routes>
        </div>
    );
}

export default MainPage;
