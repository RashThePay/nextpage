import { Prompt, Dimensions, Output, Generate, Weight } from "@/components/Form"
import StyleModal from "@/components/StyleModal"
import React, { useMemo, useState } from 'react'
import { apiDreams } from "@/api";
import { Grid, GridItem } from "@chakra-ui/react";
import Dream from "@/components/Dream";
import Tags from "./Advanced/Tags";
import Upload from "./Advanced/Upload";
import { base as url } from "@/api"
import { HfInference } from "@huggingface/inference";
import { HttpStatusCode } from "axios";
import { data } from "autoprefixer";

export default function Advanced({ session }) {
    const [isLoading, setIsLoading] = useState(false);
    const [history, loadHistory] = useState(null);
    const [src, setSrc] = useState(null);
    const [alt, setAlt] = useState(null);
    useMemo(() => {
        const query = '?sort[0]=createdAt:desc&populate=*&filters[user][username][$eq]=' + session?.user.name;
        fetch(apiDreams + query)
            .then(response => response.json())
            .then(result => { loadHistory(result.data.splice(0, 8)); })
    }, [isLoading])
    var timer = '';
    function handler() {
        clearTimeout(timer);
        timer = setTimeout(function () {
            getPreview();
        }, 2000);
    }
    async function getBase64Image(imageUrl) {
        const getBase64FromUrl = async (url) => {
            const response = await fetch(url);
            const blob = await response.blob();
            return new Promise((resolve) => {
              const reader = new FileReader();
              reader.readAsDataURL(blob);
              reader.onloadend = () => {
                const base64data = reader.result;
                resolve(base64data);
              };
            });
          };
          const base64Image = await getBase64FromUrl(imageUrl);
          return base64Image ;
    }

    async function blobToDataUrl(blob) {
        const e = await new Promise(r => {
            let a = new FileReader();
            a.onload = r;
            a.readAsDataURL(blob);
        });
        return e.target.result;
    }
    async function translate(text) {
        let res = await fetch(`https://api.mymemory.translated.net/get?q=${text}&langpair=fa|en`);
        let translated = await res.json();
        return translated.responseData.translatedText
    }
    async function getPreview() {
        setIsLoading(true);
        let prompt = document.querySelector('textarea[name="prompt"]').value;
        let negative = Array.from(document.querySelectorAll('input[name="negative"]')).map((i) => (i.value)).join('، ');
        let positive = Array.from(document.querySelectorAll('input[name="positive"]')).map((i) => (i.value)).join('، ');
        const orientation = document.querySelector('input[name="orientation"]').value;
        let h = 1024; let w = 1024;
        if (orientation == "portrait") w = 625;
        prompt = await translate(prompt);
        positive = await translate(positive);
        negative = await translate(negative);
        const hf = new HfInference();
        const blob = await hf.textToImage({
            inputs: prompt + " - Style: " + positive,
            parameters: {
                negative_prompt: negative,
                height: h,
                width: w,
            }
        })
        const dataurl = await blobToDataUrl(blob);
        setSrc(dataurl);
        setAlt(prompt);
        setIsLoading(false);
    }
    async function onSubmit(event) {
        event.preventDefault()
        setIsLoading(true)

        try {
            const formData = new FormData(event.currentTarget)
            var object = {};
            formData.forEach(function (value, key) {
                object[key] = value;
            });
            var image, format;
            if (document.querySelector('#output').src.includes('upload')) {
                var base64 = await getBase64Image(document.getElementById("output").src);
                setSrc(base64);
                image = document.querySelector('#output').src.split(';base64,')[1]
                format = document.querySelector('#output').src.split(';base64,')[0].split('image/')[1]
            } else {
                image = document.querySelector('#output').src.split(';base64,')[1]
                format = document.querySelector('#output').src.split(';base64,')[0].split('image/')[1]
            }
            document.querySelector('#output').src = null;
            object = { ...object, ...{ image: image }, ...{ format: format } }
            console.log(object);
            var json = JSON.stringify(object);
            const response = await fetch('/api/dreamify', {
                method: 'POST',
                body: json,
            })

            if (!response.ok) {
                const error = await response.text()
                throw new Error(error)
            }


            const data = await response.json()
            setSrc(url + data.dream.image.url);
            setAlt(data.dream.prompt.main_fa);

        } catch (error) {
            throw new Error(error)
        } finally {
            setIsLoading(false)
        }
    }
    return (
        <>
            <div className="flex flex-col sm:w-[40dvw] justify-between">
                <form method="post" onSubmit={onSubmit} action="/api/generate" className="h-full">
                    <div className="flex flex-col h-full justify-between">
                        <div className="flex flex-col gap-2">
                            <input type="hidden" name="token" defaultValue={session.user.token} />
                            <Prompt size="sm" onChange={handler} />
                            <div className="flex gap-1 justify-stretch w-full">
                                <div className="flex flex-col justify-between">
                                    <div className="flex flex-row gap-1 grow">
                                        <Tags mode="positive" />
                                        <Tags mode="negative" />

                                    </div>

                                    <Weight />
                                </div>

                                <div className="flex flex-col gap-1 grow-0">
                                    <StyleModal />
                                    <Dimensions />
                                    <Upload />

                                </div>

                            </div>

                        </div>
                        <Grid dir="ltr" templateColumns="repeat(8, 1fr)" gap={10} className="my-3 ">
                            {history?.map((prev) => {
                                return (
                                    <GridItem key={prev.id} className="aspect-square overflow-hidden">
                                        <Dream dream={prev} hasFooter={false} />
                                    </GridItem>

                                )
                            })}
                        </Grid>
                        <Generate isLoading={isLoading} />
                    </div>

                </form>

            </div>  <Output isLoading={isLoading} src={src} alt={alt} />
        </>)
}