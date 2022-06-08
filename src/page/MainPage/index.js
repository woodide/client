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
import ModalButton from "../../component/ModalButton";
import SubmitListModal from "../../component/SubmitList";

function AssignmentItem({assignmentName, description, dueDate, imageName}) {
    const navigate = useNavigate();
    const handleConnectContainer = async () => {
        navigate(`/ide/${imageName}`);
        return;
    }

    const {data : container} = useQuery(["get_container",imageName]);
    const {data : resultData} = useQuery(["student", "result", container?.containerName]);

    console.log((resultData?.result?.length ?? 0) > 1 && resultData.result[resultData.result - 1]);
    return <Card style={{width: "100%"}}>
        <Card.Header>Assignment</Card.Header>
        <Card.Body>
            <Card.Title>{assignmentName}</Card.Title>

            <Card.Text style={{color: "rgba(0,0,0,0.5)", marginBottom: "0px"}}>
                {`과제 만료일 : ${moment(dueDate).format("yyyy-MM-DD H:mm")}`}
            </Card.Text>
            <Card.Text style={{color: "rgba(0,0,0,0.5)"}}>
                {(resultData?.result?.length ?? 0) > 1 ? `최근 제출일 : ${moment(resultData.result[resultData.result.length - 1]?.submitTime).format("yyyy-MM-DD HH:mm")}` : "최근 제출일 : 없음"}
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
                style={{marginLeft: "5px",marginRight:"5px"}}
            />
               <SubmitListModal value={"제출 내역"} containerName={container?.containerName}/>
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
