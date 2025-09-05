"use client"
import z from "zod"
import { Button } from "../ui/button"
import { InputForm } from "./input/input"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { CreateCategoryService } from "@/services/CategoryService"
import { useQueryClient } from "@tanstack/react-query"
import { useModal } from "@/stores/modal-context"

const CategorySchema = z.object({
    name: z.string().min(1, "Nome é obrigatório")
})

type CategoryFormData = z.infer<typeof CategorySchema>

export default function CategoryForm() {
    const { handleSubmit, register, formState: { errors, isSubmitting } } = useForm<CategoryFormData>({
        resolver: zodResolver(CategorySchema)
    })

    const { hideModal } = useModal()
    const queryClient = useQueryClient()

    async function onSubmit(data: CategoryFormData) {
        try {
            await CreateCategoryService(data)
            queryClient.invalidateQueries({ queryKey: ['categories-list'] })
            queryClient.invalidateQueries({ queryKey: ['categories'] })
            hideModal()
        } catch (error: any) {
            alert("Erro ao criar categoria: " + error.message)
        }
    }

    return (
        <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
            <InputForm
                label="Nome"
                type="text"
                placeholder="Nome da categoria"
                {...register("name")}
                error={errors.name?.message}
            />
            
            <div className="flex gap-2">
                <Button type="button" variant="outline" onClick={hideModal}>
                    Cancelar
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Criando..." : "Criar Categoria"}
                </Button>
            </div>
        </form>
    )
}
