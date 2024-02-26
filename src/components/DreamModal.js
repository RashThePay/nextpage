
import { Image, ModalFooter, Button} from "@nextui-org/react";
import Icon from "./Icon";
import { base as url } from '@/api';
import {getStyle} from "@/utils";
import { useState } from "react";
import { saveAs } from "file-saver";

function Like() {
  const [isLiked, setLike] = useState(false);
  function clickLike(value){
    setLike(value);
  }
  return (
    <span onClick={() => clickLike(!isLiked)} className={"cursor-pointer "+ (isLiked ? "text-red-500" : "text-default-700")}><Icon name="heart"/></span>
  )
}
export default function DreamModal({ dream }) {
  
  return (
    <>
      <Image
        alt={dream.attributes.prompt.main_fa}
        src={url + dream.attributes.image.data.attributes.url}
        fill={true} className="z-0 object-cover"
      />
      <ModalFooter className="flex-col">
        <p className="flex justify-between">
          <Like/>
          <span className="cursor-pointer" onClick={()=> saveAs(url + dream.attributes.image.data.attributes.url, `${dream.attributes.prompt.main_fa}.jpeg`)} target="_self"> <Icon name="download"/></span>
        </p>
        <p>{dream.attributes.prompt.main_fa}</p>
        <p className="flex justify-between text-small">
          <span><Icon name="palette" />{getStyle(dream.attributes.style).name}</span>
          <span dir="ltr"><Icon name="user" />&nbsp;&nbsp;{dream.attributes.user.data.attributes.username}</span>
        </p>
      </ModalFooter>
    </>
  )
}
