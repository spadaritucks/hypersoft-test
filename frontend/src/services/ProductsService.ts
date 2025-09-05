'use server'

import { env } from "@/env/env"
import { ProductsRequestDTO } from "@/types/products/ProductsRequestDTO";
import { ProductsResponseDTO } from "@/types/products/ProductsResponseDTO";
import { getAccessToken } from "@/utils/getAccessToken"

export async function CreateProductsService(productsRequestDTO: ProductsRequestDTO) {
    const access_token = await getAccessToken();

    const response = await fetch(`${env.NEXT_API_URL}/products`, {
        method: "POST",
        cache: "no-cache",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${access_token}`
        },
        body: JSON.stringify(productsRequestDTO)
    })

    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.message || "Erro ao criar o produto")
    }

    return data;
}

export async function GetAllProductsService(page: number = 1, size: number = 10): Promise<ProductsResponseDTO[]> {
    const access_token = await getAccessToken();

    const response = await fetch(`${env.NEXT_API_URL}/products?page=${page}&size=${size}`, {
        method: "GET",
        cache: "no-cache",
        headers: {
            "Authorization": `Bearer ${access_token}`
        }
    })

    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.message || "Erro ao buscar produtos")
    }

    return data;
}

export async function GetProductByIdService(id: string): Promise<ProductsResponseDTO> {
    const access_token = await getAccessToken();

    const response = await fetch(`${env.NEXT_API_URL}/products/${id}`, {
        method: "GET",
        cache: "no-cache",
        headers: {
            "Authorization": `Bearer ${access_token}`
        }
    })

    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.message || "Erro ao buscar produto")
    }

    return data;
}

export async function SearchProductsService(name: string): Promise<ProductsResponseDTO[]> {
    const access_token = await getAccessToken();

    const response = await fetch(`${env.NEXT_API_URL}/products/search?name=${encodeURIComponent(name)}`, {
        method: "GET",
        cache: "no-cache",
        headers: {
            "Authorization": `Bearer ${access_token}`
        }
    })

    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.message || "Erro ao buscar produtos")
    }

    return data;
}

export async function GetProductsByCategoryService(categoryId: string): Promise<ProductsResponseDTO[]> {
    const access_token = await getAccessToken();

    const response = await fetch(`${env.NEXT_API_URL}/products/category/${categoryId}`, {
        method: "GET",
        cache: "no-cache",
        headers: {
            "Authorization": `Bearer ${access_token}`
        }
    })

    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.message || "Erro ao buscar produtos por categoria")
    }

    return data;
}

export async function GetLowStockProductsService(): Promise<ProductsResponseDTO[]> {
    const access_token = await getAccessToken();

    const response = await fetch(`${env.NEXT_API_URL}/products/low-stock`, {
        method: "GET",
        cache: "no-cache",
        headers: {
            "Authorization": `Bearer ${access_token}`
        }
    })

    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.message || "Erro ao buscar produtos com estoque baixo")
    }

    return data;
}

export async function UpdateProductService(id: string, productsRequestDTO: ProductsRequestDTO) {
    const access_token = await getAccessToken();

    const response = await fetch(`${env.NEXT_API_URL}/products/${id}`, {
        method: "PUT",
        cache: "no-cache",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${access_token}`
        },
        body: JSON.stringify(productsRequestDTO)
    })

    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.message || "Erro ao atualizar produto")
    }

    return data;
}

export async function UpdateProductStockService(id: string, newQuantity: number) {
    const access_token = await getAccessToken();

    const response = await fetch(`${env.NEXT_API_URL}/products/${id}/stock`, {
        method: "PATCH",
        cache: "no-cache",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${access_token}`
        },
        body: JSON.stringify(newQuantity)
    })

    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.message || "Erro ao atualizar estoque")
    }

    return data;
}

export async function DeleteProductService(id: string) {
    const access_token = await getAccessToken();

    const response = await fetch(`${env.NEXT_API_URL}/products/${id}`, {
        method: "DELETE",
        cache: "no-cache",
        headers: {
            "Authorization": `Bearer ${access_token}`
        }
    })

    if (!response.ok) {
        const data = await response.json()
        throw new Error(data.message || "Erro ao deletar produto")
    }
}
