'use client'

import { MenuIcon } from "lucide-react"
import { useSidebar } from "./ui/sidebar"

const Header = () => {

    let {setOpen} = useSidebar()

    return (
        <div className="w-full h-15 bg-[#232b2b] md:hidden flex justify-start items-center p-5">
            <MenuIcon onClick={() => {
                setOpen(true)
            }} className="text-white cursor-pointer" />
        </div>
    )
}

export default Header