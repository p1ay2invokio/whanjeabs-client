import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { createRoot } from "react-dom/client"
import toast from "react-hot-toast"
import { create, createStore } from 'zustand'

export function CustomAlert(options?:{title?: string, description?: string, cancelText?: string, confirmText?: string}) {

    return new Promise((resolve) => {
        const containerElement = document.createElement("div")
        document.body.appendChild(containerElement)
        const root = createRoot(containerElement)

        const handleClose = (result: boolean) => {
            root.unmount();
            containerElement.remove();
            resolve(result);
        };

        const wait = (ms: number) => {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve(true)
                }, ms)
            })
        }

        root.render(
            <AlertDialog open={true}>
                <AlertDialogContent>
                    <AlertDialogHeader className="font-[kregular]">
                        <AlertDialogTitle>{options ? options.title : "ต้องการออกจากระบบ?"}</AlertDialogTitle>
                        <AlertDialogDescription>
                            {options ? options.description : 'This action cannot be undone. This will permanently delete your accountand remove your data from our servers.'}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => {
                            handleClose(false)
                        }} className="font-[kregular]">{options ? options.cancelText : 'ยกเลิก'}</AlertDialogCancel>
                        <AlertDialogAction onClick={() => {
                            root.unmount()
                            containerElement.remove()
                            toast.promise(wait(2000), {
                                success: 'สำเร็จ!',
                                loading: 'กำลังโหลด...'
                            }).then((res) => {
                                handleClose(true)
                            })
                        }} className="font-[kregular]">{options ? options.confirmText : 'ออกจากระบบ'}</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        )
    })
}

export default CustomAlert