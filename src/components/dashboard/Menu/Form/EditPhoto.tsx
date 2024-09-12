'use client'
import { useState } from "react";
const EditPhoto = ({ initialImage }: { initialImage?: string }) => {
    const [image, setImage] = useState<string | undefined>(initialImage ? initialImage : '');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setImage(reader.result as string);
            }
            reader.readAsDataURL(file);
        }
    }
    return (
        <div>
            <label className="mt-3 h-9 hover:bg-neutral-300 transition-all rounded-md cursor-pointer flex items-center border border-neutral-200 w-max px-8 gap-4">
                <input onChange={handleChange} type="file" className="hidden" name="image" />
                <img src={image} alt="product image" className="w-6 h-6 object-cover" />
                <div className="text-center text-sm">Change photo</div>
            </label>
        </div>
    );
}

export default EditPhoto;