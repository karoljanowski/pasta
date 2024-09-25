import ChangePasswordForm from "./ChangePasswordForm";
import { User } from "lucide-react";
const ChangePassword = () => {
    return (
        <div className="pt-8 mt-8 border-t border-gray-200">
            <h3 className="text-xl flex gap-3 items-center"><User className="w-4 h-4" />Change password</h3>
            <span className="text-gray-500 text-sm">
                Change your password here. Make sure it's at least 8 characters long.
            </span>
            <ChangePasswordForm />
        </div>
    );
}

export default ChangePassword;