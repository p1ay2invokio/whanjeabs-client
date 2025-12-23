'use client'

import { useEffect, useState } from "react"
import { getUserDetail } from "../methods/user.method"
import SidebarCustom from "@/components/SidebarCustom"
import { useRouter } from "next/navigation"
import Header from "@/components/Header"
import CustomAlert from "@/components/CustomAlert"
import { UserType } from "@/types/user"

const Dashboard = () => {

    let [userData, setUserData] = useState<UserType>()
    let [loading, setLoading] = useState(true)

    let navigate = useRouter()

    useEffect(() => {
        (async () => {
            let user_data = await getUserDetail()

            console.log(user_data)
            setUserData(user_data)
            setLoading(false)
        })()
    }, [])

    if (loading) {
        return null
    }

    return (
        < div className="flex-1" >


            <div className="p-3" >
                <p className="mb-2 text-gray-400 font-[regular]">Dashboard</p>

                <div className="grid grid-cols-1 gap-3">
                    {userData ? <div className="w-full h-80 rounded-lg grid grid-cols-2 gap-2">
                        <div className="w-full h-full border relative rounded-lg p-2 flex justify-center items-center">
                            <p className="font-[regular] absolute left-2 top-2 text-[14px]">requests / months</p>
                            <p className="font-[bold] text-[22px]">{userData.request}/{userData.request_max}</p>
                            {userData.request == userData.request_max ? <div onClick={() => {
                                navigate.push("/package")
                            }} className="p-2 bg-orange-500/10 cursor-pointer text-orange-600 rounded-lg absolute top-2 right-2">
                                <p className="font-[kregular] text-[13px]">+ รับ Request เพิ่มเลย</p>
                            </div> : null}
                        </div>
                        <div className="w-full h-full border relative rounded-lg p-2 flex justify-center items-center">
                            <p className="font-[regular] absolute left-2 top-2 text-[14px]">key generates / months</p>
                            <p className="font-[bold] text-[22px]">Unlimited</p>
                        </div>
                        <div className="w-full h-full border relative rounded-lg p-2 flex justify-center items-center">
                            <p className="font-[regular] absolute left-2 top-2 text-[14px]">costs</p>
                            <p className="font-[bold] text-[22px]">{userData.request_max == 2000 ? 'Economy' : userData.request_max == 10000 ? 'Premium' : userData.request_max == 50000 ? 'Business' : 'Free'}</p>
                        </div>
                        <div className="w-full h-full border relative rounded-lg p-2 flex justify-center items-center">
                            <p className="font-[regular] absolute left-2 top-2 text-[14px]">Status</p>
                            <p className="font-[bold] text-[22px]">{!userData.googleId ? 'Deactive' : 'Active'}</p>
                        </div>
                    </div> : null}
                    <div className="w-full h-80 border rounded-lg p-4 flex justify-center items-center">
                        <p>Available soon</p>
                    </div>
                </div>
            </div >
        </div >
    )
}

export default Dashboard