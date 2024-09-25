'use client'
import { Input } from "@/components/ui/input";
import FormButton from "@/components/FormButton";
import { useFormState } from "react-dom";
import { changePassword } from "@/lib/auth";
import { useEffect, useRef } from "react";
import toast from "react-hot-toast";

const ChangePasswordForm = () => {
    const [state, action] = useFormState(changePassword, { success: false });
    const formRef = useRef<HTMLFormElement>(null);

    const resetForm = () => {
        if (formRef.current) {
            formRef.current.reset();
        }
    };

    useEffect(() => {
        if (state.success) {
            toast.success('Password changed successfully');
            resetForm();
        }
    }, [state]);

    return (
        <form ref={formRef} className="mt-4 flex flex-col gap-4" action={action}>
            <div>
                <label className="text-gray-600 text-sm" htmlFor="oldPassword">Old password</label>
                <Input type="password" name="oldPassword" id="oldPassword" />
                {state.errors?.oldPassword && <span className="text-red-500 text-sm">{state.errors.oldPassword}</span>}
            </div>
            <div>
                <label className="text-gray-600 text-sm" htmlFor="newPassword">New password</label>
                <Input type="password" name="newPassword" id="newPassword" />
                {state.errors?.newPassword && <span className="text-red-500 text-sm">{state.errors.newPassword}</span>}
            </div>
            <div>
                <label className="text-gray-600 text-sm" htmlFor="confirmPassword">Confirm password</label>
                <Input type="password" name="confirmPassword" id="confirmPassword" />
                {state.errors?.confirmPassword && <span className="text-red-500 text-sm">{state.errors.confirmPassword}</span>}
            </div>
            {state.error && <span className="text-red-500">{state.error}</span>}
            <FormButton text="Save" />
        </form>
    );
}

export default ChangePasswordForm;