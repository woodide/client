import axios from "axios";
import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Panel from "../../component/Panel";
import useForm from "../../hook/useForm";
import { FetchPost } from "../../model/Request";

function RegisterPage({ professor }) {
  const navigate = useNavigate();
  const { value, handleChange } = useForm({
    email: "",
    password: "",
    username: "",
  });

  const handleRegister = async (e) => {
    e.preventDefault();
    console.log(value);
    try {
      const response = await FetchPost("/signup_p", value);
      if (response.status === 200 && response.data === "sucess") {
        navigate("/login");
        return;
      } else {
        toast.error("회원가입 실패");
      }
    } catch (e) {
      toast.error("회원가입 실패");
    }
  };

  return (
    <Panel>
      <div style={{ width: "360px" }}>
        <form onSubmit={handleRegister}>
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
          <Form.Label style={{ marginTop: "10px" }}>Username</Form.Label>
          <Form.Control
            value={value.username}
            type="text"
            name="username"
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
