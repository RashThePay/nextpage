import { Grid, GridItem } from "@chakra-ui/react";
import { Card, CardFooter, Image, Modal, ModalContent, ModalBody, ModalFooter, useDisclosure, Switch } from "@nextui-org/react";
import { base, apiDreams } from "@/api";
import { useState } from "react";
import DreamModal from "@/components/DreamModal";

export async function getServerSideProps() {
  const query = '?sort[0]=createdAt:desc&populate[image][fields][0]=url&populate[prompt]=*&populate[user][fields][0]=username';
  const res = await fetch(apiDreams + query);
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  const repo = await res.json();
  return { props: { repo } };
}

export default function Page({ repo }) {
  const dreams = repo.data;
  const {isOpen, onOpen, onOpenChange} = useDisclosure(false)
  const [thisDream, openDream] = useState(false);
  function viewDream(dream){
    onOpen();
    openDream(dream);
  }
  return (
    <>
      <Grid templateColumns='repeat(auto-fit, minmax(calc(100dvw / 80), 5px))' gap={10}>
        {dreams.map((dream) => {
          return (
            <GridItem key={dream.id}
              rowSpan={(dream.attributes.orientation == 'portrait') ? 18 : 11}
              colSpan={11}>
              <Card

                isFooterBlurred
                radius="lg"
                className="items-center border-none"
              >
                <Image
                  onClick={()=>viewDream(dream)}
                  isZoomed
                  alt={dream.attributes.prompt.main_fa}
                  src={base + dream.attributes.image.data.attributes.url}
                  fill={true} className="z-0 w-full h-full object-cover"
                />
                <CardFooter className="before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small text-right z-10">
                  <p className="text-tiny text-white/80">{dream.attributes.prompt.main_fa}</p>
                </CardFooter>
              </Card>
            </GridItem>
          )
        })}
      </Grid>
      <Modal isOpen={isOpen} size="sm" placement="center" scrollBehavior="outside" className="p-3 pb-0 bg-default-100/90" onOpenChange={onOpenChange}>
        <ModalContent >
          {(onClose) => (
            <DreamModal dream={thisDream}/>
          )}
        </ModalContent>
      </Modal>
      </>

      );
}
