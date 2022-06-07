import React, {useEffect, useRef, useState} from "react";
import styled from "styled-components";
import Chatting from "../../component/Chatting";
import {useNavigate, useParams} from "react-router-dom";
import {HOST_URL} from "../../config";
import {useRecoilState, useRecoilValue} from "recoil";
import {assignmentState, professorState, studentState} from "../../atom/user";
import {FetchPost, isContainerConnect} from "../../model/Request";
import {toast} from "react-toastify";
import {useQuery} from "react-query";

const IDEFrame = styled.iframe`
  width: 100%;
  height: 100%;
`;

function IDEPage() {
    const {imageName} = useParams();
    const {data: port, isFetching} = useQuery(["container", imageName]);

    const assignment = useRecoilValue(assignmentState);
    const student = useRecoilValue(studentState);
    const [load, setLoad] = useState(false);
    const navigate = useNavigate();
    if (student === null) {
        navigate("/login");
    }

    if (isFetching) {
        return <div>Loading ...</div>
    }
    return <div style={{width: "100%"}}>
        <IDEFrame src={`${HOST_URL}:${port}/?folder=/config/workspace`} frameBorder={0}/>
        <Chatting imageName={imageName} title={assignment.assignmentName}/>
    </div>;
}

export default IDEPage;
