'use client'
import { deleteFile } from '@/lib/actions';
import { Loader2, Trash2 } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';

const FileDeleteButton = ({ image }: { image: string }) => {
    const [loading, setLoading] = useState<boolean>(false);

    const handleDelete = async (file: string) => {
        try {
            setLoading(true);
            const result = await deleteFile(file);
            if (result.success) {
                toast.success('Image deleted');
            } else {
                toast.error('Image not found');
            }
        } catch (error) {
            toast.error('Image not found');
        } finally {
            setLoading(false);
        }

    }


    return (
        <>
            {loading ? (
                <Loader2 className='animate-spin w-4 h-4 ml-auto mr-2' />
            ) : (
                <Trash2 onClick={() => handleDelete(image)} className="ml-auto mr-2 w-4 h-4 text-red-500 cursor-pointer" />
            )
            }
        </>
    )
}

export default FileDeleteButton;