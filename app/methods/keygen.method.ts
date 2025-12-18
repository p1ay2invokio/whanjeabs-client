import axios, { AxiosError } from "axios"
import { endpoint } from "./config"

export const keygen = async () => {

    let token = localStorage.getItem("token")

    if (token) {
        let response = await axios.get(`${endpoint}/keygen`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res) => {
            return res.data
        }).catch((err: AxiosError) => {
            return err.response?.data
        })

        return response
    }
}