"use client"
import z from "zod"
import { Button } from "../ui/button"
import { InputForm } from "./input/input"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { CreateProductsService } from "@/services/ProductsService"
import { GetAllCategoriesService } from "@/services/CategoryService"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useModal } from "@/stores/modal-context"
import { useToast } from "@/hooks/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"

const ProductSchema = z.object({
    name: z.string().min(1, "Nome é obrigatório"),
    description: z.string().min(1, "Descrição é obrigatória"),
    price: z.number().min(0.01, "Preço deve ser maior que 0"),
    categoryId: z.string().min(1, "Category is required"),
    stockQuantity: z.number().min(0, "Estoque não pode ser negativo")
})

type ProductFormData = z.infer<typeof ProductSchema>

export default function ProductForm() {
    const { handleSubmit, register, formState: { errors, isSubmitting }, setValue } = useForm<ProductFormData>({
        resolver: zodResolver(ProductSchema)
    })

    const { data: categories } = useQuery({
        queryKey: ['categories'],
        queryFn:  async () => GetAllCategoriesService()
    })

    const { hideModal } = useModal()
    const { toast } = useToast()
    const queryClient = useQueryClient()

    async function onSubmit(data: ProductFormData) {
        try {
            await CreateProductsService(data)
            queryClient.invalidateQueries({ queryKey: ['products-list'] })
            queryClient.invalidateQueries({ queryKey: ['summary'] })
            hideModal()
            toast({
                title: "Success",
                description: "Product created successfully",
            })
        // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
        } catch (error: any) {
            toast({
                title: "Error : " + error.message,
                description: "Failed to create product",
                variant: "destructive",
            })
        }
    }

    return (
        <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
            <InputForm
                label="Name"
                type="text"
                placeholder="Product name"
                {...register("name")}
                error={errors.name?.message}
            />
            
            <InputForm
                label="Description"
                type="text"
                placeholder="Product description"
                {...register("description")}
                error={errors.description?.message}
            />
            
            <InputForm
                label="Price"
                type="number"
                step="0.01"
                placeholder="0.00"
                {...register("price", { valueAsNumber: true })}
                error={errors.price?.message}
            />
            
            <div className="w-full flex flex-col gap-2">
                <label className="text-sm font-medium">Category</label>
                <Select onValueChange={(value) => setValue("categoryId", value)}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                        {categories?.map((category) => (
                            <SelectItem key={category.id} value={category.id}>
                                {category.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                {errors.categoryId && <span className="text-sm text-red-500">{errors.categoryId.message}</span>}
            </div>
            
            <InputForm
                label="Stock Quantity"
                type="number"
                placeholder="0"
                {...register("stockQuantity", { valueAsNumber: true })}
                error={errors.stockQuantity?.message}
            />
            
            <div className="flex gap-2">
                <Button type="button" variant="outline" onClick={hideModal}>
                    Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                    Create Product
                </Button>
            </div>
        </form>
    )
}
