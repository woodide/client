import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Panel from "../../component/Panel";
import useForm from "../../hook/useForm";
import { FetchPost } from "../../model/Request";
function LoginPage({ professor }) {
  const navigate = useNavigate();

  const { value, handleChange } = useForm({
    email: "",
    password: "",
  });

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await FetchPost("/prof_login", value);
      if (response.status === 200) {
        localStorage["loginData"] = response.data;
        navigate("/");
        return;
      } else {
        toast.error("로그인 실패");
      }
    } catch (e) {
      toast.error("로그인 실패");
    }
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
          <Button
            as="input"
            type="submit"
            style={{ width: "100%", marginTop: "20px" }}
            value="로그인"
          />
        </form>
      </div>
    </Panel>
  );
}

export default LoginPage;
