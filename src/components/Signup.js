import { Input, Link, Button } from "@nextui-org/react"
import { useRouter } from "next/router"
import { login } from "@/api"
import { serialize } from 'cookie'

export default function App() {
    const router = useRouter()
    async function handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget)
        const email = formData.get('email')
        const username = formData.get('username')
        const password = formData.get('password')
        const response = await fetch("/api/signup", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({"email": email, 'username': username, "password": password}),
        })
        if (response.ok) {
            router.push('/auth/confirm')
        } else {
            let result = await response.text();
            throw new Error(result)
        }
    }
    return (
        <form className="flex flex-col gap-4 h-[300px]" onSubmit={handleSubmit}>
        <Input isRequired name="username" label="نام کاربری" placeholder="نام کاربری دلخواه و منحصر‌به‌فرد" type="username" />
        <Input isRequired name="email" label="ایمیل" placeholder="آدرس ایمیل شما" type="email" />
        <Input
          isRequired
          label="رمز عبور"
          placeholder="یک رمز عبور قوی"
          type="password"
          name="password"
        />
        <p className="text-center text-small">
          قبلاً ثبت‌نام کرده‌اید؟{" "}
          <Link size="sm" onPress={() => setSelected("login")}>
            وارد شوید.
          </Link>
        </p>
        <div className="flex gap-2 justify-end">
          <Button fullWidth color="primary" type="submit">
            ثبت‌نام
          </Button>
        </div>
      </form>
    )
}