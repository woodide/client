import React from "react";
import styled from "styled-components";

const StyleIconOption = styled.div`
  background: #eff3fc;
  border-radius: 5px;
  display: inline-block;
  width: 120px;
  img {
    text-align: center;
    height: 80px;
  }
  .label {
    font-size: 12px;
    font-weight: bold;
    text-align: center;
  }
`;

function IconOption() {
  return (
    <StyleIconOption>
      <img src="/cpp_logo.svg" />
      <div className="label">C / C++</div>
    </StyleIconOption>
  );
}

export default IconOption;
