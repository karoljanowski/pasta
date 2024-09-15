'use client'
import { deleteFile } from '@/lib/actions';
import { Trash2 } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';

const FileDeleteButton = ({file}: {file: string}) => {
    const [loading, setLoading] = useState<boolean>(false);

    const handleDelete = async (file: string) => {
        try{
            setLoading(true);
            const result = await deleteFile(file);
            if (result.success) {
                toast.success('Image deleted');
            } else {
                toast.error('Image not found');
            }
        }catch(error){
            toast.error('Image not found');
        }finally{
            setLoading(false);
        }

    }


    return (
        <Trash2 onClick={() => handleDelete(file)} className="ml-auto mr-2 w-4 h-4 text-red-500 cursor-pointer"/>
    )
}

export default FileDeleteButton;