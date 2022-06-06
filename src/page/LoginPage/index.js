import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Panel from "../../component/Panel";
import useForm from "../../hook/useForm";
import { FetchPost, FetchPostWithoutAuth } from "../../model/Request";
import {useRecoilState, useSetRecoilState} from "recoil";
import {studentState,professorState} from "../../atom/user";
function LoginPage({ professor }) {
  const navigate = useNavigate();

  const { value, handleChange } = useForm({
    email: "",
    password: "",
  });

  const setStudent = useSetRecoilState(studentState);
  const setProfessor = useSetRecoilState(professorState);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await FetchPostWithoutAuth("/login", value);
      const _professor = professor ? true : false;
      if (response.status === 200 && _professor === response.data?.isProfessor) {
        // localStorage[_professor ? "professor" : "student"] = response.data.token;
        const {token,username,email,isProfessor} = response.data;
        localStorage[_professor ? "professor" : "student"] = JSON.stringify(response.data);
        if(_professor) {
          setProfessor({
            token, username, email, isProfessor
          });
        } else {
          if(_professor) {
            setStudent({
              token, username, email, isProfessor
            });
          }
        }
        if (!_professor) {
          navigate("/");
          return;
        } else {
          navigate("/professor");
          return;
        }
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
