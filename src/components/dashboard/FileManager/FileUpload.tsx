'use client'
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { addFile } from "@/lib/actions"
import { DialogDescription, DialogTrigger } from "@radix-ui/react-dialog"
import { useFormState } from "react-dom"
import FileUploadFormButton from "./FileUploadFormButton"
import { Image } from "lucide-react"

const FileUpload = () => {
    const [state, action] = useFormState(addFile, { success: false })
    const [fileName, setFileName] = useState("Choose file")

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setFileName(event.target.files[0].name)
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Upload file</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Upload file</DialogTitle>
                    <DialogDescription>Upload a new file to your page</DialogDescription>
                </DialogHeader>

                <form action={action} className="flex flex-col">
                    <label htmlFor="file" className="w-full py-2 px-4 bg-gray-100 flex justify-center flex-col items-center cursor-pointer">
                        <Image className="w-6 h-6" />
                        {fileName}
                    </label>
                    <input type="file" name="file" id="file" className="hidden" onChange={handleFileChange} />
                    {state.error && <p className="text-red-500">{state.error}</p>}
                    <FileUploadFormButton />
                </form>
            </DialogContent>
        </Dialog>
    )
}
export default FileUpload