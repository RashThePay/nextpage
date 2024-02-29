import { Prompt, Dimensions, Output, Generate} from "@/components/Form"
import StyleModal from "@/components/StyleModal"
import React, { useMemo, useState } from 'react'
import { apiDreams } from "@/api";
import { Grid, GridItem } from "@chakra-ui/react";
import Dream from "@/components/Dream";
import {base as url} from "@/api" 

export default function Basic({session}) {
    const [isLoading, setIsLoading] = useState(false);
    const [src, setSrc] = useState(null);
    const [alt, setAlt] = useState(null);
    const [history, loadHistory] = useState(null)
    useMemo(() => {
        const query = '?sort[0]=createdAt:desc&populate=*&filters[user][username][$eq]=' + session?.user.name;
        fetch(apiDreams + query)
            .then(response => response.json())
            .then(result => { loadHistory(result.data.splice(0, 5)); })
    }, [isLoading, session])

    async function onSubmit(event) {
        event.preventDefault()
        setIsLoading(true) // Set loading to true when the request starts

        try {
            const formData = new FormData(event.currentTarget)
            var object = {};
            formData.forEach(function (value, key) {
                object[key] = value;
            });
            var json = JSON.stringify(object);
            const response = await fetch('/api/generate', {
                method: 'POST',
                body: json,
            })

            if (!response.ok) {
                const error = await response.text()
                throw new Error(error)
            }
            // Handle response if necessary

            const data = await response.json()
            
            setSrc(url + data.dream.image.url);
            setAlt(data.dream.prompt.main_fa);
        } catch (error) {
            throw new Error(error)
        } finally {
            setIsLoading(false) // Set loading to false when the request completes
        }
    }
    return (
        <>
            <div className="flex flex-col sm:w-[40dvw] justify-between">
                <form method="post" onSubmit={onSubmit} action="/api/generate" className="h-full">
                    <div className="flex flex-col h-full justify-between">
                        <div className="flex flex-col gap-2">
                            <input type="hidden" name="token" defaultValue={session.user.token} />
                            <Prompt size="md"/>
                            <StyleModal />
                            <Dimensions />
                        </div>
                        <Grid dir="ltr" templateColumns="repeat(5, 1fr)" gap={10} className="my-3 ">
                            {history?.map((prev) => {
                                return (
                                    <GridItem className="aspect-square overflow-hidden">
                                        <Dream dream={prev} hasFooter={false} />
                                    </GridItem>

                                )
                            })}
                        </Grid>
                        <Generate isLoading={isLoading} />
                    </div>

                </form>

            </div>  <Output isLoading={isLoading} src={src} alt={alt} />
        </> )
}