import { Prompt, Dimensions, Output, Generate, Positive, Negative, Preview, Upload } from "@/components/Form"
import StyleModal from "@/components/StyleModal"
import { Card, CardBody, Tabs, Tab } from "@nextui-org/react";
import React, { useEffect, useState } from 'react'
import { useSession, signIn } from "next-auth/react"
import { Button } from "@nextui-org/react";
import { apiDreams, base } from "@/api";
import { Grid, GridItem } from "@chakra-ui/react";
import Dream from "@/components/Dream";

export default function Create() {
  const [isLoading, setIsLoading] = useState(null);
  const [dream, loadDream] = useState(null);
  const { data: session, status } = useSession();
  const [history, loadHistory] = useState(null)
  useEffect(() => {
    const query = '?sort[0]=createdAt:desc&populate=*&filters[user][username][$eq]=' + session?.user.name;
    fetch(apiDreams + query)
      .then(response => response.json())
      .then(result => { loadHistory(result.data.splice(0, 5)); })
  }, [isLoading, session])
  let isPremium = false;
  if (session?.user.role == "Premium") {
    isPremium = true;
  }
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
      loadDream(data);
    } catch (error) {
      throw new Error(error)
    } finally {
      setIsLoading(false) // Set loading to false when the request completes
    }
  }
  return (

    <Card className="backdrop-blur-lg bg-default-300/70">
      <CardBody>
        {session ? (
          <div className="flex flex-col gap-2 sm:flex-row items-stretch">
            <div className="flex flex-col sm:w-[40dvw] justify-between">
              <Tabs className="text-secondary px-1" classNames={{ tabList: "bg-default w-full", tabContent: "text-default-foreground", panel: "h-full" }} color="primary">
                <Tab key="basic" title="ساده">
                  <form method="post" onSubmit={onSubmit} action="/api/generate" className="h-full">
                    <div className="flex flex-col h-full justify-between">
                      <div className="flex flex-col gap-2">
                        <input type="hidden" name="token" defaultValue={session.user.token} />
                        <Prompt />
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

                </Tab>
                <Tab key="advanced" title="پیشرفته">
                  {isPremium ? (<form method="post" onSubmit={onSubmit} action="/api/dreamify" className="h-full">
                    <div className="flex flex-col h-full justify-between">
                      <div className="flex flex-col gap-2">
                        <Prompt />
                        <Positive/>
                        <Negative/>
                        <StyleModal />
                        <Dimensions />
                        <Upload/>
                      </div>
                      <Generate isLoading={isLoading} />
                    </div>
                  </form>) : (
                    <><p className="bg-default text-small rounded-lg text-right p-3 my-3">
                      برای دسترسی به رویاباف پیشرفته با امکاناتی مانند:
                      <ul>
                        <li>پیش‌نمایش</li>
                        <li>دستور تصویری</li>
                        <li>دستور راهنمای سبک</li>
                        <li>دستور منفی</li>
                      </ul>
                      باید اشتراک خریداری کنید.
                    </p>
                      <Button color="primary">
                        خرید اشتراک
                      </Button>
                    </>
                  )}

                </Tab>
              </Tabs>
            </div>

            <Output isLoading={isLoading} dream={dream} />
          </div>
        ) : (
          <><p className="bg-default text-small rounded-lg text-right p-3 my-3">
            برای استفاده از رویاباف ابتدا باید ثبت‌نام کنید و با حساب کاربری‌تان وارد شوید.  </p>
            <Button color="primary" onClick={signIn}>
              ورود
            </Button>
          </>
        )}
      </CardBody>
    </Card>
  );
}
