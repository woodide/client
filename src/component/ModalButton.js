import React, {useState} from "react";
import Modal from "../component/Modal";
import ReactMarkdown from "react-markdown";
import {Card} from "react-bootstrap";
import {Button} from "@chakra-ui/react";

function ModalButton({value, children, style,className, bg, color, _hover}) {
    const [isOpen, setOpen] = useState(false);
    return (
        <>
            <Button bg={bg}
                    color={color}
                    _hover={_hover} onClick={() => setOpen(true)} style={style}>
                {value}
            </Button>
            <Modal isOpen={isOpen} onClose={() => setOpen(false)} className={className}>
                {children}
            </Modal>
        </>
    );
}

export default ModalButton;
