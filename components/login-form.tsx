'use client'

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Turnstile } from '@marsidev/react-turnstile'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useRef, useState } from "react"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import { login } from "@/app/methods/auth.method"
import { endpoint } from "@/app/methods/config"
import Script from "next/script"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {

  let [email, setEmail] = useState<string>('')
  let [password, setPassword] = useState<string>('')
  let [CfToken, setCfToken] = useState('')

  const cloudflare_ref = useRef<any>(null)


  let navigate = useRouter()

  const Login = async () => {

    if (email && password) {

      if (CfToken) {
        toast.promise(login(email, password, CfToken), {
          loading: 'กำลังเข้าสู่ระบบ',
          success: 'เข้าสู่ระบบสำเร็จ!',
        }).then((res: any) => {
          localStorage.setItem("token", res.token)
          navigate.push("/dashboard")
        }).catch((err) => {
          toast.error(err.message)
          setCfToken('')
          if (cloudflare_ref.current) {
            cloudflare_ref.current.reset()
          }
        })
      }else{
        toast.error("โปรดยอมรับ cloudflare!")
      }
    } else {
      toast.error("กรอกข้อมูลให้ครบถ้วน!")
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="font-[kmedium]">เข้าสู่ระบบ</CardTitle>
          <CardDescription className="font-[kregular]">
            ใส่อีเมลล์ของคุณด้านล่างเพื่อทำการล็อคอิน
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            onChange={(e) => {
              setEmail(e.target.value)
            }}
          />
          <Field>
            <div className="flex items-center mt-2">
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <a
                href="#"
                className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
              >
                Forgot your password?
              </a>
            </div>
            <Input onChange={(e) => {
              setPassword(e.target.value)
            }} id="password" type="password" />
          </Field>
          <Field>
            <Button className="mt-5 cursor-pointer" onClick={() => {
              Login()
            }} type="submit">Login</Button>
            <Button onClick={() => {
              window.location.href = `${endpoint}/auth/google`
            }} variant="outline" className="cursor-pointer" type="button">
              Login with Google
            </Button>

            <Turnstile ref={cloudflare_ref} onSuccess={(token) => {
              setCfToken(token)
            }} siteKey="0x4AAAAAACHi9nzAtClj6Rae" />

            <FieldDescription className="text-center">
              Don&apos;t have an account? <a href="/register">Sign up</a>
            </FieldDescription>
          </Field>
        </CardContent >
      </Card >
    </div >
  )
}
