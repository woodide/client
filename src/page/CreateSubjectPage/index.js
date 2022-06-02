import React, { useState, useMemo } from "react";
import Panel from "../../component/Panel";
import { Form, Button, Alert } from "react-bootstrap";
import useForm from "../../hook/useForm";
import StudentTable, { makeTableItem } from "../../widget/StudentTable";

function CreateSubjectPage() {
  const { value, handleChange } = useForm({ name: "", code: "" });
  const [addList, setAddList] = useState({});

  return (
    <Panel>
      <div style={{ width: "720px" }}>
        <form>
          <Form.Label>과목 이름</Form.Label>
          <Form.Control
            value={value.name}
            type="text"
            name="name"
            onChange={handleChange}
          />
          <Form.Label>과목 코드</Form.Label>
          <Form.Control
            value={value.code}
            type="text"
            name="code"
            onChange={handleChange}
          />
          <Form.Label style={{ marginTop: "10px" }}>학생 리스트</Form.Label>
          <StudentTable addList={addList} setAddList={setAddList} />
          <Button
            as="input"
            type="submit"
            style={{ width: "100%", marginTop: "20px" }}
            value="과목 생성"
          />
        </form>
      </div>
    </Panel>
  );
}

export default CreateSubjectPage;
