import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import styled from "styled-components";

const LoginPanel = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

function LoginPage({ professor }) {
  const [value, setValue] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) =>
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });

  const handleLogin = (e) => {
    e.preventDefault();
    console.log(value);
  };

  return (
    <LoginPanel>
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
          <Button
            as="input"
            type="submit"
            style={{ width: "100%", marginTop: "20px" }}
            value="로그인"
          />
        </form>
      </div>
    </LoginPanel>
  );
}

export default LoginPage;
