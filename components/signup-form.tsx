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
import { useState } from "react"
import { signup } from "@/app/methods/auth.method"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {

  let [email, setEmail] = useState('')
  let [password, setPassword] = useState('')
  let [confirmPassword, setConfirmPassword] = useState('')

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
                id="email"
                type="email"
                placeholder="m@example.com"
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
                  <Input onChange={(e) => {
                    setPassword(e.target.value)
                  }} id="password" type="password" required />
                </Field>
                <Field>
                  <FieldLabel htmlFor="confirm-password">
                    Confirm Password
                  </FieldLabel>
                  <Input onChange={(e) => {
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
                if (email && password && confirmPassword) {
                  if (email.includes('@')) {
                    let res: any = await signup(email, password)

                    console.log(res)

                    if (res.success) {
                      localStorage.setItem("token", res.token)
                      toast.success(res.message)
                      navigate.push("/dashboard")
                    } else {
                      toast.error(res.message)
                    }
                  } else {
                    toast.error("Not an email")
                  }
                } else {
                  toast.error("กรุณากรอกข้อมูลให้ครบ!")
                }

              }} type="submit">Create Account</Button>
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
