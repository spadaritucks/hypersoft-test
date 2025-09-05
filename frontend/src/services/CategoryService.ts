'use server'

import { env } from "@/env/env"
import { CategoryRequestDTO } from "@/types/categories/CategoryRequestDTO";
import { CategoryResponseDTO } from "@/types/categories/CategoryResponseDTO";
import { getAccessToken } from "@/utils/getAccessToken"

export async function CreateCategoryService(categoryRequestDTO: CategoryRequestDTO) {
    const access_token = await getAccessToken();

    const response = await fetch(`${env.NEXT_API_URL}/categories`, {
        method: "POST",
        cache: "no-cache",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${access_token}`
        },
        body: JSON.stringify(categoryRequestDTO)
    })

    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.message || "Erro ao criar categoria")
    }

    return data;
}

export async function GetAllCategoriesService(): Promise<CategoryResponseDTO[]> {
    const access_token = await getAccessToken();

    const response = await fetch(`${env.NEXT_API_URL}/categories`, {
        method: "GET",
        cache: "no-cache",
        headers: {
            "Authorization": `Bearer ${access_token}`
        }
    })

    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.message || "Erro ao buscar categorias")
    }

    return data;
}

export async function GetCategoryByIdService(id: string): Promise<CategoryResponseDTO> {
    const access_token = await getAccessToken();

    const response = await fetch(`${env.NEXT_API_URL}/categories/${id}`, {
        method: "GET",
        cache: "no-cache",
        headers: {
            "Authorization": `Bearer ${access_token}`
        }
    })

    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.message || "Erro ao buscar categoria")
    }

    return data;
}

export async function DeleteCategoryService(id: string) {
    const access_token = await getAccessToken();

    const response = await fetch(`${env.NEXT_API_URL}/categories/${id}`, {
        method: "DELETE",
        cache: "no-cache",
        headers: {
            "Authorization": `Bearer ${access_token}`
        }
    })

    if (!response.ok) {
        const data = await response.json()
        throw new Error(data.message || "Erro ao deletar categoria")
    }
}
