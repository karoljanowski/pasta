import FileList from "@/components/dashboard/FileManager/FileList";
import FileUpload from "@/components/dashboard/FileManager/FileUpload";
import { Suspense } from "react";
import { Loader2 } from "lucide-react";

const Page = () => {
    return (
        <>
            <h2 className="text-3xl font-bold">File manager</h2>
            <p className="text-lg text-gray-600">Manage images on your page</p>
            <div className="flex justify-end mt-2">
                <FileUpload />
            </div>
            <Suspense fallback={<div className="flex justify-center mt-2"><Loader2 className="mr-2 animate-spin" />Loading...</div>}>
                <FileList />
            </Suspense>
        </>
    )
}

export default Page;