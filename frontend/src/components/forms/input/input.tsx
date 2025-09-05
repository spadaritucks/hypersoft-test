import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

interface InputFormProps extends InputProps {
    label?: string;
    error?: string | undefined;
}

export const InputForm = React.forwardRef<HTMLInputElement, InputFormProps>(
    ({ label, error, ...rest }, ref) => {
        return (
            <div className="w-full flex flex-col gap-2">
                <Label htmlFor={label}>{label}</Label>
                <Input ref={ref} {...rest} />
                {error && <span className="text-sm text-red-500">{error}</span>}
            </div>
        );
    }
);

InputForm.displayName = "InputForm";

