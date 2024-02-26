import { Textarea, Tab, Tabs, Skeleton, Button, Card, CardHeader } from "@nextui-org/react"
import Icon from "./Icon"
import { Image } from "@nextui-org/react"
import { Flex } from "@chakra-ui/react"
import { useState } from "react"
import { base as url } from '@/api'

export function Prompt() {
    return (
        <Textarea label="شرح دستور"
            name="prompt"
            size="md"
            color="default"
            startContent={<Icon name="circle-question" />}
            placeholder="جادوگر با ردای آبی و گوی بلورین..."
        />

    )
}

export function Positive() {
    return (
        <div className="positive form-field" id="positive">
            <span className="input-tag" contentEditable={true} placeholder="باکیفیت، نقاشی، انیمه..."></span>
            <i className="input-icon fa fa-duotone fa-palette"></i>
        </div>

    )
}
export function Negative() {
    return (
        <div className="negative form-field" id="negative">
            <span className="input-tag" contentEditable={true} placeholder="بی‌کیفیت، ناقص..."></span>
            <i className="input-icon fa fa-duotone fa-magnifying-glass-minus"></i>
        </div>
    )
}
export function Dimensions() {
    const [selected, select] = useState('square')
    return (
        <>
            <Tabs aria-label="Tabs orientation" classNames={{tabList:"bg-default-700 w-full", tabContent:"text-default-foreground", cursor: "bg-default-100/70"}} color="primary" onSelectionChange={(key) => select(key)}>
                <Tab key="square"  title={<Flex alignItems="center"><Icon name="square" />مربع</Flex>} />
                <Tab key="portrait" title={<Flex alignItems="center"><Icon name="rectangle-vertical" />پرتره</Flex>} />
            </Tabs>
            <input type="hidden" name="orientation" value={selected} />
        </>
    )

}
export function Preview() {
    return (
        <div className="preview">
            <span>پیش‌نمایش</span>
            <img id="previewimage" />
        </div>
    )

}
export function Upload() {
    return (
        <div className="upload">
            <button className="btn-alt" id="upload" >
                <label className="file-upload">
                    <i className="button-icon fa fa-duotone fa-upload" aria-hidden="true"></i>
                    <span> بارگذاری تصویر </span>
                    <input type="file" accept="image/*" name="inputimage" id="inputimage" className="field-upload" />
                </label>
            </button>
        </div>
    )
}

export function Output({ isLoading, dream }) {
    let src = dream ? url + dream.dream.image.url : '/assets/1.jpg';
    let alt = dream ? dream.dream.prompt.main_fa : 'آماده‌ی رویاسازی...';
    return (
            <Card
                isHeaderBlurred
                radius="lg"
                className="items-center border-none max-h-[80dvh] max-w-[80dvh]">
                    
                <Skeleton className="rounded-lg" isLoaded={!isLoading}>
                    <Image src={src}
                    className="object-cover max-h-[80dvh]"
                        alt={alt} />
                    
                </Skeleton>
            </Card>
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