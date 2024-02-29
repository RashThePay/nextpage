import { Card, CardFooter, Image, Modal, ModalContent, ModalFooter, useDisclosure, Chip } from "@nextui-org/react"
import { base } from "@/api"
import Icon from "./Icon";
import { getStyle } from "@/utils";
import { useState } from "react";
import { saveAs } from "file-saver";

export default function Dream({ dream, hasFooter }) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure(false)
    function Like() {
        const [isLiked, setLike] = useState(false);
        function clickLike(value){
          setLike(value);
        }
        return (
          <span onClick={() => clickLike(!isLiked)} className={"cursor-pointer "+ (isLiked ? "text-red-500" : "text-default-700")}><Icon name="heart"/></span>
        )
      }
    return (<>
        <Card
            
            isFooterBlurred
            radius="lg"
            className="items-center border-none"
        >
            <Image
                onClick={onOpen}
                isZoomed
                alt={dream.attributes.prompt.main_fa}
                src={base + dream.attributes.image.data.attributes.url}
                className="z-0 w-full h-full object-cover"
            />
            {hasFooter ? (
                <CardFooter className="before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small text-right z-10">
                    <p className="text-tiny text-white/80">{dream.attributes.prompt.main_fa}</p>
                </CardFooter>) : (<></>)}
        </Card>
        <Modal isOpen={isOpen} size="sm" placement="center" scrollBehavior="outside" className="p-3 pb-0 bg-default-100/90" onOpenChange={onOpenChange}>
            <ModalContent >
                {(onClose) => (
                    <>
                        <Image
                            alt={dream.attributes.prompt.main_fa}
                            src={base + dream.attributes.image.data.attributes.url}
                            fill={true} className="z-0 object-cover"
                        />
                        <ModalFooter className="flex-col">
                            <div className="flex justify-between">
                                <Like />
                                <span className="cursor-pointer" onClick={() => saveAs(base + dream.attributes.image.data.attributes.url, `${dream.attributes.prompt.main_fa}.jpeg`)} target="_self"> <Icon name="download" /></span>
                            </div>
                            <p><Icon name="question-circle"/>{dream.attributes.prompt.main_fa}</p>
                            <div className="flex justify-between">
                                <Chip><Icon name="palette" />{getStyle(dream.attributes.style).name}</Chip>
                                <Chip dir="ltr"><Icon name="user" dir="ltr" />{dream.attributes.user.data.attributes.username}</Chip>
                            </div>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    </>

    )
}