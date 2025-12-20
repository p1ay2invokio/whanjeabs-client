'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { pushNotify } from "../methods/notify.method"
import toast from "react-hot-toast"
import SidebarCustom from "@/components/SidebarCustom"
import Header from "@/components/Header"

const LineCannon = () => {


    let [api_key, setApi_key] = useState('')
    let [channel_access, setChannel_acess] = useState('')
    let [to, setTo] = useState('')
    let [message, setMessage] = useState('')

    let [delay, setDelay] = useState(false)

    return (

        < div className="flex-1" >
            <div className="p-3">
                <div className="flex gap-3 flex-col">
                    <p className="font-[kregular] text-gray-500">ลองยิงข้อความไป Line Group / Line Chat</p>
                    <div className="flex gap-2 flex-col">
                        <Label className="font-[kregular]">api key (จาก credentials)</Label>
                        <Input autoComplete="on" onChange={(e) => {
                            setApi_key(e.target.value)
                        }} className="w-50"></Input>
                    </div>

                    <div className="flex gap-2 flex-col">
                        <Label className="font-[kregular]">channel access (ของ Line OA)</Label>
                        <Input autoComplete="on" onChange={(e) => {
                            setChannel_acess(e.target.value)
                        }} className="w-50"></Input>
                    </div>


                    <div className="flex gap-2 flex-col">
                        <Label className="font-[kregular]">to (ส่งไปให้ใคร)</Label>
                        <Input onChange={(e) => {
                            setTo(e.target.value)
                        }} placeholder="UserId / GroupId" className="w-50"></Input>
                    </div>

                    <div className="flex gap-2 flex-col">
                        <Label className="font-[kregular]">message (ข้อความ)</Label>
                        <Input autoComplete="on" onChange={(e) => {
                            setMessage(e.target.value)
                        }} placeholder="สวัสดีชาวโลก😎" className="w-50"></Input>
                    </div>

                    <Button disabled={delay ? true : false} onClick={async () => {

                        console.log(api_key)

                        let res = await pushNotify(api_key, channel_access, to, message)


                        if (!res.success) {
                            return toast.error(res.message)
                        }

                        setDelay(true)

                        setTimeout(() => {
                            setDelay(false)
                            toast.success('ส่งข้อความสำเร็จ🎉')
                        }, 2000)

                        console.log(res)
                    }} className={`w-50 font-[kmedium] text-[16px] ${delay ? 'bg-gray-600' : ''}`}>ยิงข้อความ</Button>
                </div>
            </div>
        </div>
    )
}

export default LineCannon