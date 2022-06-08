import React, {useState} from "react";
import Modal from "../component/Modal";
import {Button} from "@chakra-ui/react";

function ModalButton({value, children, style,className, bg, color, _hover,isLoading ,marginLeft,onClick}) {
    const [isOpen, setOpen] = useState(false);
    return (
        <>
            <Button bg={bg}
                    isLoading={isLoading}
                    color={color}
                    marginLeft={marginLeft}
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
