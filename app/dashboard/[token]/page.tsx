'use client'

import { useParams } from "next/navigation"

const GetToken = () => {

    let { token } = useParams<string | any>()

    console.log(token)

    if (token) {
        localStorage.setItem("token", token)
        window.location.href = '/dashboard'
    }

    return (
        <div>
            <p>Get Token</p>
        </div>
    )
}

export default GetToken