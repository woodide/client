import React, { useState } from "react";
import { Accordion, Button } from "react-bootstrap";
import StudentTable from "../../widget/StudentTable";

function SubjectList({ eventKey, title }) {
  const [addList, setAddList] = useState([]);

  return (
    <Accordion.Item eventKey={eventKey}>
      <Accordion.Header>{title}</Accordion.Header>
      <Accordion.Body>
        <label style={{ marginTop: "10px" }}>학생 리스트</label>
        <StudentTable addList={addList} setAddList={setAddList} />
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "30px",
          }}
        >
          <Button as="input" value="저장" />
        </div>
      </Accordion.Body>
    </Accordion.Item>
  );
}

function SubjectListPage() {
  return (
    <div style={{ width: "80vw", marginTop: "20px" }}>
      <Accordion defaultActiveKey="0">
        <SubjectList eventKey={"0"} title="운영체제" />
        <SubjectList eventKey={"1"} title="컴퓨터구조" />
      </Accordion>
    </div>
  );
}

export default SubjectListPage;
