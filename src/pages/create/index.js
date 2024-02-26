import { Prompt, Dimensions, Output, Generate, Positive, Negative, Preview, Upload } from "@/components/Form"
import { Flex, Grid } from "@chakra-ui/react";
import StyleModal from "@/components/StyleModal"
import { Card, CardBody, Tabs, Tab } from "@nextui-org/react";
import React, { useState } from 'react'


export default function Create() {
  const [isLoading, setIsLoading] = useState(false)
  const [dream, loadDream] = useState(null)
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
      console.log(json);
      const response = await fetch('/api/generate', {
        method: 'POST',
        body: json,
      })
      if (!response.ok) {
        throw new Error('مشکل در ارسال اطلاعات به سرور')
      }
      // Handle response if necessary
      const data = await response.json()
      loadDream(data);
    } catch (error) {
      throw new Error(' مشکل در ارسال اطلاعات')
    } finally {
      setIsLoading(false) // Set loading to false when the request completes
    }
  }
  return (
    <Flex gap={10} justifyContent="center">
      <Card className="backdrop-blur-lg bg-default-300/70">
        <CardBody>
          <div className="flex flex-col gap-2 sm:flex-row items-stretch">
            <div className="flex flex-col sm:w-[40dvw] justify-between">
              <Tabs className="text-secondary px-1" classNames={{ tabList: "bg-default w-full", tabContent: "text-default-foreground", panel: "h-full" }} color="primary">
                <Tab key="basic" title="ساده">
                  <form method="post" onSubmit={onSubmit} action="/api/generate" className="h-full">
                    <div className="flex flex-col h-full justify-between">
                      <div className="flex flex-col gap-2">
                        <Prompt />
                        <StyleModal />
                        <Dimensions />
                      </div>
                      <Generate isLoading={isLoading} />
                    </div>

                  </form>

                </Tab>
                <Tab key="advanced" title="پیشرفته">
                  <form method="post" onSubmit={onSubmit} action="/api/dreamify" className="h-full">
                    <div className="flex flex-col h-full justify-between">
                      <div className="flex flex-col gap-2">
                        <Prompt />
                        <StyleModal />
                        <Dimensions />
                      </div>
                      <Generate isLoading={isLoading} />
                    </div>
                  </form>
                </Tab>
              </Tabs>
            </div>

            <Output isLoading={isLoading} dream={dream} />
          </div>
        </CardBody>
      </Card>

    </Flex>
  );
}
