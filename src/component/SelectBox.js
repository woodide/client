import React from "react";
import styled from "styled-components";
import { AiFillCloseCircle } from "react-icons/ai";

const StyleSelectList = styled.div`
  overflow: scroll;
  white-space: nowrap;
  background: #e9ecef;
  border: 1px solid #ced4da;
  padding: 0.375rem 0.75rem;
  color: #212529;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  border-radius: 0.25rem;
  height: 38px;
`;

const StyleSelectItem = styled.div`
  cursor: pointer;
  margin-right: 10px;
  color: #212529;
  display: inline-block;
  user-select: none;

  &:hover {
    color: crimson;
    svg {
      color: crimson;
    }
  }
`;

export function SelectItem({ value, onClick }) {
  return (
    <StyleSelectItem onClick={onClick}>
        <div style={{display:"inline-block"}}>
            {value}
        </div>
      <AiFillCloseCircle style={{ marginLeft: "5px",display:"inline-block" }} />
    </StyleSelectItem>
  );
}

function SelectBox({ children }) {
  return <StyleSelectList>{children}</StyleSelectList>;
}
export default SelectBox;
