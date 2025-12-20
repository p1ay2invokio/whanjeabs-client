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
    return (
        <div className="flex justify-center items-center w-full h-dvh">
            <SignupForm/>
        </div>
    )
}

export default Register