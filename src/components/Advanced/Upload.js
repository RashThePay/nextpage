import React, { useEffect, useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import Cropper from "./Cropper/App"
import Icon from "../Icon";
export default function App() {

    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [ target, setTarget ] = useState(false);
    function finalize(onClose) {
        const canvas = document.querySelector('#croppedCanvas')
        const url = canvas.toDataURL("image/jpeg");
        document.querySelector('#output').src = url;
        setTarget(true);
        onClose();
    }
    function deleteTarget(){
        document.querySelector('#output').src = '';
        setTarget(false);
    }
    return (
        <>
            {target ? (
                <Button color="danger" variant="flat" startContent={<Icon name="xmark"/>} onPress={()=>deleteTarget()}>
                    حذف تصویر
                </Button>
            ) : (
                <Button onPress={onOpen} startContent={<Icon name="image" />} className="bg-default-700">بارگذاری تصویر</Button>                
                                )}
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">بارگذاری تصویر</ModalHeader>
                            <ModalBody>
                                <Cropper />
                            </ModalBody>
                            <ModalFooter>
                                <Button color="default" variant="light" onPress={onClose}>
                                    بستن
                                </Button>

                                <Button color="success" onPress={() => finalize(onClose)}>
                                    انتخاب
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
