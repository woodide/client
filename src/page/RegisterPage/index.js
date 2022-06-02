import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import Panel from "../../component/Panel";
import useForm from "../../hook/useForm";

function RegisterPage({ professor }) {
  const { value, handleChange } = useForm({
    email: "",
    password: "",
    name: "",
  });

  const handleLogin = (e) => {
    e.preventDefault();
    console.log(value);
  };

  return (
    <Panel>
      <div style={{ width: "360px" }}>
        <form onSubmit={handleLogin}>
          <Form.Label>Email</Form.Label>
          <Form.Control
            value={value.email}
            type="text"
            name="email"
            onChange={handleChange}
          />
          <Form.Label style={{ marginTop: "10px" }}>Password</Form.Label>
          <Form.Control
            value={value.password}
            type="password"
            name="password"
            onChange={handleChange}
          />
          <Form.Label style={{ marginTop: "10px" }}>Nickname</Form.Label>
          <Form.Control
            value={value.password}
            type="text"
            name="name"
            onChange={handleChange}
          />
          <Button
            as="input"
            type="submit"
            style={{ width: "100%", marginTop: "20px" }}
            value="회원가입"
          />
        </form>
      </div>
    </Panel>
  );
}

export default RegisterPage;
