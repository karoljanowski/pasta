'use client'

import { useFormStatus } from "react-dom"
import { Button, ButtonProps } from "./ui/button"
import { Loader2 } from "lucide-react"

interface FormButtonProps extends ButtonProps {
    text: string
}

const FormButton = ({ text, className, ...props }: FormButtonProps) => {
    const { pending } = useFormStatus()

    return (
        <Button
            type="submit"
            className={className}
            disabled={pending}
            aria-disabled={pending}
            {...props}
        >
            {pending ? <Loader2 className="w-5 h-5 animate-spin" /> : text}
        </Button>
    )
}

export default FormButton