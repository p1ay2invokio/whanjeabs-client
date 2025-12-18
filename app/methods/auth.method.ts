import axios, { AxiosError } from 'axios'
import { endpoint } from './config'
import toast from 'react-hot-toast'

export const login = async (email: string, password: string) => {
    return new Promise(async (resolve, reject) => {
        let res: any = await axios.post(`${endpoint}/login`, {
            email: email,
            password: password
        }).then((res) => {
            setTimeout(() => {
                resolve(res.data)
            }, 1200)
        }).catch((err: AxiosError) => {
            reject(err.response?.data)
        })
    })
}

export const signup = async (email: string, password: string) => {
    return new Promise(async (resolve, reject) => {
        let res: any = await axios.post(`${endpoint}/signup`, {
            email: email,
            password: password
        }).then((res) => {
            setTimeout(() => {
                resolve(res.data)
            }, 1200)
        }).catch((err: AxiosError) => {
            // console.log(err.response?.data)
            resolve(err.response?.data)
        })
    })
}