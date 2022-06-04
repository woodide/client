import React from "react";
import styled from "styled-components";
import {BsFillChatRightDotsFill} from "react-icons/bs";

const StyleButtonChat  = styled.div`
  user-select: none;
  cursor: pointer;
    position: absolute;
  width:60px;
  height:60px;
  box-shadow: 0 0 5px rgba(0,0,0,0.3);
  border-radius: 15px;
  background:white;
  right:10px;
  bottom:30px;
  text-align: center;
  transition: 0.3s;
  &:hover {
      svg {
        color: skyblue;
      }    
  }
  svg {
    font-size: 2rem;
    margin-top: 15px;
    transition: 0.2s;

  }
`;

function ButtonChat() {
    return <StyleButtonChat>
        <BsFillChatRightDotsFill />
    </StyleButtonChat>
}

export default ButtonChat;