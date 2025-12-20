'use client'

import SidebarCustom, { sidebarStore } from "@/components/SidebarCustom"
import { Button } from "@/components/ui/button"
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaKey } from "react-icons/fa";
import { useStore } from "zustand";
import { getMyKey, getUserDetail } from "../methods/user.method";
import { keygen } from "../methods/keygen.method";
import { create } from "zustand";
import { useKeyStore } from "../stores/useKeyStore";
import Header from "@/components/Header";

const Credential = () => {

    let { setApi_key, api_key } = useKeyStore()
    let [myKey, setMyKey] = useState('')

    let [modal, setModal] = useState(false)
    let [refresh, setRefresh] = useState(0)

    useEffect(() => {
        (async () => {
            let res_mykey = await getMyKey()
            // console.log(mykey)
            setMyKey(res_mykey.key)
        })()
    }, [refresh])

    return (
        < div className="flex-1" >
            <div className="p-3">
                {modal && api_key ? <div className={`w-full h-full absolute left-0 top-0 bg-black/20 z-11 flex justify-center items-center`}>
                    <div className="w-[400px] h-[200px] shadow bg-white rounded-xl flex justify-center items-center flex-col">
                        <p className="font-[regular] text-[14px] text-red-400">Keep your API key safe. Never expose or share it publicly.</p>
                        <p className="font-[medium] text-[14px] mt-2">{api_key}</p>
                        <Button onClick={() => {
                            setModal(false)
                            navigator.clipboard.writeText(api_key)
                            setApi_key('')
                            toast.success("Copied")
                        }} className="w-[60px] h-7 mt-5 text-[12px]" variant={'outline'}>Copy</Button>
                    </div>
                </div> : null}

                <p className="mb-3 text-black/70 font-[regular]">Credentials</p>
                {/* <p>Get Access Token</p> */}
                {myKey ? <div className="flex gap-3">
                    <p className="font-[regular] mb-3">api key : {myKey}</p>
                    <Button onClick={() => {
                        navigator.clipboard.writeText(myKey)
                        toast.success("Copied")
                    }} className="w-[60px] h-7 text-[12px]" variant={'outline'}>Copy</Button>
                </div> : null}
                <Button onClick={async () => {
                    setModal(true)
                    let api_key = await keygen()
                    if (api_key.error) {
                        toast.error("โปรดอย่าสแปมในการสร้าง api key!")
                    }
                    console.log(api_key)
                    setApi_key(api_key.key)
                    setRefresh(refresh + 1)
                }} className="w-50 cursor-pointer">Generate Access Token <FaKey color="white" /></Button>
            </div>
        </div>
    )
}

export default Credential