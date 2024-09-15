import { addFile, getFiles } from "@/lib/actions";
import FileList from "@/components/dashboard/FileManager/FileList";
import { Button } from "@/components/ui/button";
import FileUpload from "@/components/dashboard/FileManager/FileUpload";
import { Suspense } from "react";

const Page = () => {
    return (
        <>
            <h2 className="text-3xl font-bold">File manager</h2>
            <p className="text-lg text-gray-600">Manage images on your page</p>
            <div className="flex justify-end mt-2">
                <FileUpload />
            </div>
            <Suspense fallback={<div>Loading...</div>}>
                <FileList />
            </Suspense>
        </>
    )
}

export default Page;