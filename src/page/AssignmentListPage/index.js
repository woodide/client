import React, {useMemo, useState} from "react";
import { Accordion, Button } from "react-bootstrap";
import Modal from "../../component/Modal";
import Table, { GreaterColumnFilter } from "../../component/Table";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import SyntaxHighlighter from "react-syntax-highlighter";
import ReactMarkdown from "react-markdown";
import { TEST_CODE } from "./test";
import MarkdownModalButton from "../../component/MarkdownModalButton";
import SideBar, { Main } from "../../component/SideBar";
import { Route, Routes, useParams } from "react-router-dom";
import {useQuery} from "react-query";
function CodeView({ code }) {
  const [isOpen, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>코드 보기</Button>
      <Modal isOpen={isOpen} onClose={() => setOpen(false)}>
        <SyntaxHighlighter language="c" style={docco}>
          {TEST_CODE}
        </SyntaxHighlighter>
      </Modal>
    </>
  );
}

// function ReportView({ report }) {
//   const [isOpen, setOpen] = useState(false);
//   return (
//     <>
//       <Button onClick={() => setOpen(true)}>보고서 보기</Button>
//       <Modal isOpen={isOpen} onClose={() => setOpen(false)}>
//         <ReactMarkdown>{`
// # Hello
// * ASd

//         `}</ReactMarkdown>
//       </Modal>
//     </>
//   );
// }

function SubjectList({ eventKey, title }) {
  const [addList, setAddList] = useState([]);

  return (
    <Accordion.Item eventKey={eventKey}>
      <Accordion.Header>{title}</Accordion.Header>
      <Accordion.Body>
        <Table
          columns={[
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
              Header: "과제 진행률",
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
          ]}
          data={[
            {
              id: "201820802",
              name: "강선규",
              percent: 70 + " %",
              count: 10,
              codeView: <CodeView code={"ASDASD"} />,
              report: (
                <MarkdownModalButton title={"보고서 보기"} value={"ASDASD"} />
              ),
            },
          ]}
        />
      </Accordion.Body>
    </Accordion.Item>
  );
}

function Assignment() {
  const { code } = useParams();

  return (
    <div>
      <Accordion defaultActiveKey="0">
        <SubjectList eventKey={"0"} title="MIPS Simulator" />
      </Accordion>
    </div>
  );
}

function AssignmentListPage() {
    const {data: subjectList} = useQuery(["professor", "subject"]);

    const subjects = useMemo(() => subjectList.map(({name,code}) => ({name,link:`/professor/assignment/${code}`})),[subjectList]);


    return (
    <div style={{ width: "100%" }}>
      <SideBar
        title="진행중인 수업"
        subjects={subjects}
      />
      <Main>
        <Routes>
          <Route path=":code" element={<Assignment />} />
        </Routes>
      </Main>
    </div>
  );
}

/**
 * 
 * 
   
 */

export default AssignmentListPage;
