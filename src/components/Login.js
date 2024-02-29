import { Input, Link, Button } from "@nextui-org/react"


export default function App({token}) {
    return (
        <form className="flex flex-col gap-4" method="post" action="/api/auth/callback/credentials">
            <input name="csrfToken" type="hidden" defaultValue={token} />
            <Input isRequired name="identifier" label="شناسه" placeholder="نام کاربری یا آدرس ایمیل" type="text" />
            <Input
                name="password"
                isRequired
                label="رمز عبور"
                placeholder="رمز عبور شما"
                type="password"
            />
            <p className="text-center text-small">
                حساب کاربری ندارید؟{" "}
                <Link size="sm" onPress={() => setSelected("sign-up")}>
                    ثبت‌نام کنید!
                </Link>
            </p>
            <div className="flex gap-2 justify-end">
                <Button fullWidth color="primary" type="submit">
                    ورود
                </Button>
            </div>
        </form>
    )
}