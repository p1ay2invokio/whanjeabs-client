import axios from "axios"
import { endpoint } from "./config"
import { UserType } from "@/types/user"

export const getUserDetail = async () => {

    let token = localStorage.getItem("token")

    if (token) {
        let response = await axios.get<UserType>(`${endpoint}/user`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        return response.data
    }
}

export const getMyKey = async () => {

    let token = localStorage.getItem("token")

    if (token) {
        let response = await axios.get(`${endpoint}/mykey`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        return response.data
    }
}