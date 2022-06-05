import React, {useEffect, useState} from "react";
import { Accordion, Button } from "react-bootstrap";
import StudentTable from "../../widget/StudentTable";
import {useQuery} from "react-query";
import {FetchPost} from "../../model/Request";
import {toast} from "react-toastify";

function SubjectList({ code, name }) {
  const [addList, setAddList] = useState([]);
  const {data: subjectStudent} = useQuery(["professor","subject","student", code])

    console.log(subjectStudent);


  useEffect(() => {
      if(!subjectStudent) return;
      console.log(subjectStudent.reduce((value,{studentNumber}) => ({[studentNumber] : true}),{}));
      setAddList(subjectStudent.reduce((value,{studentNumber}) => ({...value,[studentNumber] : true}),{}))
  }, [subjectStudent]);

  const handleAdd = async () => {
      const response = await FetchPost({
          isProfessor:true,
          url:"/professor/subject/addStudent",
          data: {
              subjectCode: code,
              studentNumberList: Object.keys(addList),
          }
      });
      if(response.status === 200 && response?.data?.status === "SUCCESS") {
          toast("학생 추가 및 변경 완료");
      } else {
          toast.error("학생 추가 및 변경 실패");
      }
      console.log(response);
  }

  return (
    <Accordion.Item eventKey={code}>
      <Accordion.Header>{name}</Accordion.Header>
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
          <Button as="input" value="저장" onClick={handleAdd}/>
        </div>
      </Accordion.Body>
    </Accordion.Item>
  );
}

function SubjectListPage() {
    const {data: subjectList} = useQuery(["professor", "subject"]);
    console.log(subjectList);
  return (
    <div style={{ width: "80vw", marginTop: "20px" }}>
      <Accordion defaultActiveKey={subjectList ? subjectList[0]?.code : undefined}>
          {subjectList?.map(({code,name},idx) => <SubjectList key={`subject-${idx}`} code={code} name={name} />)}
      </Accordion>
    </div>
  );
}

export default SubjectListPage;
