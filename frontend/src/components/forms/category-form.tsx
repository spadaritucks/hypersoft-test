/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import z from "zod"
import { Button } from "../ui/button"
import { InputForm } from "./input/input"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { CreateCategoryService } from "@/services/CategoryService"
import { useQueryClient } from "@tanstack/react-query"
import { useModal } from "@/stores/modal-context"
import { useToast } from "@/hooks/use-toast"

const CategorySchema = z.object({
    name: z.string().min(1, "name is required")
})

type CategoryFormData = z.infer<typeof CategorySchema>

export default function CategoryForm() {
    const { handleSubmit, register, formState: { errors, isSubmitting } } = useForm<CategoryFormData>({
        resolver: zodResolver(CategorySchema)
    })

    const { hideModal } = useModal()
    const { toast } = useToast()
    const queryClient = useQueryClient()

    async function onSubmit(data: CategoryFormData) {
        try {
            await CreateCategoryService(data)
            queryClient.invalidateQueries({ queryKey: ['categories-list'] })
            queryClient.invalidateQueries({ queryKey: ['categories'] })
            queryClient.invalidateQueries({ queryKey: ['summary'] })
            hideModal()
            toast({
                title: "Success",
                description: "Category created successfully",
            })
        } catch (error: any) {
            toast({
                title: "Error : " + error.message,
                description: "Failed to create category",
                variant: "destructive",
            })
        }
    }

    return (
        <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
            <InputForm
                label="Nome"
                type="text"
                placeholder="Category name"
                {...register("name")}
                error={errors.name?.message}
            />

            <div className="flex gap-2">
                <Button type="button" variant="outline" onClick={hideModal}>
                    Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Creating..." : "Create Category"}
                </Button>
            </div>
        </form>
    )
}
