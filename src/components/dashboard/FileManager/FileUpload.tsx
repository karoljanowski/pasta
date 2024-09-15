import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { addFile } from "@/lib/actions"
import { DialogDescription, DialogTrigger } from "@radix-ui/react-dialog"

const FileUpload = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Upload file</Button>
            </DialogTrigger>
            <DialogContent aria-describedby="">
                <DialogHeader>
                    <DialogTitle>Upload file</DialogTitle>
                    <DialogDescription>Upload a new file to your page</DialogDescription>
                </DialogHeader>

                <form action={addFile}>
                    <input type="file" name="file" />
                    <Button type="submit">Upload</Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}
export default FileUpload