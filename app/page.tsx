'use client'

import LightRays from "@/components/LightRays";
import Prism from "@/components/Prism";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {

  let navigate = useRouter()


  return (
    <div className="w-full h-dvh bg-slate-800 relative">

      <Prism
        animationType="3drotate"
        timeScale={0.3}
        height={3.5}
        baseWidth={5}
        scale={3}
        hueShift={0}
        colorFrequency={1}
        noise={0}
        glow={1}
      />

      {/* <LightRays followMouse={false} /> */}

      <div className="w-full h-full flex-col gap-2 absolute top-0 left-0  z-11 flex justify-center items-center">
        <div className="w-120 border border-gray-400 pl-15 pr-15 h-13 bg-white/40 backdrop-blur-lg rounded-full absolute top-10 grid grid-cols-4">
          <div className="w-full cursor-pointer h-full flex justify-center items-center">
            <p className="font-[kregular] text-white text-[18px]">เกี่ยวกับ</p>
          </div>
          <div className="w-full cursor-pointer h-full flex justify-center items-center">
            <p className="font-[kregular] text-white text-[18px]">แผนราคา</p>
          </div>
          <div className="w-full cursor-pointer h-full flex justify-center items-center">
            <p className="font-[kregular] text-white text-[18px]">ข่าวสาร</p>
          </div>
          <div className="w-full cursor-pointer h-full flex justify-center items-center">
            <p className="font-[kregular] text-white text-[18px]">เบื้องต้น</p>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center ">
          <p className="text-white font-[bold] text-5xl">Whanjeabs Notifications</p>
          <p className="font-[kregular] text-white text-[22px]">เชื่อมต่อ notification app ยุ่งยากหรอ? ให้เราช่วยสิ!</p>
        </div>

        <div className="flex gap-2 mt-3">
          <div onClick={() => {
            navigate.push("/login")
          }} className=" border-gray-100/70 w-30 cursor-pointer p-2 flex justify-center items-center rounded-xl bg-white text-black">
            <p className="font-[kmedium]">เริ่มต้นใช้งาน</p>
          </div>

          <div onClick={() => {
            window.open('https://documenter.getpostman.com/view/14047437/2sB3dMwAdW#9af66a95-57aa-4a69-91b4-fd8d28f39687', "_blank")
          }} className=" border-gray-100/70 w-40 cursor-pointer p-2 flex justify-center items-center rounded-xl bg-black text-white">
            <p className="font-[kmedium]">Documentation</p>
          </div>
        </div>
      </div>

      {/* <div className="h-[100dvh] bg-slate-800">

      </div> */}

    </div>
  );
}
