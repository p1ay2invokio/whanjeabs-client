import axios, { AxiosError } from "axios"
import { endpoint } from "./config"
import toast from "react-hot-toast"

export const slipVerify = async (formData: any) => {
    return new Promise((resolve, reject) => {

        let token = localStorage.getItem("token")

        if (token) {
            axios.post(`${endpoint}/slip_verify`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/from-data'
                }
            }).then((res) => {
                resolve(res.data)
            }).catch((err: AxiosError) => {
                reject(err.response?.data)
            })
        } else {
            toast.error("Token is missing!")
        }

    })
}