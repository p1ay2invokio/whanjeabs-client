import axios, { AxiosError } from "axios"
import toast from "react-hot-toast"
import { endpoint } from "./config"

export const pushNotify = async (api_key: string, channel_access: string, to: string, message: string) => {

    let response = await axios.post(`${endpoint}/push`, {
        channel_access: channel_access,
        to: to,
        message: message
    }, {
        headers: {
            'x-api-key': api_key
        }
    }).then((res) => {
        return res.data
    }).catch((err: AxiosError) => {
        if (err.code == "ERR_NETWORK") {
            toast.error("Server ยังไม่เปิดให้ใช้บริการ")
        }
        // console.log(err.code == "ERR_NETWORK")
        return err.response?.data
    })

    return response
}