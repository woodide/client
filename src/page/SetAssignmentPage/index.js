import React, { useEffect, useMemo } from "react";
import { Form, Dropdown, Button, Alert } from "react-bootstrap";
import MDEditor from "@uiw/react-md-editor";
import IconOption from "../../component/IconOption";
import { GCC_VERSION, PYTHON_VERSION } from "../../data/version";

function SetAssignmentPage() {
  const [value, setValue] = React.useState("# PA2: Simulator");
  const [lang, setLang] = React.useState("cpp");
  const [version, setVersion] = React.useState("");
  const [subject, setSubject] = React.useState(["운영체제", "컴퓨터구조"]);

  const versionList = useMemo(() => {
    if (lang === "cpp")
      return GCC_VERSION.map((ver, i) => (
        <Dropdown.Item key={`cpp_ver_${i}`} onClick={() => setVersion(ver)}>
          {ver}
        </Dropdown.Item>
      ));
    if (lang === "python")
      return PYTHON_VERSION.map((ver, i) => (
        <Dropdown.Item key={`python_ver_${i}`} onClick={() => setVersion(ver)}>
          {ver}
        </Dropdown.Item>
      ));
  }, [lang]);

  useEffect(() => {
    if (lang === "cpp") setVersion(GCC_VERSION[0]);
    else if (lang === "python") setVersion(PYTHON_VERSION[0]);
  }, [lang]);

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Form style={{ marginTop: "10px" }}>
        <Form.Label>과목 선택</Form.Label>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Dropdown>
            <Dropdown.Toggle
              id="dropdown-basic"
              style={{ width: "100%" }}
              variant="secondary"
            >
              {subject[0]}
            </Dropdown.Toggle>
            <Dropdown.Menu
              style={{ width: "100%", overflow: "auto", maxHeight: "300px" }}
            >
              {subject.map((v, i) => (
                <Dropdown.Item key={`python_v123er_${i}`}>{v}</Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>과제 이름</Form.Label>
          <Form.Control type="text" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>과제 설명</Form.Label>
          <div data-color-mode="light">
            <MDEditor
              value={value}
              onChange={setValue}
              color="#fff"
              height={400}
            />
          </div>
        </Form.Group>
        <div
          style={{ display: "flex", justifyContent: "center", width: "80vw" }}
        >
          <Form.Group
            className="mb-3"
            controlId="exampleForm.ControlTextarea1"
            style={{ marginRight: "30px" }}
          >
            <Form.Label>언어 선택</Form.Label>
            <div>
              <IconOption
                type={"cpp"}
                style={{ marginRight: "10px" }}
                select={lang === "cpp" ? true : false}
                onClick={() => setLang("cpp")}
              />
              <IconOption
                type={"python"}
                select={lang === "python" ? true : false}
                onClick={() => setLang("python")}
              />
            </div>
          </Form.Group>
          <Form.Group
            className="mb-3"
            controlId="exampleForm.ControlTextarea1"
            style={{ marginRight: "100px" }}
          >
            <Form.Label>버전 이미지 선택</Form.Label>
            <Dropdown>
              <Dropdown.Toggle id="dropdown-basic">{version}</Dropdown.Toggle>
              <Dropdown.Menu style={{ overflow: "auto", maxHeight: "300px" }}>
                {versionList}
              </Dropdown.Menu>
            </Dropdown>
          </Form.Group>
        </div>
        <div>
          <Alert key={"warning"} variant={"warning"}>
            스켈레톤 코드와 테스트 케이스는 ZIP 파일만 지원합니다.
          </Alert>
          <Form.Group controlId="skeletonFile" className="mb-3">
            <Form.Label>스켈레톤 코드 업로드</Form.Label>
            <Form.Control type="file" />
          </Form.Group>
          <Form.Group controlId="testcaseFile" className="mb-3">
            <Form.Label>테스트케이스 업로드</Form.Label>
            <Form.Control type="file" />
          </Form.Group>
        </div>
        <Button variant="primary" size="lg" style={{ width: "100%" }}>
          과제 제출
        </Button>
      </Form>
    </div>
  );
}
export default SetAssignmentPage;
