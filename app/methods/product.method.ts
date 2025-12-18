import axios from "axios"
import { endpoint } from "./config"

export class Product {
    public get = () => {
        let res = axios.get(`${endpoint}/product`).then((res) => {
            return res.data
        })

        return res
    }
}