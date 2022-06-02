import React, { useState } from "react";
import { Accordion, Button } from "react-bootstrap";
import Modal from "../../component/Modal";
import Table, { GreaterColumnFilter } from "../../component/Table";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import SyntaxHighlighter from "react-syntax-highlighter";
import { TEST_CODE } from "./test";
function CodeView({ code }) {
  const [isOpen, setOpen] = useState(false);
  console.log(SyntaxHighlighter.supportedLanguages);
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
          ]}
          data={[
            {
              id: "201820802",
              name: "강선규",
              percent: 70 + " %",
              count: 10,
              codeView: <CodeView code={"ASDASD"} />,
            },
          ]}
        />
      </Accordion.Body>
    </Accordion.Item>
  );
}

function AssignmentListPage() {
  return (
    <div style={{ width: "80vw", marginTop: "20px" }}>
      <Accordion defaultActiveKey="0">
        <SubjectList eventKey={"0"} title="운영체제" />
        <SubjectList eventKey={"1"} title="컴퓨터구조" />
      </Accordion>
    </div>
  );
}

export default AssignmentListPage;
