import React, {useEffect} from "react";
import styled from "styled-components";
import Chatting from "../../component/Chatting";
import {useNavigate, useParams} from "react-router-dom";
import {HOST_URL} from "../../config";
import {useRecoilState, useRecoilValue} from "recoil";
import {assignmentState, professorState, studentState} from "../../atom/user";
import {FetchPost} from "../../model/Request";
import {toast} from "react-toastify";

const IDEFrame = styled.iframe`
  width:100%;
  height:100%;
`;

function IDEPage() {
    const {imageName, port} = useParams();
    const assignment = useRecoilValue(assignmentState);
    const student = useRecoilValue(studentState);
    const navigate = useNavigate();
    if(student === null) {
        navigate("/login");
    }

    return <div style={{width:"100%"}}>
      <IDEFrame src={`${HOST_URL}:${port}/?folder=/config/workspace`} />
      <Chatting imageName={imageName} title={assignment.assignmentName}  />
  </div>;
}

export default IDEPage;
