import React, { useState } from "react";
import Modal from "../component/Modal";
import ReactMarkdown from "react-markdown";
import {Button} from "@chakra-ui/react";
import remarkGfm from "remark-gfm";
import {Prism as SyntaxHighlighter} from "react-syntax-highlighter";
import {darcula} from "react-syntax-highlighter/dist/cjs/styles/prism";

function MarkdownModalButton({ title, value, style, bg,color,_hover }) {
  const [isOpen, setOpen] = useState(false);
  return (
    <>
      <Button   bg={bg}
                color={color}
                _hover={_hover} onClick={() => setOpen(true)} style={style}>
        {title}
      </Button>
      <Modal isOpen={isOpen} onClose={() => setOpen(false)} >
          <div className={"prose"} >
            <ReactMarkdown remarkPlugins={[remarkGfm]} >{value}</ReactMarkdown>
          </div>
      </Modal>
    </>
  );
}

export default MarkdownModalButton;
