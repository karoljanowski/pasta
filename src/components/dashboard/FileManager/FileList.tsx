import { getFiles } from "@/lib/actions";
import ImageItem from "./ImageItem";
import FilesEmpty from "./FilesEmpty";

const FileList = async () => {
    const files = await getFiles();

    if (!files.files?.length) return <FilesEmpty />
    return (
        <div>
            {files.files?.map((image) => (
                <ImageItem key={image.pathname} image={image} />
            ))}
        </div>
    )
}



export default FileList;