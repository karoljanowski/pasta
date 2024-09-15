import { getFiles } from "@/lib/actions";
import { Trash2 } from "lucide-react";
import FileDeleteButton from "./FileDeleteButton";

const FileList = async () => {
    const files = await getFiles();

    if (files.success === false) return <div>Failed to get files</div>
    if (!files.files?.length) return <div>No files found</div>
    return (
        <div>
            {files.files.map((file: string, i) => (
                <ImageItem key={i} file={file} />
            ))}
        </div>
    )
}

const ImageItem = ({ file }: { file: string }) => {
    return (
        <div className="flex items-center gap-2 mt-6 p-2 odd:bg-gray-50">
            <img src={`/products/${file}`} className="w-12 h-12" />
            <p className="ml-4">{file}</p>
            <FileDeleteButton file={file} />
        </div>
    )
}

export default FileList;