import React, { useState } from "react";
import Modal from "../component/Modal";
import ReactMarkdown from "react-markdown";
import { Card, Button } from "react-bootstrap";

function MarkdownModalButton({ title, value, style }) {
  const [isOpen, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)} style={style}>
        {title}
      </Button>
      <Modal isOpen={isOpen} onClose={() => setOpen(false)}>
        <ReactMarkdown>{value}</ReactMarkdown>
      </Modal>
    </>
  );
}

export default MarkdownModalButton;
