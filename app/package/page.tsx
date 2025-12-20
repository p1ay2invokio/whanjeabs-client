'use client'

import SidebarCustom from "@/components/SidebarCustom"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { IoMdPhotos } from "react-icons/io";
import { Product } from "../methods/product.method";
import { useRouter } from "next/navigation";
import { slipVerify } from "../methods/slip.method";

const Package = () => {

    let navigate = useRouter()

    let [slip, setSlip] = useState<any>(null)
    let [modal, setModal] = useState<any>(false)
    let [products, setProducts] = useState<any>([])
    let [select, setSelect] = useState<any>(null)

    useEffect(() => {
        (async () => {
            let pro = new Product()

            let res = await pro.get()

            setProducts(res)
            console.log(res)
        })()
    }, [])

    return (
        <div className="flex">
            {/* <SidebarCustom /> */}

            {modal && select ? <div onClick={(e) => {
                if (e.target == e.currentTarget) {
                    setModal(false)
                }
            }} className="w-full h-full bg-black/20 fixed left-0 top-0 z-11 flex justify-center items-center">
                <div className="w-95 h-140 bg-white rounded-xl p-5 gap-5 flex flex-col">
                    {/* <p className="font-[bold] text-xl">Economy</p> */}

                    <div className="w-full h-full flex justify-center items-center -mb-20">
                        <img className="w-70 h-105" src={select.img}></img>
                    </div>

                    <input onChange={(e) => {
                        // if(!e.target.files){
                        //     toast.error("ไม่พบสลิป!")
                        // }
                        // console.log(e.target.files[0])
                        // if(!e.target.files){
                        //     return console.log("test")
                        // }

                        if (e.target.files) {
                            console.log(e.target.files[0])

                            setSlip(e.target.files[0])
                        }

                    }} name="slip" id="slip" type="file" hidden></input>

                    <label htmlFor="slip" className="border cursor-pointer border-dashed h-30 flex justify-center items-center flex-col">
                        < IoMdPhotos className="size-7" />
                        <p className="font-[kmedium]">{!slip ? "อัปโหลดสลิปของคุณ" : slip.name}</p>
                        <p className="font-[kmedium] text-gray-400">กรุณาอัพโหลดภายใน 10 นาที หลังโอนเงิน</p>
                        <p className="font-[klight] text-[12px] text-gray-400">ระบบจะตรวจสอบทันที</p>
                    </label>

                    <Button onClick={async () => {
                        if (slip) {

                            let formData = new FormData()

                            formData.append('slip', slip)
                            formData.append('product_id', select.id)

                            toast.promise(slipVerify(formData), {
                                loading: 'กำลังตรวจสอบสลิป',
                                success: "ชำระเงินสำเร็จ 🎉",
                                error: "สลิปไม่ถูกต้อง หรือ เกินเวลาที่กำหนด"
                            })

                            setSlip(null)

                            setModal(false)

                            // console.log(base64)
                        } else {
                            toast.error("อย่าลืมแนบสลิป!")
                        }
                    }} className="bg-green-600 text-white font-[kmedium] text-[16px] cursor-pointer" variant={"outline"}>ยืนยันสลิป</Button>
                </div>
            </div> : null
            }

            <div className="p-3 flex-1">
                <p className="font-[kregular] text-gray-500">เพิ่มการส่งข้อความได้ให้มากยิ่งขึ้น</p>

                <p className="font-[kregular] text-gray-500 mt-5">โปรส่งท้ายปี 🎉</p>

                <div className="p-3 grid gird-cols-1 lg:grid-cols-3 sm:grid-cols-2 w-200 gap-5">

                    {products && products.length > 0 ? products.map((item: any) => {

                        let color_text = item.name == "Economy" ? "text-blue-400" : item.name == "Premium" ? "text-yellow-400" : item.name == "Business" ? "text-red-400" : ''

                        let color_bg = item.name == "Economy" ? "bg-blue-400/15" : item.name == "Premium" ? "bg-yellow-400/15" : item.name == "Business" ? "bg-red-400/15" : ''

                        let color_bg_btn = item.name == "Economy" ? "bg-blue-400" : item.name == "Premium" ? "bg-yellow-400" : item.name == "Business" ? "bg-red-400" : ''

                        return (
                            <div key={item.id} className={`w-60 h-100 gap-10 ${color_bg} border-gray-200 rounded-lg flex justify-center items-center flex-col`}>
                                <div className="flex justify-center items-center flex-col">
                                    <p className={`font-[bold] text-2xl ${color_text}`}>{item.name}</p>
                                    <p className={`font-[kmedium] ${color_text}`}>ตกข้อความเพียง {item.price / item.quota}</p>
                                </div>
                                <div className="flex flex-col justify-center items-center">
                                    <p className={`font-[kmedium] text-3xl ${color_text}`}>{Number(item.quota).toLocaleString('TH-th')} ข้อความ</p>
                                    <p className={`font-[regular] text ${color_text} line-through`}>{item.price + 100}฿</p>
                                    <p className={`font-[bold] text-xl ${color_text}`}>{item.price}฿/month</p>
                                </div>
                                <Button onClick={() => {
                                    setModal(true)
                                    setSelect(item)
                                }} className={` ${color_bg_btn} text-white cursor-pointer font-[kmedium]`} variant={'outline'}>รับ Package</Button>
                            </div>
                        )
                    }) : null}

                    {/* <div className="w-60 h-100 gap-10 bg-blue-400/7 border-gray-200 rounded-lg flex justify-center items-center flex-col">
                        <div className="flex justify-center items-center flex-col">
                            <p className="font-[bold] text-2xl text-blue-400">Economy</p>
                            <p className="font-[kmedium] text-blue-400">ตกข้อความเพียง 0.0495</p>
                        </div>
                        <div className="flex flex-col justify-center items-center">
                            <p className="font-[kmedium] text-3xl text-blue-400">2,000 ข้อความ</p>
                            <p className="font-[regular] text text-blue-500 line-through">149฿</p>
                            <p className="font-[bold] text-xl text-blue-500">99฿/month</p>
                        </div>
                        <Button onClick={() => {
                            setModal(true)
                        }} className="bg-blue-400 text-white cursor-pointer font-[kmedium]" variant={'outline'}>รับ Package</Button>
                    </div>
                    <div className="w-60 h-100 gap-10 bg-yellow-400/7 border-gray-200 rounded-lg flex justify-center items-center flex-col">
                        <div className="flex justify-center items-center flex-col">
                            <p className="font-[bold] text-2xl text-yellow-400">Premium</p>
                            <p className="font-[kmedium] text-yellow-400">ตกข้อความเพียง 0.0199</p>
                        </div>
                        <div className="flex flex-col justify-center items-center">
                            <p className="font-[kmedium] text-3xl text-yellow-400">10,000 ข้อความ</p>
                            <p className="font-[regular] text text-yellow-500 line-through">349฿</p>
                            <p className="font-[bold] text-xl text-yellow-500">299฿/month</p>
                        </div>
                        <Button className="bg-yellow-400 text-white cursor-pointer font-[kmedium]" variant={'outline'}>รับ Package</Button>
                    </div>
                    <div className="w-60 h-100 gap-10 bg-red-400/7 border-gray-200 rounded-lg flex justify-center items-center flex-col">
                        <div className="flex justify-center items-center flex-col">
                            <p className="font-[bold] text-2xl text-red-400">Business</p>
                            <p className="font-[kmedium] text-red-400">ตกข้อความเพียง 0.00998</p>
                        </div>
                        <div className="flex flex-col justify-center items-center">
                            <p className="font-[kmedium] text-3xl text-red-400">50,000 ข้อความ</p>
                            <p className="font-[regular] text text-red-500 line-through">549฿</p>
                            <p className="font-[bold] text-xl text-red-500">499฿/month</p>
                        </div>
                        <Button className="bg-red-400 text-white cursor-pointer font-[kmedium]" variant={'outline'}>รับ Package</Button>
                    </div> */}
                </div>
            </div>
        </div >
    )
}

export default Package