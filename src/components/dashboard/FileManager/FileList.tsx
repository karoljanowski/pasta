import { getFiles } from "@/lib/actions";
import ImageItem from "./ImageItem";

const FileList = async () => {
    const files = await getFiles();

    if (files.success === false) return <div>Failed to get files</div>
    if (!files.files?.length) return <div>Failed to get files</div>
    return (
        <div>
            {files.files?.map((image) => (
                <ImageItem key={image.pathname} image={image} />
            ))}
        </div>
    )
}



export default FileList;