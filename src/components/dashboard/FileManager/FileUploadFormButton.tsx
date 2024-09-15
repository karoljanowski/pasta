import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const FileUploadFormButton = () => {
    const { pending } = useFormStatus()
    return (
        <Button disabled={pending} className="w-full mt-5" type="submit">
            {pending ? <Loader2 className="animate-spin" /> : 'Upload file'}
        </Button>
    );
}

export default FileUploadFormButton;