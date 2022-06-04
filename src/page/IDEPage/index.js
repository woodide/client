import React from "react";
import styled from "styled-components";
import ButtonChat from "../../component/ButtonChat";

const IDEFrame = styled.iframe`
  width:100%;
  height:100%;
`;

function IDEPage() {
  return <div style={{width:"100%"}}>
      <IDEFrame src={"http://localhost:8443/?folder=/config/workspace"} />
      <ButtonChat />
  </div>;
}

export default IDEPage;
