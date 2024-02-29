import { Textarea, Tab, Tabs, Button, Card, CardBody } from "@nextui-org/react"
import Icon from "./Icon"
import { Image } from "@nextui-org/react"
import { Flex } from "@chakra-ui/react"
import { useState } from "react"
import {Slider} from "@nextui-org/react";
export function Prompt({size, onChange}) {
    return (
        <Textarea aria-label="شرح دستور"
            name="prompt"
            onChange={onChange}
            size={{size}}
            color="default"
            classNames={{innerWrapper:"py-3"}}
            startContent={<Icon name="circle-question" />}
            placeholder="جادوگر با ردای آبی و گوی بلورین..."
        />

    )
}


export function Dimensions() {
    const [selected, select] = useState('square')
    return (
        <>
            <Tabs aria-label="Tabs orientation" classNames={{ tabList: "bg-default-700 w-full", tabContent: "text-default-foreground", cursor: "bg-default-100/70" }} color="primary" onSelectionChange={(key) => select(key)}>
                <Tab key="square" title={<Flex alignItems="center"><Icon name="square" />مربع</Flex>} />
                <Tab key="portrait" title={<Flex alignItems="center"><Icon name="rectangle-vertical" />پرتره</Flex>} />
            </Tabs>
            <input type="hidden" name="orientation" value={selected} />
        </>
    )

}
export function Output({ isLoading, src, alt }) {
    return (
        <Card
            isHeaderBlurred
            radius="lg"
            className="items-center bg-default-100 border-none min-w-[40dvh] max-h-[70dvh] max-w-[70dvh]">
                    {!isLoading ? (<Image src={src} 
                        id="output"
                        className="object-cover max-h-[70dvh] opacity-1"
                        alt={alt} />) : (
                            <CardBody>در حال رویا بافتن...</CardBody>
                        )}                      
        </Card>
    )
}
 export function Weight(){
    return(
        <Slider label="وزن تصویر:"
        step={1} 
        name="weight"
        
        classNames={{track:"border-s-primary border-l-transparent", filler:"[&>span]bg-default-100"}}
        fillOffset={2}
      maxValue={2} 
      minValue={0} 
      defaultValue={1}
      size="sm"
      className="w-full"
      getValue={(value)=>{
        if (value == 2) return "کم";
        if (value == 1) return "متوسط";
        if (value == 0) return "زیاد";
      }} />
    )
 }

export function Generate({ isLoading }) {
    return (
        <Button type="submit" color="primary">
            <Icon name={isLoading ? "spinner fa-spin" : "sparkles"} />
            <span>{isLoading ? "در حال بافتن" : "بباف!"}</span>
        </Button>
    )
}