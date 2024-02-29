import {useState} from "react";
import {Tabs, Tab, Input, Link, Button, Card, CardBody, CardHeader} from "@nextui-org/react";
import Login from "@/components/Login";
import { getCsrfToken } from "next-auth/react";
import Signup from "@/components/Signup"

export async function getServerSideProps(context) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  }
}
export default function App({csrfToken}) {
  const [selected, setSelected] = useState("login");

  return (
      <Card className="max-w-full w-[340px] h-[400px] backdrop-blur-lg bg-default-300/70">
        <CardBody className="overflow-hidden">
          <Tabs
            fullWidth
            size="md"
            aria-label="Tabs form"
            selectedKey={selected}
            onSelectionChange={setSelected}
            classNames={{tabList:"bg-default-700 w-full", tabContent:"text-default-foreground", cursor: "bg-default-100/70"}} color="primary"
          >
            <Tab key="login" title="ورود">
             <Login token={csrfToken}/>
            </Tab>
            <Tab key="sign-up" title="ثبت‌نام">
              <Signup />
            </Tab>
          </Tabs>
        </CardBody>
      </Card>
  );
}
