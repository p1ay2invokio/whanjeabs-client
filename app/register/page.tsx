'use client'

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
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import { login } from "@/app/methods/auth.method"
import { endpoint } from "@/app/methods/config"
import { SignupForm } from "@/components/signup-form"

const Register = () => {


    let [email, setEmail] = useState<string>('')
    let [password, setPassword] = useState<string>('')


    let navigate = useRouter()

    const Login = async () => {

        if (email && password) {
            toast.promise(login(email, password), {
                loading: 'กำลังเข้าสู่ระบบ',
                success: 'เข้าสู่ระบบสำเร็จ!',
                error: 'อีเมลล์หรือรหัสผ่านไม่ถูกต้อง!'
            }).then((res: any) => {
                localStorage.setItem("token", res.token)
                navigate.push("/dashboard")
            })
        } else {
            toast.error("กรอกข้อมูลให้ครบถ้วน!")
        }
    }


    return (
        <div className="flex justify-center items-center h-dvh">
            <SignupForm/>
        </div>
    )
}

export default Register