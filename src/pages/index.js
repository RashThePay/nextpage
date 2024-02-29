import { Card, CardBody, CardHeader } from "@nextui-org/react";

export default function Home() {
    return(
      <>
        <Card className="bg-default-100 backdrop-blur-lg">
          <CardHeader>
            به رویا.آ.یی خوش آمدید!
          </CardHeader>
          <CardBody>
            ابتدا ثبت‌نام کنید و بعد به رویابافی بپردازید.
          </CardBody>
        </Card>
      </>
    )
}