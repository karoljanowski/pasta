import Image from "next/image"
import { ListBlobResultBlob } from "@vercel/blob"
import FileDeleteButton from "./FileDeleteButton"
const ImageItem = ({ image }: { image: ListBlobResultBlob }) => {
    return (
        <div className="flex items-center gap-2 mt-6 p-2 odd:bg-gray-50">
            <Image
                priority
                key={image.pathname}
                src={image.url}
                alt="Image"
                width={64}
                height={64}
                className="w-16 h-16 object-cover"
            />
            <p className="ml-4">{image.pathname}</p>
            <FileDeleteButton image={image.downloadUrl} />
        </div>
    )
}

export default ImageItem