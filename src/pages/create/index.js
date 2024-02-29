
import { Card, CardBody, Tabs, Tab } from "@nextui-org/react";
import { useSession, signIn } from "next-auth/react"
import { Button } from "@nextui-org/react";
import Basic from "@/components/Basic";
import Advanced from "@/components/Advanced";

export default function Create() {
  const { data: session, status } = useSession();
  let isPremium = false;
  if (session?.user.role == "Premium") {
    isPremium = true;
  }
  if (status == 'authenticated') return (
    <div className="flex flex-col">
      <Tabs className="text-secondary px-1 z-10" classNames={{ tabList: "backdrop-blur-lg w-full", tabContent: "text-default-foreground", panel: "h-full" }} color="primary">
        <Tab key="basic" title="ساده">
          <Card className="backdrop-blur-lg bg-default-300/70">
            <CardBody>
              <div className="flex flex-col gap-2 sm:flex-row items-stretch">
                <Basic session={session} />
              </div>
            </CardBody>
          </Card>
        </Tab>
        <Tab key="advanced" title="پیشرفته">
        <Card className="backdrop-blur-lg bg-default-300/70">
            <CardBody>
              <div className="flex flex-col gap-2 sm:flex-row items-stretch">
                {isPremium ? (<Advanced session={session} />) : (
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
          </>) }
              </div>
            </CardBody>
          </Card>
          
        </Tab>
      </Tabs>
    </div>

  )
  if (status == "unauthenticated") return (
    <><p className="bg-default text-small rounded-lg text-right p-3 my-3">
      برای استفاده از رویاباف ابتدا باید ثبت‌نام کنید و با حساب کاربری‌تان وارد شوید.  </p>
      <Button color="primary" onClick={signIn}>
        ورود
      </Button>
    </>
  )
  return ('loading...')
}
