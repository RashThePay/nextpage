import styles from "@/styles.json"

import { useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, useDisclosure, Button, Card, CardFooter, Image } from "@nextui-org/react";
import Icon from "./Icon";
import { Grid, GridItem, } from "@chakra-ui/react";

export default function App() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [selectedStyle, setStyle] = useState(false);
    function StyleImage({ url }) {
        return (
            <>
                <img src={url} className="rounded-2xl" width={30} height={30} />
            </>
        )
    }
    function Style({ picked }) {
        if (picked) {
            return (<>
                <StyleImage url={picked.photo_url} />
                {picked.name}
            </>
            )
        } else {
            return (<>
                انتخاب سبک دلخواه
            </>)
        }
    }
    const SetAndClose = (style) => {
        setStyle(style);
        onClose();
    }
    return (
        <>
            <Button className="bg-default-700 " onPress={() => onOpen()}>
                <Icon name="palette" />
                <Style picked={selectedStyle} />
            </Button>
            <input type="hidden" name="style" defaultValue={0} value={selectedStyle.id} />
            <Modal scrollBehavior="inside"
                size="5xl"
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">فهرست سبک‌ها</ModalHeader>
                            <ModalBody>
                                <Grid templateColumns="repeat(auto-fit, calc(100dvw/10))" gap={5}>
                                    {styles.map((style) => (

                                        <GridItem
                                            onClick={() => SetAndClose(style)}
                                            key={style.id}
                                            value={style}
                                            disabled={style.is_premium}
                                        >
                                            <Card
                                                radius="lg"
                                                className="border-none">
                                                <Image src={style.photo_url} className="object-cover" fill alt={style.name} />
                                                <CardFooter className="py-1 bg-default-700/40 backdrop-blur-lg absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small mx-1 z-10">{style.name}</CardFooter>

                                            </Card>

                                        </GridItem>))}
                                </Grid>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}

