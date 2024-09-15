'use client'
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import ImageList from "./ImageList";
import Image from "next/image";
import { Image as ImageIcon } from "lucide-react";
import { useState } from "react";
import { ListBlobResultBlob } from "@vercel/blob";
import { DialogDescription } from "@radix-ui/react-dialog";

const EditImage = ({ initialImage }: { initialImage?: string }) => { // tu jest błąd, poprawić działanie initialImage
    const [image, setImage] = useState<ListBlobResultBlob | undefined>();
    return (
        <>
            <input type="hidden" name="image" value={image?.downloadUrl} />
            <Dialog>
                <DialogTrigger asChild>
                    <label className="mt-3 h-9 hover:bg-neutral-300 transition-all rounded-md cursor-pointer flex items-center border border-neutral-200 w-max px-8 gap-4">
                        {
                            image ? (
                                <Image
                                    src={image.downloadUrl}
                                    width={24}
                                    height={24}
                                    alt="Uploaded image"
                                />
                            ) :
                                (
                                    <ImageIcon />
                                )
                        }
                        <span>Change image</span>

                    </label>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Choose image</DialogTitle>
                        <DialogDescription>Click on image to select</DialogDescription>
                    </DialogHeader>
                    <ImageList setImage={setImage} />
                </DialogContent>
            </Dialog>
        </>

    );
}

export default EditImage;