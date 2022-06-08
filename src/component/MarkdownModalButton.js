import React, { useState } from "react";
import Modal from "../component/Modal";
import ReactMarkdown from "react-markdown";
import { Card } from "react-bootstrap";
import {Button} from "@chakra-ui/react";

function MarkdownModalButton({ title, value, style, bg,color,_hover }) {
  const [isOpen, setOpen] = useState(false);
  return (
    <>
      <Button   bg={bg}
                color={color}
                _hover={_hover} onClick={() => setOpen(true)} style={style}>
        {title}
      </Button>
      <Modal isOpen={isOpen} onClose={() => setOpen(false)}>
        <ReactMarkdown>{value}</ReactMarkdown>
      </Modal>
    </>
  );
}

export default MarkdownModalButton;
