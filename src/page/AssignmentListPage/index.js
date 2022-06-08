import React, {useMemo, useState} from "react";
import {Accordion } from "react-bootstrap";
import Modal from "../../component/Modal";
import Table, {GreaterColumnFilter} from "../../component/Table";
import {docco} from "react-syntax-highlighter/dist/esm/styles/hljs";
import SyntaxHighlighter from "react-syntax-highlighter";
import MarkdownModalButton from "../../component/MarkdownModalButton";
import {Route, Routes, useParams} from "react-router-dom";
import {useQuery} from "react-query";
import {Button} from "@chakra-ui/react";

function CodeView({code}) {
    const [isOpen, setOpen] = useState(false);
    return (
        <>
            <Button  bg={'blue.400'}
                     color={'white'}
                     _hover={{
                         bg: 'blue.500',
                     }} onClick={() => setOpen(true)}>코드 보기</Button>
            <Modal isOpen={isOpen} onClose={() => setOpen(false)}>
                <SyntaxHighlighter language="c" style={docco}>
                    {code}
                </SyntaxHighlighter>
            </Modal>
        </>
    );
}

function SubjectList({imageName, title}) {
    const {data : studentResult} = useQuery(["professor", "result",imageName]);
    console.log(studentResult);

    const studentData = useMemo(() => studentResult?.map(({bestScore,count,executionResult,submitCode, isSubmit,studentNumber,username}) => ({
        id:studentNumber,
        name: username,
        percent: bestScore + " 점",
        count,
        codeView: <CodeView code={submitCode} />,
        report: (
            <MarkdownModalButton title={"보고서 보기"} value={"ASDASD"}/>
        ),
    })) ?? [], [studentResult])

    const columns = useMemo(() => [
        {
            accessor: "id",
            Header: "학번",
        },
        {
            accessor: "name",
            Header: "이름",
        },
        {
            accessor: "percent",
            Header: "과제 점수",
            filter: "percentGreater",
            Filter: GreaterColumnFilter,
        },
        {
            accessor: "count",
            Header: "과제 제출 횟수",
            filter: "greater",
            Filter: GreaterColumnFilter,
        },
        {
            accessor: "codeView",
            Header: "코드 보기",
        },
        {
            accessor: "report",
            Header: "보고서 보기",
        },
    ], []);


    return (
        <Accordion.Item eventKey={imageName}>
            <Accordion.Header>{title}</Accordion.Header>
            <Accordion.Body>
                <Table
                    columns={columns}
                    data={studentData}
                />
            </Accordion.Body>
        </Accordion.Item>
    );
}

function Assignment() {
    const {code} = useParams();
    const {data: assignmentList} = useQuery(["professor", "subject", "assignment", code]);

    const assignmentData = useMemo(() => assignmentList?.map(({assignmentName, description, dueDate, imageName}, idx) =>
        <SubjectList key={`subjectList-${idx}`} imageName={imageName} title={assignmentName}/>) ?? [], [assignmentList]);

    return (
        <div style={{width:"100%"}}>
            <Accordion defaultActiveKey="0">
                {assignmentData}
            </Accordion>
        </div>
    );
}

function AssignmentListPage() {
    return (
            <Routes>
                <Route path=":code" element={<Assignment/>}/>
            </Routes>
    );
}

export default AssignmentListPage;
