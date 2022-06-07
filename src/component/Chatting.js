import React, {useEffect, useRef, useState} from "react";
import styled from "styled-components";
import {BsFillChatRightDotsFill} from "react-icons/bs";
import {AiOutlineClose} from "react-icons/ai";
import {IoMdSend} from "react-icons/io";
import ReactMarkdown from "react-markdown";
import useChat from "../hook/useChat";
import {useRecoilValue} from "recoil";
import {professorState, studentState} from "../atom/user";
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import {darcula} from 'react-syntax-highlighter/dist/cjs/styles/prism';

const StyleButtonChat = styled.div`
  user-select: none;
  cursor: pointer;
  position: absolute;
  box-shadow: rgb(0 0 0 / 30%) 0px 12px 60px 5px;
  border-radius: 15px;
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
    width: 500px;
    height: 600px;
    cursor: default;
  }
`;


const StyleChattingMain = styled.div`
  display: grid;
  grid-template-rows: 40px 1fr 40px;
  height: 100%;

  .appbar {
    border-radius: 10px 10px 0 0;
    background: #007ACC;
    display: flex;
    justify-content: space-between;

    .title {
      margin-left: 10px;
      color: white;
      line-height: 40px;
    }

    .icon {
      cursor: pointer;
      color: #fff;
     
      path {
        stroke: #fff;
      }
      font-size: 20px;
      margin-top: 10px;
      margin-right: 10px;

      &:hover {
        color: rgba(255, 255, 255, 0.7);
        path {
          stroke: rgba(255, 255, 255, 0.7);
        }
      }

      &:active {
        color: rgba(255, 255, 255, 0.3);
        path {
          stroke: rgba(255, 255, 255, 0.3);
        }
      }
    }
  }


  .content {
    padding: 10px;
    overflow: auto;
    background-color: #EFEFEF;
    height: 100%;
  }

  .send {
    border-radius: 0 0 10px 10px;
    width: 100%;
    display: flex;

    textarea {
      height: 40px;
      resize: none;
      outline: none;
      border: none;
      flex: 1;
      padding-top: 5px;
      padding-left: 10px;
      border-radius: 0 0 0 10px;
    }

    .sendButton {
      outline: none;
      border: none;
      width: 40px;
      border-radius: 0 0 10px 0;
      background: #007ACC;
      color: white;

      &:hover {
        svg {
          color: rgba(0, 0, 0, 0.3);
        }
      }

      &:active {
        svg {
          color: rgba(0, 0, 0, 0.6);
        }
      }
    }
  }
`;

const StyleMessage = styled.div`
  clear: both;

  .message {
    position: relative;
    margin-bottom: 10px;
    padding: 10px;
    background-color: #A8DDFD;
    max-width: 75%;
    text-align: left;
    font-size: 14px;
    border: 1px solid #97C6E3;
    border-radius: 10px;
    float: left;

    &.me {
      float: right;
      background-color: #f8e896;
      border: 1px solid #dfd087;
    }
  }

  p {
    word-break: break-all;
    white-space: normal;
    user-select: text;
  }

  .name {
    font-weight: bold;
  }

  .timestamp {
    color: grey;
    font-size: 12px;
  }
`
const CodeBlock = {
    code({node, inline, className, children, ...props}) {
        const match = /language-(\w+)/.exec(className || '');
        return !inline && match ? (
            <SyntaxHighlighter
                style={darcula}
                language={match[1]}
                PreTag="div"
                className={"border-10"}
                {...props}
            >
                {String(children).replace(/\n$/, '')}
            </SyntaxHighlighter>
        ) : (
            <code className={className} {...props}>
                {children}
            </code>
        );
    },
};

function ToMessage({isProfessor, name, children, time, me}) {
    return <StyleMessage>
        <div className={`message ${me && "me"}`}>
            <div className={"name"}>
                {isProfessor ? `${name} 교수님` : "익명님"}
            </div>
            <ReactMarkdown components={CodeBlock} style={{borderRadius: "10px"}}>
                {children}
            </ReactMarkdown>
            <div className={"timestamp"}>
                {time}
            </div>
        </div>
    </StyleMessage>
}

export function ChattingMain({professor, title, appBarIcon, imageName}) {
    const studentData = useRecoilValue(studentState);
    const professorData = useRecoilValue(professorState);
    const {chatList, send} = useChat({isProfessor: false, roomId: imageName});

    const [text, setText] = useState("");
    const [block, setBlock] = useState(false);


    useEffect(() => {
        console.log(chatList);
    }, [chatList]);

    const handleSend = () => {
        setText("");
        if (block === true) return;
        if (text === "") return;

        setBlock(true);

        send({from: (professor ? professorData.username : studentData.username), text, isProfessor: professor});

        setTimeout(() => { // 메시지 빠르게 보내기 금지.
            setBlock(false);
        }, 500);
    }

    const safeEnter = (e) => {
        if (e.key === "Enter" && !e.shiftKey) { // Shift + Enter
            e.preventDefault();
            handleSend();
        }
    };

    const chatRef = useRef(null);

    useEffect(() => {
        chatRef.current.scrollIntoView({behavior: 'smooth'});
    });


    return <StyleChattingMain>
        <div className={"appbar"}>
            <div className={"title"}>
                {title} 오픈 채팅방
            </div>
            {appBarIcon && React.cloneElement(appBarIcon, {className: "icon"})}
        </div>

        <div className={"content"}>
            {chatList.map((chat, idx) => <ToMessage key={`chat-${idx}`} isProfessor={chat.isProfessor} name={chat.from}
                                                    me={chat.from === (professor ? professorData.username : studentData.username)}
                                                    time={chat.time}>{chat.text}</ToMessage>)}
            <div ref={chatRef}/>
        </div>
        <div className={"send"}>
            <textarea placeholder={"Send Message"} value={text} onChange={(e) => setText((e.target.value))}
                      onKeyDown={safeEnter}/>
            <button className={"sendButton"} onClick={handleSend}>
                <IoMdSend/>
            </button>
        </div>
    </StyleChattingMain>
}


function Chatting({title, imageName}) {
    const [isOpen, setOpen] = useState(false);

    return (
        <StyleButtonChat className={isOpen ? "show" : "hide"} onClick={() => !isOpen && setOpen(true)}>
            {!isOpen && <BsFillChatRightDotsFill/>}
            {isOpen && <ChattingMain appBarIcon={<AiOutlineClose onClick={() => setOpen(false)} className={"close"}/>}
                                     title={title} imageName={imageName} height={"320px"}/>}
        </StyleButtonChat>
    );
}


export default Chatting;
