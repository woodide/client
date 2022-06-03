import React, { useEffect, useMemo } from "react";
import { Form, Dropdown, Button, Alert } from "react-bootstrap";
import MDEditor from "@uiw/react-md-editor";
import IconOption from "../../component/IconOption";
import { GCC_VERSION, PYTHON_VERSION } from "../../data/version";
import CheckBox from "../../component/CheckBox";
import DatePicker from "react-datepicker";
import { toast } from "react-toastify";
import { FetchPost } from "../../model/Request";
import { useNavigate } from "react-router-dom";

function AddAssignmentPage() {
  const navigate = useNavigate();

  const [assignmentName, setAssignmentName] = React.useState("");
  const [description, setDescription] = React.useState("# PA2: Simulator");
  const [language, setLanguage] = React.useState("cpp");
  const [languageVersion, setLanguageVersion] = React.useState("");
  const [subject, setSubject] = React.useState(["운영체제", "컴퓨터구조"]);
  const [isReport, setReport] = React.useState(false);
  const [endDate, setEndDate] = React.useState(new Date());
  const [isPending, setPending] = React.useState(false);
  const versionList = useMemo(() => {
    if (language === "cpp")
      return GCC_VERSION.map((ver, i) => (
        <Dropdown.Item
          key={`cpp_ver_${i}`}
          onClick={() => setLanguageVersion(ver)}
        >
          {ver}
        </Dropdown.Item>
      ));
    if (language === "python")
      return PYTHON_VERSION.map((ver, i) => (
        <Dropdown.Item
          key={`python_ver_${i}`}
          onClick={() => setLanguageVersion(ver)}
        >
          {ver}
        </Dropdown.Item>
      ));
  }, [language]);

  useEffect(() => {
    if (language === "cpp") setLanguageVersion(GCC_VERSION[0]);
    else if (language === "python") setLanguageVersion(PYTHON_VERSION[0]);
  }, [language]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const testInput = e.target.testInput.files[0];
    const testOutput = e.target.testOutput.files[0];
    const multipartFile = e.target.multipartFile.files[0];

    // if (assignmentName === "") {
    //   toast.error("과제 이름을 입력해주세요.");
    //   return;
    // } else if (description === "") {
    //   toast.error("과제 설명을 입력해주세요.");
    //   return;
    // } else if (!multipartFile) {
    //   toast.error("스켈레톤 코드를 업로드해주세요.");
    //   return;
    // } else if (!testInput) {
    //   toast.error("테스트케이스 인풋을 업로드해주세요.");
    //   return;
    // } else if (!testOutput) {
    //   toast.error("테스트케이스 아웃풋을 업로드해주세요.");
    //   return;
    // }
    const formData = new FormData();
    formData.append("assignmentName", assignmentName);
    formData.append("description", description);
    formData.append("language", language);
    formData.append("languageVersion", languageVersion);
    formData.append("multipartFile", multipartFile);
    formData.append("testInput", testInput);
    formData.append("testOutput", testOutput);

    const fetch = () =>
      FetchPost({
        isProfessor: true,
        url: "/professor/subject/addAssignment",
        data: formData,
        config: {
          headers: { "Content-Type": "multipart/form-data" },
        },
      });

    const functionThatReturnPromise = () =>
      new Promise((resolve) => {
        setTimeout(() => {
          navigate("/professor/assignment_list");
          resolve();
        }, 3000);
      });
    toast.promise(functionThatReturnPromise, {
      pending: "🐳 도커 이미지를 빌드중입니다. 약 5분정도 소요됩니다.",
      success: "🐳 도커 이미지 생성 완료 !",
      error: "🐳 도커 이미지 생성 실패",
    });
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Form style={{ marginTop: "10px" }} onSubmit={handleSubmit}>
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
          <Form.Control
            type="text"
            value={assignmentName}
            onChange={(e) => setAssignmentName(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>과제 설명</Form.Label>
          <div data-color-mode="light">
            <MDEditor
              value={description}
              onChange={setDescription}
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
                select={language === "cpp" ? true : false}
                onClick={() => setLanguage("cpp")}
              />
              <IconOption
                type={"python"}
                select={language === "python" ? true : false}
                onClick={() => setLanguage("python")}
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
              <Dropdown.Toggle id="dropdown-basic">
                {languageVersion}
              </Dropdown.Toggle>
              <Dropdown.Menu style={{ overflow: "auto", maxHeight: "300px" }}>
                {versionList}
              </Dropdown.Menu>
            </Dropdown>
          </Form.Group>
        </div>
        <div>
          <Alert key={"warning"} variant={"warning"}>
            스켈레톤 코드는 ZIP 파일만 업로드 가능하며, 테스트케이스 코드는
            텍스트 형식 파일만 업로드 가능합니다.
          </Alert>
          <Form.Group controlId="multipartFile" className="mb-3">
            <Form.Label>스켈레톤 코드 업로드</Form.Label>
            <Form.Control
              type="file"
              accept="zip,application/octet-stream,application/zip,application/x-zip,application/x-zip-compressed"
            />
          </Form.Group>
          <Form.Group controlId="testInput" className="mb-3">
            <Form.Label>테스트케이스 인풋 업로드</Form.Label>
            <Form.Control type="file" />
          </Form.Group>
          <Form.Group controlId="testOutput" className="mb-3">
            <Form.Label>테스트케이스 아웃풋 업로드</Form.Label>
            <Form.Control type="file" />
          </Form.Group>
        </div>
        <div style={{ marginBottom: "20px" }}>
          <CheckBox
            label={"보고서 제출 여부"}
            checked={isReport}
            onChecked={() => setReport(!isReport)}
          />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <label>과제 만기일 설정</label>
          <DatePicker
            dateFormat="yyyy-MM-dd hh:mm aa"
            selected={endDate}
            showTimeSelect
            onChange={(date) => setEndDate(date)}
          />
        </div>

        <Button
          as="input"
          type="submit"
          variant="primary"
          size="lg"
          style={{ width: "100%" }}
          value="과제 출제"
          disabled={isPending}
        />
      </Form>
    </div>
  );
}
export default AddAssignmentPage;
