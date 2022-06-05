import React, { useState, useMemo, useEffect } from "react";
import Panel from "../../component/Panel";
import { Form, Button, Alert } from "react-bootstrap";
import useForm from "../../hook/useForm";
import StudentTable, { makeTableItem } from "../../widget/StudentTable";
import axios from "axios";
import { FetchGet, FetchPost } from "../../model/Request";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
function CreateSubjectPage() {
  const { value, handleChange } = useForm({ name: "", code: "" });
  const [addList, setAddList] = useState({});
  const navigate = useNavigate();

  const handleCreateSubject = async (e) => {
    e.preventDefault();
    const response = await FetchPost({
      isProfessor: true,
      url: "/professor/subject",
      data: value,
    });
    if (response.status === 200) {
      console.log("AA",addList);
      if(Object.keys(addList).length > 0) {
        await FetchPost({
          isProfessor:true,
          url:"/professor/subject/addStudent",
          data: {
            subjectCode: value.code,
            studentNumberList: Object.keys(addList),
          }
        });
      }
      toast(`${value.name} 과목 생성 완료`);
      navigate("/professor");
    } else {
      toast.error(`${value.name} 과목 생성 실패`);
    }
  };

  return (
    <Panel>
      <div style={{ width: "720px" }}>
        <form onSubmit={handleCreateSubject}>
          <Form.Label>과목 이름</Form.Label>
          <Form.Control
            value={value.name}
            type="text"
            name="name"
            onChange={handleChange}
          />
          <Form.Label style={{ marginTop: "10px" }}>과목 코드</Form.Label>
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
