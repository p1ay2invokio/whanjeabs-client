import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
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
import { signup } from "@/app/methods/auth.method"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import { Turnstile } from "@marsidev/react-turnstile"

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {

  let [email, setEmail] = useState('')
  let [password, setPassword] = useState('')
  let [confirmPassword, setConfirmPassword] = useState('')

  let [CfToken, setCfToken] = useState('')

  let cloudflare_ref = useRef<any>(null)

  let navigate = useRouter()



  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl font-[kmedium]">สร้างบัญชีผู้ใช้</CardTitle>
          <CardDescription className="font-[kregular]">
            ใส่อีเมลล์ของคุณด้านล่างเพื่อทำการสร้างบัญชีผู้ใช้
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                minLength={14}
                id="email"
                type="email"
                placeholder="abcde@example.com"
                required
                onChange={(e) => {
                  setEmail(e.target.value)
                }}
              />
            </Field>
            <Field>
              <Field className="grid grid-cols-2 gap-4">
                <Field>
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <Input minLength={8} onChange={(e) => {
                    setPassword(e.target.value)
                  }} id="password" type="password" required />
                </Field>
                <Field>
                  <FieldLabel htmlFor="confirm-password">
                    Confirm Password
                  </FieldLabel>
                  <Input minLength={8} onChange={(e) => {
                    setConfirmPassword(e.target.value)
                  }} id="confirm-password" type="password" required />
                </Field>
              </Field>
              <FieldDescription className="font-[klight]">
                ต้องมีอย่างน้อย 8 ตัวอักษร
              </FieldDescription>
            </Field>
            <Field>
              <Button onClick={async () => {

                if (!email || !password || !confirmPassword) {
                  toast.error("กรอกข้อมูลให้ครบถ้วน!")
                  return
                }

                if (email.length < 14) {
                  toast.error("email สั้นเกินไป!")
                  return
                }

                if (password.length < 8) {
                  toast.error("password สั้นเกินไป!")
                  return
                }

                if (password != confirmPassword) {
                  toast.error("password ไม่ตรงกัน!")
                  return
                }

                if (email && password && confirmPassword) {
                  if (email.includes('@')) {

                    if (CfToken) {
                      let res: any = await signup(email, password, CfToken)

                      console.log(res)

                      if (res.success) {
                        localStorage.setItem("token", res.token)
                        toast.success(res.message)
                        navigate.push("/dashboard")
                      } else {
                        toast.error(res.message)
                        setCfToken('')
                        cloudflare_ref.current.reset()
                      }
                    } else {
                      toast.error("โปรดยืนยันตัวตน!")
                    }
                  } else {
                    toast.error("Not an email")
                  }
                } else {
                  toast.error("กรุณากรอกข้อมูลให้ครบ!")
                }

              }} type="submit">Create Account</Button>
              <div className="flex justify-center items-center">
                <Turnstile ref={cloudflare_ref} onSuccess={(token) => {
                  setCfToken(token)
                }} siteKey="0x4AAAAAACHi9nzAtClj6Rae" />
              </div>
              <FieldDescription className="text-center">
                Already have an account? <a href="/login">Sign in</a>
              </FieldDescription>
            </Field>
          </FieldGroup>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
  )
}
