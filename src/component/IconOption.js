import React from "react";
import styled from "styled-components";

const StyleIconOption = styled.div`
  background: #f7f7fa;
  border-radius: 5px;
  display: inline-block;
  width: 120px;
  cursor: pointer;

  &:hover {
    background-color: #eff3fc;
  }
  &.select {
    border: 2px solid #3768d0;
  }
  .wrap {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  img {
    text-align: center;
    height: 80px;
  }
  .label {
    font-size: 12px;
    margin-bottom: 10px;
    font-weight: bold;
    text-align: center;
  }
`;

function IconOption({ type, select, onClick, style }) {
  return (
    <StyleIconOption
      className={select ? "select" : ""}
      onClick={onClick}
      style={style}
    >
      <div className={"wrap"}>
        {type === "gcc" && <img src="/cpp_logo.svg" />}
        {type === "python" && <img src="/python_logo.svg" />}
        <div className="label">{type === "gcc" ? "C / C++" : "Python"}</div>
      </div>
    </StyleIconOption>
  );
}

export default IconOption;
