import React, {useEffect, useRef, useState} from "react";
import styled from "styled-components";
import { BsFillChatRightDotsFill } from "react-icons/bs";
import {AiOutlineClose} from "react-icons/ai";
import {IoMdSend} from "react-icons/io";
import ReactMarkdown from "react-markdown";
import useChat from "../hook/useChat";
import {useRecoilValue} from "recoil";
import {studentState} from "../atom/user";

const StyleButtonChat = styled.div`
  user-select: none;
  cursor: pointer;
  position: absolute;
  box-shadow: rgb(0 0 0 / 30%) 0px 12px 60px 5px;
  border-radius: 15px;
  background-color: #EFEFEF;
  backdrop-filter: blur(60px);
  right: 10px;
  bottom: 30px;
  transition: 0.3s;

  &.hide {
    background: #007ACC;;
    width: 60px;
    height: 60px;
    text-align: center;

    &:hover {
      svg {
        color: #383838;
      }
    }

    svg {
      font-size: 2rem;
      margin-top: 15px;
      transition: 0.2s;
      color: white;
    }
  }

  &.show {
    transition: 0.3s;
    width: 300px;
    height: 400px;
    cursor: default;

    .close {
      position: absolute;
      top: 10px;
      right: 10px;
      cursor: pointer;
      color: #fff;
      font-size: 20px;

      &:hover {
        color: rgba(255, 255, 255, 0.7);
      }

      &:active {
        color: rgba(255, 255, 255, 0.3);
      }
    }
  }
`;


const StyleChattingMain = styled.div`
  .appbar {
    border-radius: 10px 10px 0 0;
    height: 40px;
    background: #007ACC;
    
    .title {
      margin-left: 10px;
      color: white;
      line-height: 40px;  
    }
  }
  
  
  .content {
   padding:10px;
    overflow: auto;
    height: 320px;
  }
  .send {
    position: absolute;
    height: 40px;
    border-radius: 0 0 10px 10px;
    bottom: 0px;
    width:100%;
    display: flex;
    textarea {
        height: 40px;
        resize: none;
        outline: none;
        border: none;
        flex: 1;
        padding-top:5px;
        padding-left: 10px;
        border-radius: 0 0 0 10px;
      }
    
      .sendButton {
        outline: none;
        border: none;
        width: 40px;
        border-radius: 0 0 10px 0;
        background:  #007ACC;
        color:white;
        
        &:hover {
          svg {
            color:rgba(0,0,0,0.3);
          }
        }
        &:active {
          svg {
            color:rgba(0,0,0,0.6);
          }
        }
      }
  }
`;

const StyleMessage = styled.div`
  .message {
    position: relative;
    margin-bottom: 10px;
    padding: 10px;
    background-color: #A8DDFD;
    width: 200px;
    text-align: left;
    font-size: 14px;
    border: 1px solid #97C6E3;
    border-radius: 10px;
    
    &.me {
      margin-left: 80px;
      background-color: #f8e896;
      border: 1px solid #dfd087;
    }
  }
  
  .name{
    font-weight: bold;
  }
  
  .timestamp {
    color: grey;
    font-size: 12px;
  }
`


function ToMessage({isProfessor, name,children,time,me}) {
    return <StyleMessage>
        <div className={`message ${me && "me"}`}>
                <div className={"name"}>
                    {isProfessor ? `${name} 교수님` : "익명님"}
                </div>
                <ReactMarkdown>
                    {children}
                </ReactMarkdown>
                <div className={"timestamp"}>
                    {time}
                </div>
            </div>
    </StyleMessage>
}
function ChattingMain({title, onClose, imageName}) {
    const student = useRecoilValue(studentState);
    const {chatList, send} = useChat({ isProfessor: false,roomId:imageName});

    const [text,setText] = useState("");
    const [block,setBlock] = useState(false);


    useEffect(() => {
            console.log(chatList);
    }, [chatList]);

    const handleSend = () => {
        setText("");
        if(block === true) return;
        if(text === "") return;

        setBlock(true);
        send({from: student.username, text });

        setTimeout(() => { // 메시지 빠르게 보내기 금지.
            setBlock(false);
        }, 500);
    }

    const safeEnter = (e) =>  {
        if(e.key === "Enter" && !e.shiftKey) { // Shift + Enter
            e.preventDefault();
            handleSend();
        }
    };

    const chatRef = useRef(null);

    useEffect(() => {
        chatRef.current.scrollIntoView({ behavior: 'smooth' });
    });


    return <StyleChattingMain>
            <div className={"appbar"}>
                <div className={"title"}>
                    {title}
                </div>
                <AiOutlineClose onClick={onClose} className={"close"}/>
            </div>

        <div className={"content"}>
            {chatList.map((chat,idx) => <ToMessage key={`chat-${idx}`} isProfessor={chat.isProfessor} name={chat.from} me={chat.from === student.username} time={chat.time}>{chat.text}</ToMessage>)}
            <div ref={chatRef}/>
        </div>
        <div className={"send"}>
            <textarea placeholder={"Send Message"} value={text} onChange={(e) => setText((e.target.value))} onKeyDown={safeEnter}/>
            <button className={"sendButton"} onClick={handleSend}>
                <IoMdSend />
            </button>
        </div>
    </StyleChattingMain>
}


function Chatting({title,imageName}) {
    const [isOpen,setOpen] = useState(false);

    return (
        <StyleButtonChat className={isOpen ? "show" : "hide"} onClick={() => !isOpen && setOpen(true)} >
            {!isOpen && <BsFillChatRightDotsFill />}
            {isOpen && <ChattingMain onClose={() => setOpen(false)} title={title} imageName={imageName}/>}
        </StyleButtonChat>
      );
}


export default Chatting;
