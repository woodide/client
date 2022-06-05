import React, {useMemo, useState} from "react";
import SideBar, {Main} from "../../component/SideBar";
import styled from "styled-components";
import {Routes, Route, useParams, useNavigate} from "react-router-dom";
import {Card, Button} from "react-bootstrap";
import MarkdownModalButton from "../../component/MarkdownModalButton";
import {useQuery} from "react-query";
import moment from "moment";
import {FetchPost} from "../../model/Request";
import {toast} from "react-toastify";
import { useSetRecoilState} from "recoil";
import {assignmentState} from "../../atom/user";

function AssignmentItem({assignmentName, description, dueDate, imageName}) {
    const navigate = useNavigate();
    const setAssignment = useSetRecoilState(assignmentState);
    const handleConnectContainer = async () => {
        const response = await FetchPost({
            isProfessor: false,
            url: "/container",
            data: {
                imageName
            }
        });

        if (response.status !== 201) {
            toast.error("컨테이너 생성 실패");
            return;
        }
        setAssignment({
            assignmentName, description, dueDate
        })
        navigate(`/ide/${response.data?.message}`);
    }


    return <Card style={{width: "100%"}}>
        <Card.Header>Assignment</Card.Header>
        <Card.Body>
            <Card.Title>{assignmentName}</Card.Title>

            <Card.Text style={{color: "rgba(0,0,0,0.5)", marginBottom: "0px"}}>
                {`과제 만료일 : ${moment(dueDate).format("yyyy-MM-DD H:mm")}`}
            </Card.Text>
            <Card.Text style={{color: "rgba(0,0,0,0.5)"}}>ㅈ
                {"최근 작업일 : 2022-07-01 20:15:38"}
            </Card.Text>
            <Button variant="primary" onClick={handleConnectContainer}>IDE 이동</Button>
            <MarkdownModalButton
                title="과제 설명 보기"
                value={description}
                style={{marginLeft: "5px"}}
            />
            <Button variant="primary" style={{marginLeft: "5px"}}>
                Test Case (2 / 4)
            </Button>
            <Button variant="primary" style={{marginLeft: "5px"}} onClick={() => navigate("/report/123")}>
                보고서 작성
            </Button>
        </Card.Body>
    </Card>
}

function Subject() {

    const {code} = useParams();

    const {data: assignmentList} = useQuery(["student", "assignment", code]);

    const assignmentElem = useMemo(() => assignmentList?.map((assignment, idx) => <AssignmentItem
        key={`assign-${idx}`} {...assignment} />), [assignmentList]);

    return (
        <div>
            {assignmentElem}
        </div>
    );
}

function MainPage() {
    const {data: subjectList} = useQuery(["student", "subject"]);

    const subjects = useMemo(() => subjectList?.map(({name, code}) => ({
        name,
        link: `/subject/${code}`
    })) ?? [], [subjectList]);

    return (
        <div style={{width: "100%"}}>
            <SideBar
                title="수강중인 수업"
                subjects={subjects}
            />
            <Main>
                <Routes>
                    <Route path="/subject/:code" element={<Subject/>}/>
                </Routes>
            </Main>
        </div>
    );
}

export default MainPage;
