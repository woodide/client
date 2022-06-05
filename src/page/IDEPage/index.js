import React from "react";
import styled from "styled-components";
import Chatting from "../../component/Chatting";
import {useParams} from "react-router-dom";
import {HOST_URL} from "../../config";

const IDEFrame = styled.iframe`
  width:100%;
  height:100%;
`;

function IDEPage() {
    const {port} = useParams();

  return <div style={{width:"100%"}}>
      <IDEFrame src={`${HOST_URL}:${port}/?folder=/config/workspace`} />
      <Chatting />
  </div>;
}

export default IDEPage;
