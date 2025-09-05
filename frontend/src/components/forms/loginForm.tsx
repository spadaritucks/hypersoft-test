"use client"
import z from "zod";
import { Button } from "../ui/button";
import {InputForm} from "./input/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthService } from "@/services/AuthService";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast"



const LoginSchema = z.object({
    username: z.string().min(1, "Username is required"),
    password: z.string().min(1, "Password is required")
})

type LoginFormdata = z.infer<typeof LoginSchema>

export default function LoginForm() {

    const { handleSubmit, register, formState: { errors, isSubmitting } } = useForm<LoginFormdata>({
        resolver: zodResolver(LoginSchema)
    })

    const router = useRouter();
    const { toast } = useToast()

    async function onSubmit(data: LoginFormdata) {

        try {
            await AuthService({
                username: data.username,
                password: data.password
            })

            router.push("/dashboard")

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            toast({
                title: "Error : " +  error.message,
                variant: "destructive",
            })
        }

    }


    return (
        <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
            <InputForm
                label="Username"
                type="text"
                placeholder="Enter your username"
                {...register("username")}
                error={errors.username ? errors.username.message : undefined} />
            <InputForm
                label="Password"
                type="password"
                {...register("password")}
                error={errors.password ? errors.password.message : undefined} />
            <Button variant="default" disabled={isSubmitting}>Login</Button>
        </form>
    )
}