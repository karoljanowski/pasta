'use client'
import { getFiles } from "@/lib/actions";
import { useEffect, useState } from "react";
import { ListBlobResultBlob } from "@vercel/blob";
import Image from "next/image";
import { DialogClose } from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";

const ImageList = ({ setImage }: { setImage: (image: ListBlobResultBlob) => void }) => {
    const [files, setFiles] = useState<ListBlobResultBlob[]>([]);
    const [loading, setLoading] = useState(false);
    const handleClick = (image: ListBlobResultBlob) => {
        setImage(image);
    }
    useEffect(() => {
        const fetchFiles = async () => {
            setLoading(true)
            const files = await getFiles();
            if (files.files?.length) {
                setFiles(files.files);
            }
            setLoading(false)
        }
        fetchFiles();
    }, [])
    if (loading) return <div className="flex justify-center mt-4 gap-2"><Loader2 className="animate-spin" />Loading images...</div>
    return (
        <div className="flex flex-col">
            {files.map((file) => (
                <DialogClose key={file.pathname} className="cursor-pointer hover:bg-neutral-300 odd:bg-neutral-100">
                    <div onClick={() => handleClick(file)} className="flex items-center gap-4 overflow-hidden p-2 ">
                        <Image src={file.url} alt={file.pathname} width={48} height={48} className="w-12 h-12 rounded-lg" />
                        <span>{file.pathname}</span>
                    </div>
                </DialogClose>
            ))}
        </div>
    );
}

export default ImageList;