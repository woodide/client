import React from "react";
import styled from "styled-components";
import Chatting from "../../component/Chatting";
import {useNavigate, useParams} from "react-router-dom";
import {HOST_URL} from "../../config";
import {useRecoilState, useRecoilValue} from "recoil";
import {professorState, studentState} from "../../atom/user";

const IDEFrame = styled.iframe`
  width:100%;
  height:100%;
`;

function IDEPage() {
    const {imageName, port} = useParams();
    const student = useRecoilValue(studentState);
    const navigate = useNavigate();
    if(student === null) {
        navigate("/login");
    }

  return <div style={{width:"100%"}}>
      <IDEFrame src={`${HOST_URL}:${port}/?folder=/config/workspace`} />
      <Chatting imageName={imageName}  />
  </div>;
}

export default IDEPage;
