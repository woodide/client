import React from "react";
import { Form } from "react-bootstrap";
import MDEditor from "@uiw/react-md-editor";
import IconOption from "../../component/IconOption";

function SetSubmitPage() {
  const [value, setValue] = React.useState("# PA2: Simulator");
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Form style={{ width: "80%", marginTop: "10px" }}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>과제 이름</Form.Label>
          <Form.Control type="text" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>과제 설명</Form.Label>
          <div data-color-mode="light">
            <MDEditor value={value} onChange={setValue} color="#fff" />
          </div>
        </Form.Group>
        <IconOption />
      </Form>
    </div>
  );
}
export default SetSubmitPage;
